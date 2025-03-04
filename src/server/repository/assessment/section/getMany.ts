import { Objects } from '@utils/objects'

import { Assessment, Cycle, Section, SubSection } from '@meta/assessment'

import { BaseProtocol, DB, Schemas } from '@server/db'

export const getMany = async (
  props: { assessment: Assessment; cycle: Cycle },
  client: BaseProtocol = DB
): Promise<Array<Section>> => {
  const { assessment, cycle } = props
  const schemaName = Schemas.getName(assessment)

  return client.one<Array<Section>>(
    `
        with ss as (
            select s.parent_id,
                   jsonb_agg(s.* order by (props ->> 'index')::numeric) as sub_sections
            from ${schemaName}.section s
            where s.parent_id is not null
              and props -> 'cycles' ? $1
            group by s.parent_id
            order by s.parent_id
        ),
             s as (
                 select s.*,
                        ss.sub_sections
                 from ${schemaName}.section s
                          left join ss on ss.parent_id = s.id
                 where s.parent_id is null
                   and props -> 'cycles' ? $1
                   and ss.sub_sections is not null
                 order by (s.props ->> 'index')::numeric
             )
        select jsonb_agg(s.*) as data
        from s
        ;
    `,
    [cycle.uuid],
    ({ data }: { data: Array<Omit<Section, 'subSections'> & { sub_sections: Array<SubSection> }> }) => {
      return (
        data
          // eslint-disable-next-line camelcase
          .map(({ sub_sections, props: { labels, ...props }, ...section }) => ({
            ...Objects.camelize(section),
            props: { ...Objects.camelize(props), labels },
            // eslint-disable-next-line camelcase
            subSections: sub_sections.map(({ props: { anchors, labels, ...props }, ...subSection }) => ({
              ...Objects.camelize(subSection),
              props: { ...Objects.camelize(props), anchors, labels },
            })),
          }))
      )
    }
  )
}
