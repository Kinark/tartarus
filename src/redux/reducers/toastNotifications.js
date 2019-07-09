import { combineReducers } from 'redux'
import { ADD_TO_TOAST_QUEUE, REMOVE_FROM_TOAST_QUEUE, SET_ACTIVE_TOAST } from '../actions/toastNotifications'

function queue(state = [], action) {
   switch (action.type) {
      case ADD_TO_TOAST_QUEUE:
         return [...state, action.payload]
      case REMOVE_FROM_TOAST_QUEUE:
         return [...state].splice(0, action.payload)
      default:
         return state
   }
}

function active(state = '', action) {
   switch (action.type) {
      case SET_ACTIVE_TOAST:
         return action.payload
      default:
         return state
   }
}

export default combineReducers({
   queue,
   active
})
