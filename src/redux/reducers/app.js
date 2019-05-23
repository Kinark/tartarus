import { combineReducers } from 'redux'
import { TOGGLE_PLAY_MODE, ADD_WORLD_TAB, REMOVE_WORLD_TAB, CONNECTED_APP, ADD_MESSAGE, ADD_SEVERAL_MESSAGES } from '../actions/app'

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
         const messageLoading = state.findIndex(msg => msg.nonce === action.payload.nonce)
         if (messageLoading !== -1) {
            const newArray = [...state]
            newArray[messageLoading] = action.payload
            return newArray
         }
         return [...state, action.payload]
      case ADD_SEVERAL_MESSAGES:
         return [...state, ...action.payload]
      case REMOVE_WORLD_TAB:
         return state.filter(msg => msg.room !== action.payload)
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
