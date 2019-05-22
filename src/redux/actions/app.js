import axios from '~/instances/axios'
import socket from '~/instances/socket'
// import { listeners } from '~/constants/socketEvents'

export const TOGGLE_PLAY_MODE = 'TOGGLE_PLAY_MODE'
export const ADD_WORLD_TAB = 'ADD_WORLD_TAB'
export const REMOVE_WORLD_TAB = 'REMOVE_WORLD_TAB'

export const togglePlayMode = payload => ({ type: TOGGLE_PLAY_MODE, payload })
export const addWorldTab = payload => ({ type: ADD_WORLD_TAB, payload })
export const removeWorldTab = payload => ({ type: REMOVE_WORLD_TAB, payload })

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
}

export const leaveRoomAndRemoveTab = roomId => dispatch => {
   socket.emit('leave-room', roomId)
   dispatch(removeWorldTab(roomId))
}
