import React from 'react'
import { useTranslation } from 'react-i18next'

import { useCycle } from '@client/store/assessment'

import CommentableDescription from '../CommentableDescription'

type Props = {
  sectionName: string
  disabled: boolean
  showAlertEmptyContent?: boolean
  showDashEmptyContent?: boolean
}

const AnalysisDescriptions: React.FC<Props> = (props) => {
  const { sectionName, disabled, showAlertEmptyContent, showDashEmptyContent } = props
  const cycle = useCycle()

  const { t } = useTranslation()

  return (
    <div className="fra-description__container">
      <h2 className="headline fra-description__group-header">{t('description.analysisAndProcessing')}</h2>
      <CommentableDescription
        title={t('description.estimationAndForecasting')}
        disabled={disabled}
        sectionName={sectionName}
        name="estimationAndForecasting"
        showAlertEmptyContent={showAlertEmptyContent}
        showDashEmptyContent={showDashEmptyContent}
      />
      <CommentableDescription
        title={t('description.reclassification', { cycleName: cycle.name })}
        disabled={disabled}
        sectionName={sectionName}
        name="reclassification"
        showAlertEmptyContent={showAlertEmptyContent}
        showDashEmptyContent={showDashEmptyContent}
      />
    </div>
  )
}

AnalysisDescriptions.defaultProps = {
  showAlertEmptyContent: false,
  showDashEmptyContent: false,
}

export default AnalysisDescriptions
