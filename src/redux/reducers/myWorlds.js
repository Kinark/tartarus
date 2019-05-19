import { combineReducers } from 'redux'
import { FETCH_MY_WORLDS_START, FETCH_MY_WORLDS_SUCCESS, FETCH_MY_WORLDS_FAILURE } from '../actions/myWorlds'

function loading(state = false, action) {
   switch (action.type) {
      case FETCH_MY_WORLDS_START:
         return true
      case FETCH_MY_WORLDS_SUCCESS:
      case FETCH_MY_WORLDS_FAILURE:
         return false
      default:
         return state
   }
}

function error(state = false, action) {
   switch (action.type) {
      case FETCH_MY_WORLDS_FAILURE:
         return action.payload
      case FETCH_MY_WORLDS_SUCCESS:
         return false
      default:
         return state
   }
}

function content(state = false, action) {
   switch (action.type) {
      case FETCH_MY_WORLDS_SUCCESS:
         return action.payload
      default:
         return state
   }
}

export default combineReducers({
   loading,
   error,
   content
})
