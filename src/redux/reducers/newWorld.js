import { combineReducers } from 'redux'
import { NEW_WORLD_START, NEW_WORLD_SUCCESS, NEW_WORLD_FAILURE, NEW_WORLD_TOGGLE_MODAL } from '../actions/newWorld'

function modal(state = false, action) {
   switch (action.type) {
      case NEW_WORLD_TOGGLE_MODAL:
         return action.payload
      default:
         return state
   }
}

function loading(state = false, action) {
   switch (action.type) {
      case NEW_WORLD_START:
         return true
      case NEW_WORLD_SUCCESS:
      case NEW_WORLD_FAILURE:
         return false
      default:
         return state
   }
}

function error(state = false, action) {
   switch (action.type) {
      case NEW_WORLD_FAILURE:
         return action.payload
      case NEW_WORLD_SUCCESS:
         return false
      default:
         return state
   }
}

export default combineReducers({
   modal,
   loading,
   error
})
