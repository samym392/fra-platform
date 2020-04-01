import React from 'react'
import * as R from 'ramda'

import VerticallyGrowingTextField from '@webapp/components/verticallyGrowingTextField'
import MultiSelect from '@webapp/components/multiSelect'
import ReviewIndicator from '@webapp/app/assessment/components/review/reviewIndicator'
import useCountryIso from '@webapp/components/hooks/useCountryIso'

const DataSources = props => {

  const {
    saveDraft,
    odp, i18n,
    printView = false,
    canEditData
  } = props
  const countryIso = useCountryIso()
  const displayReviewIndicator = odp.odpId && !printView && canEditData

  return (
    <div className="odp__section">
      {
        !printView &&
        <h3 className="subhead">
          {i18n.t('nationalDataPoint.dataSources')}
        </h3>
      }
      <div className="fra-table__container">
        <div className="fra-table__scroll-wrapper odp__data-source-table-wrapper">
          <table className="fra-table">
            <tbody>
            <tr>
              {
                printView &&
                <th className="fra-table__header-cell odp__year-column" rowSpan="3">{odp.year}</th>
              }
              <th className="fra-table__header-cell-left">{i18n.t('nationalDataPoint.references')}</th>
              <td className="fra-table__cell-left odp__data-source-input-column">
                <VerticallyGrowingTextField
                  value={odp.dataSourceReferences || ''}
                  onChange={(e) => saveDraft(countryIso, R.assoc('dataSourceReferences', e.target.value, odp))}
                  disabled={printView || !canEditData}
                />
              </td>
              <td className="fra-table__row-anchor-cell">
                {
                  displayReviewIndicator
                    ? <div className="odp__review-indicator-row-anchor">
                      <ReviewIndicator
                        section='odp'
                        title={i18n.t('nationalDataPoint.dataSources')}
                        target={[odp.odpId, 'dataSourceReferences']}
                        countryIso={countryIso}/>
                    </div>
                    : null
                }
              </td>
            </tr>

            <tr>
              <th className="fra-table__header-cell-left">{i18n.t('nationalDataPoint.methodsUsed')}</th>
              <td className="fra-table__cell-left odp__data-source-input-column">
                <MultiSelect
                  i18n={i18n}
                  localizationPrefix="nationalDataPoint.dataSourceMethodsOptions"
                  values={odp.dataSourceMethods}
                  options={[
                    'nationalForestInventory',
                    'sampleBasedRemoteSensingAssessment',
                    'fullCoverMaps',
                    'registersQuestionnaires',
                    'other'
                  ]}
                  onChange={(values) =>
                    saveDraft(countryIso, R.assoc('dataSourceMethods', values, odp))
                  }
                  disabled={printView || !canEditData}
                />
              </td>
              <td className="fra-table__row-anchor-cell">
                {
                  displayReviewIndicator
                    ? <div className="odp__review-indicator-row-anchor">
                      <ReviewIndicator
                        section='odp'
                        title={i18n.t('nationalDataPoint.dataSources')}
                        target={[odp.odpId, 'dataSourceMethods']}
                        countryIso={countryIso}/>
                    </div>
                    : null
                }
              </td>
            </tr>

            <tr>
              <th className="fra-table__header-cell-left">{i18n.t('nationalDataPoint.additionalComments')}</th>
              <td className="fra-table__cell-left odp__data-source-input-column">
                <VerticallyGrowingTextField
                  value={odp.dataSourceAdditionalComments || ''}
                  onChange={(e) => saveDraft(countryIso, R.assoc('dataSourceAdditionalComments', e.target.value, odp))}
                  disabled={printView || !canEditData}
                />
              </td>
              <td className="fra-table__row-anchor-cell">
                {
                  displayReviewIndicator
                    ? <div className="odp__review-indicator-row-anchor">
                      <ReviewIndicator
                        section='odp'
                        title={i18n.t('nationalDataPoint.dataSources')}
                        target={[odp.odpId, 'dataSourceAdditionalComments']}
                        countryIso={countryIso}/>
                    </div>
                    : null
                }
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DataSources
