import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import rootReducer from '../reducers'
import initialStore from './initialStore'

const store = createStore(rootReducer, initialStore, applyMiddleware(logger))

export default store
