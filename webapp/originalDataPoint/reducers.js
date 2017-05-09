import R from "ramda"
import * as types from "./actions"
import { applyReducerFunction } from '../utils/reduxUtils'

const actionHandlers = {
    [types.dataPointSaveDraftStart]    : ( state, action ) =>
        R.assoc( 'status', "saving...", state ),
    [types.dataPointSaveDraftCompleted]: ( state, action ) =>
        R.assoc( 'status', null )
}

export default ( state = {}, action ) => applyReducerFunction( actionHandlers, state, action )