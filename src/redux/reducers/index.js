import { combineReducers } from 'redux'
import settings from './settings'
import app from './app'
import data from './data'

export default combineReducers({
   settings,
   data,
   app
})
