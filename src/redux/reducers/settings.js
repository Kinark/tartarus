import { combineReducers } from 'redux'
import { SET_THEME } from '../actions/settings'

function theme(state = 'light', action) {
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
