import * as R from 'ramda'

import FraTableExporter from '../../exporter/fraTableExporter'

import * as FraValueService from '../../../../eof/fraValueService'
import { sum, toFixed } from '@common/bignumberUtils'

class ForestCharacteristicsExporter extends FraTableExporter {
  constructor() {
    super('forestCharacteristics', ['naturallyRegeneratingForest', 'plantedForest'], '1b')
  }

  fetchData(countryIso: any) {
    return FraValueService.getFraValues(this.tableName, countryIso)
  }

  parseResultRow(result: any, yearIdx: any, year: any) {
    const focYear = R.pipe(R.prop('fra'), R.find(R.propEq('year', year)), R.defaultTo({}))(result)

    // @ts-ignore
    const naturallyRegeneratingForest = R.prop('naturalForestArea', focYear)

    // @ts-ignore
    const plantationForest = R.prop('plantationForestArea', focYear)
    // @ts-ignore
    const otherPlantedForest = R.prop('otherPlantedForestArea', focYear)
    const plantedForest = toFixed(sum([plantationForest, otherPlantedForest]))

    return {
      naturallyRegeneratingForest,
      plantedForest,
    }
  }
}

const instance = new ForestCharacteristicsExporter()

export default instance
