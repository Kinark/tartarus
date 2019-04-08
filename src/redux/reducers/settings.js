import { combineReducers } from 'redux'
import { SET_THEME } from '../actions/settings'

function theme(state = false, action) {
   switch (action.type) {
      case SET_THEME:
         return action.value
      default:
         return state
   }
}

export default combineReducers({
   theme
})
