export const ADD_TO_TOAST_QUEUE = 'ADD_TO_TOAST_QUEUE'
export const REMOVE_FROM_TOAST_QUEUE = 'REMOVE_FROM_TOAST_QUEUE'
export const SET_ACTIVE_TOAST = 'SET_ACTIVE_TOAST'

export const addToToastQueue = payload => ({ type: ADD_TO_TOAST_QUEUE, payload })
export const removeFromToastQueue = payload => ({ type: REMOVE_FROM_TOAST_QUEUE, payload })
export const setActiveToast = payload => ({ type: SET_ACTIVE_TOAST, payload })
