import { combineReducers } from 'redux'
import settings from './settings'
import app from './app'
import data from './data'
import auth from './auth'
import myWorlds from './myWorlds'

export default combineReducers({
   myWorlds,
   settings,
   data,
   auth,
   app
})
