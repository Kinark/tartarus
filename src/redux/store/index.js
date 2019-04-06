import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'

import * as actionCreators from '../actions/settings'
import rootReducer from '../reducers'
import initialStore from './initialStore'

let middlewares

if (process.env.NODE_ENV === 'development') {
   const composeEnhancers = composeWithDevTools({
      actionCreators
   })
   middlewares = composeEnhancers(applyMiddleware(logger))
}

const store = createStore(rootReducer, initialStore, middlewares)

export default store
