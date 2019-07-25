import getWorld from '~/services/getWorld';
import newMessage from '~/services/newMessage';
import getMessages from '~/services/getMessages';
import socket from '~/instances/socket'

export const TOGGLE_AUTHENTICATED = 'TOGGLE_AUTHENTICATED'
export const TOGGLE_PLAY_MODE = 'TOGGLE_PLAY_MODE'
export const ADD_WORLD_TAB = 'ADD_WORLD_TAB'
export const REMOVE_WORLD_TAB = 'REMOVE_WORLD_TAB'
export const CONNECTED_APP = 'CONNECTED_APP'
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE'
export const ADD_MESSAGE = 'ADD_MESSAGE'
export const ADD_SEVERAL_MESSAGES = 'ADD_SEVERAL_MESSAGES'
export const REMOVE_PLAYER = 'REMOVE_PLAYER'
export const ADD_PLAYER = 'ADD_PLAYER'
export const TURN_PLAYER_ON = 'TURN_PLAYER_ON'
export const TURN_PLAYER_OFF = 'TURN_PLAYER_OFF'
export const TOGGLE_NEW_WORLD_MODAL = 'TOGGLE_NEW_WORLD_MODAL'
export const TOGGLE_LOADING_ROOM_MODAL = 'TOGGLE_LOADING_ROOM_MODAL'
export const ADD_WORLD_SUBTAB = 'ADD_WORLD_SUBTAB'
export const REMOVE_WORLD_SUBTAB = 'REMOVE_WORLD_TSUBAB'

export const toggleAuthenticated = payload => ({ type: TOGGLE_AUTHENTICATED, payload })
export const togglePlayMode = payload => ({ type: TOGGLE_PLAY_MODE, payload })
export const addWorldTab = payload => ({ type: ADD_WORLD_TAB, payload })
export const removeWorldTab = payload => ({ type: REMOVE_WORLD_TAB, payload })
export const connectApp = payload => ({ type: CONNECTED_APP, payload })
export const removeMessage = payload => ({ type: REMOVE_MESSAGE, payload })
export const addMessage = payload => ({ type: ADD_MESSAGE, payload })
export const addSeveralMessages = payload => ({ type: ADD_SEVERAL_MESSAGES, payload })
export const removePlayer = payload => ({ type: REMOVE_PLAYER, payload })
export const addPlayer = payload => ({ type: ADD_PLAYER, payload })
export const turnPlayerOn = payload => ({ type: TURN_PLAYER_ON, payload })
export const turnPlayerOff = payload => ({ type: TURN_PLAYER_OFF, payload })
export const toggleNewWorldModal = payload => ({ type: TOGGLE_NEW_WORLD_MODAL, payload })
export const toggleLoadingRoomModal = payload => ({ type: TOGGLE_LOADING_ROOM_MODAL, payload })
export const addWorldSubTab = payload => ({ type: ADD_WORLD_SUBTAB, payload })
export const removeWorldSubTab = payload => ({ type: REMOVE_WORLD_SUBTAB, payload })

export const activateSocketListeners = () => dispatch => {
   socket.on('connect', () => dispatch(connectApp(true)))
   socket.on('disconnect', () => dispatch(connectApp(false)))
}

export const activateAppListeners = () => dispatch => {
   // socket.connect()
   socket.emit('authenticate', localStorage.getItem('JWToken'), authenticated => {
      dispatch(toggleAuthenticated(authenticated))
   })
   socket.on('message', msg => dispatch(addMessage(msg)))
   socket.on('joining-player', player => dispatch(turnPlayerOn(player)))
   socket.on('leaving-player', player => dispatch(turnPlayerOff(player)))
   socket.on('new-player', player => dispatch(addPlayer(player)))
   socket.on('quitting-player', playerId => dispatch(removePlayer(playerId)))
}

export const deactivateAppListeners = () => () => {
   // socket.disconnect()
   socket.removeListener('message')
}

export const sendNewMessage = msgObject => dispatch => {
   dispatch(addMessage(msgObject))
   // socket.emit('new-message', data => dispatch(addMessage(data)))
   newMessage(msgObject)
      .then(({ data }) => dispatch(addMessage(data)))
      .catch(err => {
         console.log(err)
         console.log(err.message)
         // if (err.response) return dispatch(loginFailure(err.response.data.code || 'something-wrong'))
         // if (err.request) return dispatch(loginFailure('cannot-connect'))
         // return dispatch(loginFailure('something-really-wrong'))
      })
}

export const enterRoomAndAddTab = roomId => dispatch => {
   socket.emit('enter-room', roomId, () => {
   getWorld(roomId)
      .then(({ data }) => dispatch(addWorldTab(data)))
      .catch(() => {
         // if (err.response) return dispatch(loginFailure(err.response.data.code || 'something-wrong'))
         // if (err.request) return dispatch(loginFailure('cannot-connect'))
         // return dispatch(loginFailure('something-really-wrong'))
      })
   getMessages(roomId)
      .then(({ data }) => dispatch(addSeveralMessages(data)))
      .catch(err => {
         console.log(err)
         // if (err.response) return dispatch(loginFailure(err.response.data.code || 'something-wrong'))
         // if (err.request) return dispatch(loginFailure('cannot-connect'))
         // return dispatch(loginFailure('something-really-wrong'))
      })
   })
}

export const leaveRoomAndRemoveTab = roomId => dispatch => {
   socket.emit('leave-room', roomId)
   dispatch(removeWorldTab(roomId))
}
