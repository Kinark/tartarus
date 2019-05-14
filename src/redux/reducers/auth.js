import { combineReducers } from 'redux'
import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOFF } from '../actions/auth'

function loggedIn(state = false, action) {
   switch (action.type) {
      case LOGIN_SUCCESS:
         return true
      case LOGOFF:
         return false
      default:
         return state
   }
}

function loading(state = false, action) {
   switch (action.type) {
      case LOGIN_START:
         return true
      case LOGIN_SUCCESS:
      case LOGIN_FAILURE:
         return false
      default:
         return state
   }
}

function error(state = false, action) {
   switch (action.type) {
      case LOGIN_FAILURE:
         return action.payload
      case LOGIN_SUCCESS:
         return false
      default:
         return state
   }
}

export default combineReducers({
   loggedIn,
   loading,
   error
})
