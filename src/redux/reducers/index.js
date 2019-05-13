import { combineReducers } from 'redux'
import settings from './settings'
import app from './app'
import data from './data'
import auth from './auth'

export default combineReducers({
   settings,
   data,
   auth,
   app
})
