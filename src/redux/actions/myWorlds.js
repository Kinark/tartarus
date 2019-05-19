import axios from '~/instances/axios'

export const FETCH_MY_WORLDS_START = 'FETCH_MY_WORLDS_START'
export const FETCH_MY_WORLDS_SUCCESS = 'FETCH_MY_WORLDS_SUCCESS'
export const FETCH_MY_WORLDS_FAILURE = 'FETCH_MY_WORLDS_FAILURE'
export const FETCH_MY_WORLDS_TOGGLE_MODAL = 'FETCH_MY_WORLDS_FAILURE'

export const fetchMyWorldStart = () => ({ type: FETCH_MY_WORLDS_START })
export const fetchMyWorldSuccess = payload => ({ type: FETCH_MY_WORLDS_SUCCESS, payload })
export const fetchMyWorldFailure = payload => ({ type: FETCH_MY_WORLDS_FAILURE, payload })
export const fetchMyWorldToggleModal = payload => ({ type: FETCH_MY_WORLDS_TOGGLE_MODAL, payload })

export const createfetchMyWorld = () => dispatch => {
   dispatch(fetchMyWorldStart())
   axios
      .get('my-worlds')
      .then(() => dispatch(fetchMyWorldSuccess()))
      .catch(err => dispatch(fetchMyWorldFailure(err.response.data.code)))
}
