import { combineReducers } from 'redux'
import { TOGGLE_PLAY_MODE, ADD_WORLD_TAB, REMOVE_WORLD_TAB } from '../actions/app'

function playMode(state = false, action) {
   switch (action.type) {
      case TOGGLE_PLAY_MODE:
         return action.payload
      default:
         return state
   }
}

function tabs(state = [], action) {
   switch (action.type) {
      case ADD_WORLD_TAB:
         if (state.find(world => world === action.payload)) return state
         return [...state, action.payload]
      case REMOVE_WORLD_TAB:
         if (!state.find(world => world === action.payload)) return state
         return state.filter(world => world !== action.payload)
      default:
         return state
   }
}

export default combineReducers({
   playMode,
   tabs
})
