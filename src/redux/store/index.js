import { applyMiddleware, createStore } from 'redux'
import ReduxThunk from 'redux-thunk'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'

import socketMiddleware from '../middlewares/socketMiddleware'
import * as settingsActions from '../actions/settings'
import * as appActions from '../actions/app'
import rootReducer from '../reducers'
import initialStore from './initialStore'

let middlewares = [socketMiddleware, ReduxThunk]

if (process.env.NODE_ENV === 'development') {
   const composeEnhancers = composeWithDevTools({
      actionCreators: {
         settingsActions,
         appActions
      }
   })
   middlewares.push(logger)
   middlewares = composeEnhancers(applyMiddleware(...middlewares))
} else if (process.env.NODE_ENV === 'production') {
   middlewares = applyMiddleware(...middlewares)
}

const store = createStore(rootReducer, initialStore, middlewares)

export default store
