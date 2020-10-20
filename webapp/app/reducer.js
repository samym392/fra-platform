import * as R from 'ramda'
import { exportReducer } from '@webapp/utils/reduxUtils'

import { appCountryIsoUpdate, appI18nUpdate, appInitDone } from './actions'

import * as AppState from './appState'

const actionHandlers = {
  [appInitDone]: (state, { i18n, regions }) =>
    R.pipe(AppState.setAppStatusLoaded(i18n), AppState.assocRegions(regions))(state),

  [appCountryIsoUpdate]: (state, { countryIso, printView, printOnlyTablesView }) =>
    AppState.assocCountryIso(countryIso, printView, printOnlyTablesView)(state),

  [appI18nUpdate]: (state, { i18n }) => AppState.assocI18n(i18n)(state),
}

export default exportReducer(actionHandlers)
