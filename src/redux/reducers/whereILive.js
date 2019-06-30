import { combineReducers } from 'redux'
import { FETCH_WHERE_I_LIVE_START, FETCH_WHERE_I_LIVE_SUCCESS, FETCH_WHERE_I_LIVE_FAILURE } from '../actions/whereILive'

function loading(state = false, action) {
   switch (action.type) {
      case FETCH_WHERE_I_LIVE_START:
         return true
      case FETCH_WHERE_I_LIVE_SUCCESS:
      case FETCH_WHERE_I_LIVE_FAILURE:
         return false
      default:
         return state
   }
}

function error(state = false, action) {
   switch (action.type) {
      case FETCH_WHERE_I_LIVE_FAILURE:
         return action.payload
      case FETCH_WHERE_I_LIVE_SUCCESS:
         return false
      default:
         return state
   }
}

function content(state = [], action) {
   switch (action.type) {
      case FETCH_WHERE_I_LIVE_SUCCESS:
         return action.payload
      default:
         return state
   }
}

function done(state = false, action) {
   switch (action.type) {
      case FETCH_WHERE_I_LIVE_SUCCESS:
         return true
      default:
         return state
   }
}

export default combineReducers({
   loading,
   error,
   content,
   done
})
