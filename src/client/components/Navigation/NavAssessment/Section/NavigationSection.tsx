import './Section.scss'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { matchPath, useLocation } from 'react-router-dom'

import { ClientRoutes } from '@meta/app'
import { Labels, Section } from '@meta/assessment'

import { useAssessment, useCycle } from '@client/store/assessment'
import { useSectionReviewSummary } from '@client/store/ui/review/hooks'
import { useCountryIso, useIsDataExportView } from '@client/hooks'

import ReviewStatusMarker from './ReviewStatusMarker'
import SectionItemLink from './SectionItemLink'

type Props = {
  section: Section
  showSections: boolean
  prefix: string
}

const NavigationSection: React.FC<Props> = (props) => {
  const { section, showSections, prefix } = props

  const { t } = useTranslation()
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()
  const isDataExport = useIsDataExportView()
  const { pathname } = useLocation()
  const reviewStatus = useSectionReviewSummary(section.id)

  const [expanded, setExpanded] = useState(false)

  const sectionLabel = Labels.getLabel({ cycle, labels: section.props.labels, t })
  const assessmentName = assessment.props.name
  let children = section.subSections
  if (isDataExport) {
    children = children.filter((subsection) => subsection?.props?.dataExport)
    // .sort((child1, child2) => child1.anchor.localeCompare(child2.anchor, undefined, { numeric: true }))
  }

  useEffect(() => {
    setExpanded(showSections)
  }, [showSections])

  // // On mount check whether the location matches a child path
  useEffect(() => {
    const match = section.subSections.find((subsection) => {
      const path = ClientRoutes.Assessment.Cycle.Country.Section.getLink({
        countryIso,
        cycleName: cycle.name,
        assessmentName,
        sectionName: subsection.props.name,
      })
      return matchPath({ path }, pathname)
    })
    if (match) {
      setExpanded(true)
    }
  }, [assessmentName, countryIso, cycle.name, pathname, section.subSections])

  if (!children.length) {
    return null
  }

  return (
    <div className="nav-section">
      <div
        className="nav-section__header"
        role="button"
        aria-label={sectionLabel}
        tabIndex={0}
        onClick={() => setExpanded(!expanded)}
        onKeyDown={() => setExpanded(!expanded)}
      >
        <div className="nav-section__order">{prefix}</div>
        <div className="nav-section__label">{sectionLabel}</div>
        {!expanded && !isDataExport && (
          <div className="nav-section__status-content">
            <ReviewStatusMarker status={reviewStatus} />
          </div>
        )}
      </div>
      <div className={`nav-section__items-${expanded ? 'visible' : 'hidden'}`}>
        {expanded && children.map((subSection) => <SectionItemLink key={subSection.uuid} subSection={subSection} />)}
      </div>
    </div>
  )
}

export default NavigationSection
