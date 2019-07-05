import axios from '~/instances/axios'
import socket from '~/instances/socket'

export const TOGGLE_PLAY_MODE = 'TOGGLE_PLAY_MODE'
export const ADD_WORLD_TAB = 'ADD_WORLD_TAB'
export const REMOVE_WORLD_TAB = 'REMOVE_WORLD_TAB'
export const CONNECTED_APP = 'CONNECTED_APP'
export const ADD_MESSAGE = 'ADD_MESSAGE'
export const ADD_SEVERAL_MESSAGES = 'ADD_SEVERAL_MESSAGES'
export const TOGGLE_NEW_WORLD_MODAL = 'TOGGLE_NEW_WORLD_MODAL'
export const TOGGLE_LOADING_ROOM_MODAL = 'TOGGLE_LOADING_ROOM_MODAL'

export const togglePlayMode = payload => ({ type: TOGGLE_PLAY_MODE, payload })
export const addWorldTab = payload => ({ type: ADD_WORLD_TAB, payload })
export const removeWorldTab = payload => ({ type: REMOVE_WORLD_TAB, payload })
export const connectApp = payload => ({ type: CONNECTED_APP, payload })
export const addMessage = payload => ({ type: ADD_MESSAGE, payload })
export const addSeveralMessages = payload => ({ type: ADD_SEVERAL_MESSAGES, payload })
export const toggleNewWorldModal = payload => ({ type: TOGGLE_NEW_WORLD_MODAL, payload })
export const toggleLoadingRoomModal = payload => ({ type: TOGGLE_LOADING_ROOM_MODAL, payload })

export const activateSocketListeners = () => dispatch => {
   dispatch(connectApp(false))
   socket.on('connect', () => dispatch(connectApp(true)))
   socket.on('disconnect', () => dispatch(connectApp(false)))
}

export const activateAppListeners = () => dispatch => {
   // socket.connect()
   socket.emit('authenticate', localStorage.getItem('JWToken'))
   socket.on('message', msg => dispatch(addMessage(msg)))
}

export const deactivateAppListeners = () => () => {
   // socket.disconnect()
   socket.removeListener('message')
}

export const sendNewMessage = msgObject => dispatch => {
   dispatch(addMessage(msgObject))
   // socket.emit('new-message', data => dispatch(addMessage(data)))
   axios
      .post('message', msgObject)
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
   socket.emit('enter-room', roomId)
   axios
      .get(`world/${roomId}`)
      .then(({ data }) => dispatch(addWorldTab(data)))
      .catch(() => {
         // if (err.response) return dispatch(loginFailure(err.response.data.code || 'something-wrong'))
         // if (err.request) return dispatch(loginFailure('cannot-connect'))
         // return dispatch(loginFailure('something-really-wrong'))
      })
   axios
      .get(`messages/${roomId}`)
      .then(({ data }) => dispatch(addSeveralMessages(data)))
      .catch(err => {
         console.log(err)
         // if (err.response) return dispatch(loginFailure(err.response.data.code || 'something-wrong'))
         // if (err.request) return dispatch(loginFailure('cannot-connect'))
         // return dispatch(loginFailure('something-really-wrong'))
      })
}

export const leaveRoomAndRemoveTab = roomId => dispatch => {
   socket.emit('leave-room', roomId)
   dispatch(removeWorldTab(roomId))
}
