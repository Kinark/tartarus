import { combineReducers } from 'redux'
import settings from './settings'
import app from './app'
import data from './data'
import auth from './auth'
import newWorld from './newWorld'
import myWorlds from './myWorlds'

export default combineReducers({
   myWorlds,
   newWorld,
   settings,
   data,
   auth,
   app
})
