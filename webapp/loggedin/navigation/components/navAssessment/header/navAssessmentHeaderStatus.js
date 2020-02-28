import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import * as R from 'ramda'

import { getAllowedStatusTransitions } from '@common/assessment'
import { isAdministrator } from '@common/countryRole'
import * as CountryStatusAssessment from '@common/country/countryStatusAssessment'

import Icon from '@webapp/components/icon'
import { PopoverControl } from '@webapp/components/popoverControl'
import NavAssessmentStatusConfirm from '@webapp/loggedin/navigation/components/navAssessment/header/navAssessmentStatusConfirm'
import useCountryIso from '@webapp/components/hooks/useCountryIso'
import useI18n from '@webapp/components/hooks/useI18n'
import useUserInfo from '@webapp/components/hooks/useUserInfo'

import { changeAssessment } from '@webapp/loggedin/navigation/actions'

const NavAssessmentHeaderStatus = props => {
  const { assessment } = props
  const status = CountryStatusAssessment.getStatus(assessment)
  const deskStudy = CountryStatusAssessment.getDeskStudy(assessment)

  const dispatch = useDispatch()
  const countryIso = useCountryIso()
  const i18n = useI18n()
  const userInfo = useUserInfo()

  const [targetStatus, setTargetStatus] = useState(null)

  //  Hidden in public view
  if (!userInfo) {
    return null
  }

  const deskStudyItems = [
    { divider: true },
    {
      content: (
        <div className="popover-control__checkbox-container">
          <span style={{ marginRight: '8px' }} className={`fra-checkbox ${assessment.deskStudy ? 'checked' : ''}`}/>
          <span>{i18n.t('assessment.deskStudy')}</span>
        </div>
      ),
      onClick: () => dispatch(
        changeAssessment(countryIso, CountryStatusAssessment.assocDeskStudy(!deskStudy)(assessment))
      )
    }
  ]

  const items = R.unless(
    R.always(CountryStatusAssessment.isStatusChanging(assessment)),
    R.pipe(
      _ => getAllowedStatusTransitions(countryIso, userInfo, status),
      allowedTransitions => [
        { direction: 'next', transition: allowedTransitions.next },
        { direction: 'previous', transition: allowedTransitions.previous }
      ],
      R.filter(R.prop('transition')),
      R.map(statusTarget => ({
        content: i18n.t(`assessment.status.${statusTarget.transition}.${statusTarget.direction}`),
        onClick: () => setTargetStatus(statusTarget)
      })),
      R.when(
        R.always(isAdministrator(userInfo)),
        items => [...items, ...deskStudyItems]
      )
    )
  )([])

  return (
    <>
      { // showing confirmation modal dialog before submitting the status change
        targetStatus &&
        <NavAssessmentStatusConfirm
          assessment={assessment}
          targetStatus={targetStatus}
          onClose={() => setTargetStatus(null)}
        />
      }
      <PopoverControl items={items}>
        <div className={`nav-assessment-header__status status-${status} actionable-${!R.isEmpty(items)}`}>
          <span>{i18n.t(`assessment.status.${status}.label`)}</span>
          {
            !R.isEmpty(items) &&
            <Icon className="icon-white icon-middle" name="small-down"/>
          }
        </div>
      </PopoverControl>
    </>
  )
}

NavAssessmentHeaderStatus.propTypes = {
  assessment: PropTypes.object.isRequired,
}

export default NavAssessmentHeaderStatus
