import axios from 'axios'
import apiUrl from '~/constants/apiUrl'

export const NEW_WORLD_START = 'NEW_WORLD_START'
export const NEW_WORLD_SUCCESS = 'NEW_WORLD_SUCCESS'
export const NEW_WORLD_FAILURE = 'NEW_WORLD_FAILURE'
export const NEW_WORLD_TOGGLE_MODAL = 'NEW_WORLD_FAILURE'

export const newWorldStart = () => ({ type: NEW_WORLD_START })
export const newWorldSuccess = () => ({ type: NEW_WORLD_SUCCESS })
export const newWorldFailure = payload => ({ type: NEW_WORLD_FAILURE, payload })
export const newWorldToggleModal = payload => ({ type: NEW_WORLD_TOGGLE_MODAL, payload })

export const createNewWorld = newWorldInfo => dispatch => {
   dispatch(newWorldStart())
   axios
      .post(`${apiUrl}/world`, newWorldInfo)
      .then(() => dispatch(newWorldSuccess()))
      .catch(err => dispatch(newWorldFailure(err.response.data.code)))
}
