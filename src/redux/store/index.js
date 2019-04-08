import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'

import * as settingsActions from '../actions/settings'
import * as appActions from '../actions/app'
import rootReducer from '../reducers'
import initialStore from './initialStore'

let middlewares

if (process.env.NODE_ENV === 'development') {
   const composeEnhancers = composeWithDevTools({
      actionCreators: {
         settingsActions,
         appActions
      }
   })
   middlewares = composeEnhancers(applyMiddleware(logger))
}

const store = createStore(rootReducer, initialStore, middlewares)

export default store
