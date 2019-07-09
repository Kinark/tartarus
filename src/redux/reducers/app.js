import { combineReducers } from 'redux'
import {
   TOGGLE_AUTHENTICATED,
   TOGGLE_PLAY_MODE,
   ADD_WORLD_TAB,
   REMOVE_WORLD_TAB,
   CONNECTED_APP,
   REMOVE_PLAYER,
   ADD_PLAYER,
   ADD_SEVERAL_PLAYERS,
   REMOVE_MESSAGE,
   ADD_MESSAGE,
   ADD_SEVERAL_MESSAGES,
   TOGGLE_NEW_WORLD_MODAL,
   TOGGLE_LOADING_ROOM_MODAL
} from '../actions/app'

function newWorldModalOpen(state = false, action) {
   switch (action.type) {
      case TOGGLE_NEW_WORLD_MODAL:
         return action.payload
      default:
         return state
   }
}

function loadingRoomModal(state = false, action) {
   switch (action.type) {
      case TOGGLE_LOADING_ROOM_MODAL:
         return action.payload
      default:
         return state
   }
}

function authenticated(state = false, action) {
   switch (action.type) {
      case TOGGLE_AUTHENTICATED:
         return action.payload
      case CONNECTED_APP:
         if (!action.payload) return false
         return state
      default:
         return state
   }
}

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
      case REMOVE_MESSAGE:
         return state.filter(msg => msg.nonce !== action.payload)
      case REMOVE_WORLD_TAB:
         return state.filter(msg => msg.room !== action.payload)
      case CONNECTED_APP:
         if (!action.payload) return []
         return state
      default:
         return state
   }
}

function players(state = [], action) {
   switch (action.type) {
      case REMOVE_PLAYER:
         return state.filter(player => player._id !== action.payload)
      case ADD_PLAYER:
         if (state.find(player => player._id === action.payload._id)) return state
         return [...state, action.payload]
      case ADD_SEVERAL_PLAYERS:
         return [...state, ...action.payload]
      case REMOVE_WORLD_TAB:
         return state.filter(player => player.room !== action.payload)
      case CONNECTED_APP:
         if (!action.payload) return []
         return state
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
         if (state.some(world => world._id === action.payload._id)) return state
         return [...state, action.payload]
      case REMOVE_WORLD_TAB:
         if (!state.find(world => world._id === action.payload)) return state
         return state.filter(world => world._id !== action.payload)
      case CONNECTED_APP:
         if (!action.payload) return []
         return state
      default:
         return state
   }
}

export default combineReducers({
   newWorldModalOpen,
   loadingRoomModal,
   authenticated,
   connected,
   players,
   messages,
   playMode,
   tabs
})
