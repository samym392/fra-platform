import React from 'react'
import { useTranslation } from 'react-i18next'

import { Numbers } from '@utils/numbers'

import { ODPs } from '@meta/assessment'

import { useOriginalDataPoint } from '@client/store/pages/originalDataPoint'

import ForestCharacteristicsPlantationRow from './ForestCharacteristicsPlantationRow'

type Props = {
  canEditData: boolean
}

const ForestCharacteristicsPlantation: React.FC<Props> = (props) => {
  const { canEditData } = props
  const originalDataPoint = useOriginalDataPoint()
  const { t } = useTranslation()

  const nationalClasses = originalDataPoint?.nationalClasses.filter((nationalClass) => !nationalClass.placeHolder)

  return (
    <div className="fra-table__container">
      <div className="fra-table__scroll-wrapper">
        <table className="fra-table odp__sub-table">
          <thead>
            <tr>
              <th className="fra-table__header-cell-left">{t('fraForestCharacteristicsClass.plantationForest')}</th>
              <th className="fra-table__header-cell fra-table__divider">{t('nationalDataPoint.area')}</th>
              <th className="fra-table__header-cell">{t('fraForestCharacteristicsClass.ofWhichIntroduced')}</th>
            </tr>
          </thead>

          <tbody>
            {nationalClasses?.map((nationalClass, index) => (
              <ForestCharacteristicsPlantationRow key={nationalClass.name} canEditData={canEditData} index={index} />
            ))}
          </tbody>

          <tfoot>
            <tr>
              <th className="fra-table__header-cell-left">{t('nationalDataPoint.total')}</th>
              <th className="fra-table__calculated-cell fra-table__divider">
                {originalDataPoint &&
                  Numbers.format(
                    ODPs.calcTotalSubFieldArea({
                      originalDataPoint,
                      field: 'forestPercent',
                      subField: 'forestPlantationPercent',
                    })
                  )}
              </th>
              <td className="fra-table__calculated-cell">
                {originalDataPoint &&
                  Numbers.format(
                    ODPs.calcTotalSubSubFieldArea({
                      originalDataPoint,
                      field: 'forestPercent',
                      subField: 'forestPlantationPercent',
                      subSubField: 'forestPlantationIntroducedPercent',
                    })
                  )}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
export default ForestCharacteristicsPlantation
