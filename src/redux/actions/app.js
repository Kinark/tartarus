// import { listeners } from '~/constants/socketEvents'

export const TOGGLE_PLAY_MODE = 'TOGGLE_PLAY_MODE'
export const ADD_WORLD_TAB = 'ADD_WORLD_TAB'
export const REMOVE_WORLD_TAB = 'REMOVE_WORLD_TAB'

export const togglePlayMode = payload => ({ type: TOGGLE_PLAY_MODE, payload })
export const addWorldTab = payload => ({ type: ADD_WORLD_TAB, payload })
export const removeWorldTab = payload => ({ type: REMOVE_WORLD_TAB, payload })

export const enterRoomAndAddTab = room => dispatch => {
   dispatch(addWorldTab(room))
}

export const leaveRoomAndRemoveTab = room => dispatch => {
   dispatch(removeWorldTab(room))
}
