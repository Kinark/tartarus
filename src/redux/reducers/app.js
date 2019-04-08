import { combineReducers } from 'redux'
import { TOGGLE_PLAY_MODE } from '../actions/app'

function playMode(state = false, action) {
   switch (action.type) {
      case TOGGLE_PLAY_MODE:
         return action.value
      default:
         return state
   }
}

export default combineReducers({
   playMode
})
