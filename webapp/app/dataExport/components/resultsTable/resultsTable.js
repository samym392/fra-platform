import './resultsTable.less'
import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router'

import { useI18n } from '@webapp/components/hooks'
import ButtonTableExport from '@webapp/components/buttonTableExport'
import * as NumberUtils from '@common/bignumberUtils'
import { getLabel as getColumnLabel } from '../columnSelect'

const ResultsTable = (props) => {
  const { results, selection, columns } = props
  const { assessmentType, section } = useParams()
  const tableRef = useRef(null)
  const i18n = useI18n()

  const filteredColumns = columns.filter((x) => selection.columns.map((y) => y.param).includes(x))

  return (
    <div className="results-table">
      <ButtonTableExport tableRef={tableRef} filename={`${assessmentType}-${section}`} />
      <table ref={tableRef} className="fra-table data-table">
        <thead>
          <tr>
            <th className="fra-table__header-cell-left" colSpan="1" rowSpan="2">
              &nbsp;
            </th>
            <th className="fra-table__header-cell" colSpan={selection.columns.length + 1}>
              {i18n.t(selection.variable.label)}
            </th>
          </tr>
          <tr>
            {filteredColumns.map((column) => (
              <th key={column} className="fra-table__header-cell">
                {i18n.t(getColumnLabel(column))}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {selection.countries.map(({ param: countryIso, label }) => (
            <tr key={label}>
              <th className="fra-table__category-cell" colSpan="1">
                {i18n.t(label)}
              </th>
              {results[countryIso] &&
                Object.entries(results[countryIso]).map(([year, value]) => {
                  return (
                    <td key={`${countryIso}${year}${value}`} className="fra-table__cell">
                      <div className="number-input__readonly-view">
                        {Number.isNaN(value) ? value : NumberUtils.formatNumber(value)}
                      </div>
                    </td>
                  )
                })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="copyright">&copy; FRA {`${new Date().getFullYear()}`}</p>
    </div>
  )
}

ResultsTable.propTypes = {
  results: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  selection: PropTypes.object.isRequired,
}

export default ResultsTable
