/**
 * Modified version of https://github.com/abc123s/redux-batch-enhancer
 */
import * as ObjectUtils from '@common/objectUtils'

export const BATCH = 'batching/batch'
export const PUSH = 'batching/push'
export const POP = 'batching/pop'

export const batchActions = (actions) => ({ type: BATCH, payload: actions })

export const batchMiddleware = (store) => (next) => (action) => {
  const { dispatch } = store

  let result = null
  ;(async () => {
    if (action.type === BATCH) {
      dispatch({ type: PUSH })
      result = await Promise.all(action.payload.map((batchedAction) => dispatch(batchedAction)))
      dispatch({ type: POP })
    } else {
      result = next(action)
    }
  })()
  return result
}

export const batchStoreEnhancer = (next) => {
  let currentListeners = []
  let nextListeners = currentListeners

  const ensureCanMutateNextListeners = () => {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice()
    }
  }

  const subscribe = (listener) => {
    if (!ObjectUtils.isFunction(listener)) {
      throw new Error('Expected listener to be a function.')
    }

    let isSubscribed = true
    ensureCanMutateNextListeners()
    nextListeners.push(listener)

    const unsubscribe = () => {
      if (!isSubscribed) {
        return
      }

      ensureCanMutateNextListeners()
      const index = nextListeners.indexOf(listener)
      nextListeners.splice(index, 1)
      isSubscribed = false
    }

    return unsubscribe
  }

  const notifyListeners = () => {
    currentListeners = nextListeners
    currentListeners.forEach((listener) => listener())
  }

  return (...args) => {
    const store = next(...args)
    const subscribeImmediate = store.subscribe

    let batchDepth = 0
    const dispatch = (...dispatchArgs) => {
      dispatchArgs.forEach((arg) => {
        const { type } = arg
        if (type) {
          if (type === PUSH) {
            batchDepth += 1
          } else if (type === POP) {
            batchDepth -= 1
          }
        }
      })
      const res = store.dispatch(...dispatchArgs)
      if (batchDepth === 0) {
        notifyListeners()
      }
      return res
    }

    return {
      ...store,
      dispatch,
      subscribe,
      subscribeImmediate,
    }
  }
}
