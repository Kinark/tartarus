import { combineReducers } from 'redux'
import {
   TOGGLE_AUTHENTICATED,
   TOGGLE_PLAY_MODE,
   ADD_WORLD_TAB,
   REMOVE_WORLD_TAB,
   CONNECTED_APP,
   REMOVE_PLAYER,
   ADD_PLAYER,
   TURN_PLAYER_ON,
   TURN_PLAYER_OFF,
   REMOVE_MESSAGE,
   ADD_MESSAGE,
   ADD_SEVERAL_MESSAGES,
   TOGGLE_NEW_WORLD_MODAL,
   TOGGLE_LOADING_ROOM_MODAL,
   ADD_WORLD_SUBTAB,
   REMOVE_WORLD_SUBTAB,
   UPDATE_MEMBER
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

function playMode(state = false, action) {
   switch (action.type) {
      case TOGGLE_PLAY_MODE:
         return action.payload
      default:
         return state
   }
}

/**
 * Utility function to extract variables in order to minimize code on tabs reducer.
 *
 * @param {Array} tabs - Tabs to search into
 * @param {Object} payload - Payload containing the room (to lookup) and the player info
 * @param {Object} payload.room - Room (world) id to search for
 * @param {Object} [payload.player] - Player id to search for
 * @returns {Object}
 */
function extractTabVariables(oldTabs, payload) {
   const indexOfTab = oldTabs.findIndex(tab => tab._id === payload.room)
   const indexOfPlayer = oldTabs[indexOfTab].members.findIndex(member => member.user._id === payload.player)
   const newState = [...oldTabs]
   return { indexOfTab, indexOfPlayer, newState }
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
      case TURN_PLAYER_OFF: {
         const { indexOfTab, indexOfPlayer, newState } = extractTabVariables(state, action.payload)
         newState[indexOfTab].members[indexOfPlayer].online = false
         return newState
      }
      case TURN_PLAYER_ON: {
         const { indexOfTab, indexOfPlayer, newState } = extractTabVariables(state, action.payload)
         newState[indexOfTab].members[indexOfPlayer].online = true
         return newState
      }
      case ADD_PLAYER: {
         const { indexOfTab, newState } = extractTabVariables(state, action.payload)
         newState[indexOfTab].members.push(action.payload.player)
         return newState
      }
      case REMOVE_PLAYER: {
         const { indexOfTab, indexOfPlayer, newState } = extractTabVariables(state, action.payload)
         newState[indexOfTab].members.splice(indexOfPlayer, 1)
         return newState
      }
      case UPDATE_MEMBER: {
         const { indexOfTab, indexOfPlayer, newState } = extractTabVariables(state, { room: action.payload.room, player: action.payload.updatedMember.user })
         newState[indexOfTab].members[indexOfPlayer] = action.payload.updatedMember
         return newState
      }
      default:
         return state
   }
}

function subTabs(state = [], action) {
   switch (action.type) {
      case ADD_WORLD_SUBTAB:
         if (state.some(subTab => subTab._id === action.payload._id)) return state
         return [...state, action.payload]
      case REMOVE_WORLD_SUBTAB:
         return state.filter(subTab => subTab._id !== action.payload)
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
   messages,
   playMode,
   tabs,
   subTabs
})
