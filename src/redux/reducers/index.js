import { combineReducers } from 'redux'
import { LOGOFF } from '../actions/auth'

import settings from './settings'
import app from './app'
import data from './data'
import auth from './auth'
import newWorld from './newWorld'
import myWorlds from './myWorlds'
import whereILive from './whereILive'

const appReducer = combineReducers({
   myWorlds,
   whereILive,
   newWorld,
   settings,
   data,
   auth,
   app
})

const rootReducer = (state, action) => {
   if (action.type === LOGOFF) state = undefined
   return appReducer(state, action)
}

export default rootReducer
