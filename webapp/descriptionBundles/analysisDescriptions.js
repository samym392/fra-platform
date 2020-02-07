import React from 'react'
import { connect, useSelector } from 'react-redux'

import CommentableDescription from '@webapp/description/commentableDescription'
import { isPrintingMode, isPrintingOnlyTables } from '@webapp/loggedin/printAssessment/printAssessment'
import * as AppState from '@webapp/app/appState'
import * as UserState from '@webapp/user/userState'

const AnalysisDescriptions = props => {
  const countryIso = useSelector(AppState.getCountryIso)

  return !isPrintingOnlyTables() &&
    <div className="fra-description__container">
      <h2 className="headline fra-description__group-header">{props.i18n.t('description.analysisAndProcessing')}</h2>
      <CommentableDescription
        title={props.i18n.t('description.estimationAndForecasting')}
        name="estimationAndForecasting"
        showAlertEmptyContent={!isPrintingMode()}
        showDashEmptyContent={isPrintingMode()}
        countryIso={countryIso}
        {...props}
      />
      <CommentableDescription
        title={props.i18n.t('description.reclassification')}
        name="reclassification"
        showAlertEmptyContent={!isPrintingMode()}
        countryIso={countryIso}
        showDashEmptyContent={isPrintingMode()}
        {...props}
      />
    </div>
}

const mapStateToProps = (state) => ({ i18n: UserState.getI18n(state) })

export default connect(mapStateToProps, {})(AnalysisDescriptions)

