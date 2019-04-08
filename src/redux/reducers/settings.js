import { combineReducers } from 'redux'
import { TOGGLE_DARK_MODE } from '../actions/settings'

function theme(state = false, action) {
   switch (action.type) {
      case TOGGLE_DARK_MODE:
         return action.value
      default:
         return state
   }
}

export default combineReducers({
   theme
})
