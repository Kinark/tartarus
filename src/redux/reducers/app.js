import { combineReducers } from 'redux'
import { TOGGLE_PLAY_MODE, ADD_WORLD_TAB, REMOVE_WORLD_TAB, CONNECTED_APP, ADD_MESSAGE } from '../actions/app'

function connected(state = false, action) {
   switch (action.type) {
      case CONNECTED_APP:
         return action.payload
      default:
         return state
   }
}

function messages(state = [], action) {
   switch (action.type) {
      case ADD_MESSAGE:
         return [...state, action.payload]
      default:
         return state
   }
}

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
         if (state.find(world => world._id === action.payload)) return state
         return [...state, action.payload]
      case REMOVE_WORLD_TAB:
         if (!state.find(world => world._id === action.payload)) return state
         console.log('a')
         return state.filter(world => world._id !== action.payload)
      default:
         return state
   }
}

export default combineReducers({
   connected,
   messages,
   playMode,
   tabs
})
