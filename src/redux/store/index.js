import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import rootReducer from '../reducers'
import initialStore from './initialStore'

let middlewares;

if (process.env.NODE_ENV === 'development') {
   middlewares = applyMiddleware(logger)
}

const store = createStore(rootReducer, initialStore, middlewares)

export default store
