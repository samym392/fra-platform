import React from 'react'
import R from 'ramda'

const yearlyVolumeInputsForRow = () =>
  [
    {type: 'integerInput'},
    {type: 'integerInput'},
    {type: 'integerInput'},
    {type: 'integerInput'},
    {type: 'integerInput'},
    {type: 'integerInput'}
  ]

const fillerCell = {
  type: 'readOnly',
  jsx: <td className="fra-table__header-cell"/>
}

const speciesRow = i18n => [
  {type: 'readOnly', jsx: <td className="fra-table__header-cell">{i18n.t('growingStockComposition.nativeTreeSpecies')}</td>},
  fillerCell,
  fillerCell,
  ...yearlyVolumeInputsForRow()
]

const rankRow = i18n => idx => [
  {type: 'readOnly', jsx: <td key={`rank${idx}`} className="fra-table__header-cell">#{idx} {i18n.t('growingStockComposition.rank')}</td>},
  {type: 'stringInput'},
  {type: 'stringInput'},
  ...yearlyVolumeInputsForRow()
]

const remainingNative = (tableData, column) => {
  const sumOfRanks =
    R.reduce((sum, row) => {
      const value = tableData[row][column]
      if (!R.isNil(value))
        return sum + value
      else
        return sum
    },
    0,
    R.range(1, 11)
  )
  const allNative = tableData[0][column] || 0
  return allNative - sumOfRanks
}

const renderRemainingNative = column => ({tableData}) =>
  <td key="" className="fra-table__aggregate-cell">
    {remainingNative(tableData, column)}
  </td>

const remainingNativeCell = column =>
  ({
    type: 'custom',
    render: renderRemainingNative(column)
  })

const remainingNativeRow = i18n => [
  {
    type: 'readOnly',
    jsx: <td className="fra-table__header-cell">{i18n.t('growingStockComposition.remainingNative')}</td>
  },
  fillerCell,
  {
    type: 'readOnly',
    jsx: <td className="fra-table__header-cell"/>
  },
  ...R.map(remainingNativeCell, R.range(3, 9))
]

export default i18n => ({
  name: 'growingStockComposition',
  header: <thead>
  <tr>
    <th rowSpan="2" className="fra-table__header-cell">{i18n.t('growingStockComposition.fra2020categories')}</th>
    <th rowSpan="2" className="fra-table__header-cell">{i18n.t('growingStockComposition.scientificName')}</th>
    <th rowSpan="2" className="fra-table__header-cell">{i18n.t('growingStockComposition.commonName')}</th>
    <th className="fra-table__header-cell-middle" colSpan="6">{i18n.t('growingStockComposition.areaUnitLabel')}</th>
  </tr>
  <tr>
    <td className="fra-table__header-cell-right">1990</td>
    <td className="fra-table__header-cell-right">1995</td>
    <td className="fra-table__header-cell-right">2000</td>
    <td className="fra-table__header-cell-right">2005</td>
    <td className="fra-table__header-cell-right">2010</td>
    <td className="fra-table__header-cell-right">2015</td>
  </tr>
  </thead>,
  rows:
  [
    speciesRow(i18n),
    ...R.map(rankRow(i18n), R.range(1, 11)),
    remainingNativeRow(i18n),
    ...R.map(rankRow(i18n), R.range(1, 6))],

  valueSlice: {
    rowStart: 0,
    rowEnd: undefined,
    columnStart: 1,
    columnEnd: undefined
  }
})
