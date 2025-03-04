import { Objects } from '@utils/objects'

import { CountryIso } from '@meta/area'
import { RoleName, User } from '@meta/user'

import { BaseProtocol, DB } from '@server/db'

import { fields } from './fields'

/*
  This is used for mailing service on assessment status change
  We get a list of recipients for Array<<countryIsos>> and Array<<RoleName>>
*/

const selectFields = fields.map((f) => `u.${f}`).join(',')

export const readCountryUsersByRole = async (
  props: { countryISOs: Array<CountryIso>; roles: Array<RoleName> },
  client: BaseProtocol = DB
): Promise<Array<User>> => {
  const { countryISOs, roles } = props

  return client.map<User>(
    `
        select ${selectFields}, jsonb_agg(to_jsonb(ur.*)) as roles
        from public.users u join users_role ur on (u.id = ur.user_id)
        where ur.country_iso in ($1:csv) and ur.role in ($2:csv)
        group by ${selectFields}

    `,
    [countryISOs, roles],
    (row) => Objects.camelize(row)
  )
}
