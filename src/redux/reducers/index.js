import { combineReducers } from 'redux'
import { LOGOFF } from '../actions/auth'

import initialStore from '../store/initialStore'

import settings from './settings'
import app from './app'
import data from './data'
import auth from './auth'
import myWorlds from './myWorlds'
import whereILive from './whereILive'
import toastNotifications from './toastNotifications'

const appReducer = combineReducers({
   myWorlds,
   whereILive,
   settings,
   data,
   auth,
   app,
   toastNotifications
})

const rootReducer = (state, action) => {
   if (action.type === LOGOFF) state = Object.assign(initialStore, { app: { connected: true } })
   return appReducer(state, action)
}

export default rootReducer
