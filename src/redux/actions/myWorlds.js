import getMyWorlds from '~/services/getMyWorlds'

export const FETCH_MY_WORLDS_START = 'FETCH_MY_WORLDS_START'
export const FETCH_MY_WORLDS_SUCCESS = 'FETCH_MY_WORLDS_SUCCESS'
export const FETCH_MY_WORLDS_FAILURE = 'FETCH_MY_WORLDS_FAILURE'
export const FETCH_MY_WORLDS_TOGGLE_MODAL = 'FETCH_MY_WORLDS_FAILURE'

export const fetchMyWorldsStart = () => ({ type: FETCH_MY_WORLDS_START })
export const fetchMyWorldsSuccess = payload => ({ type: FETCH_MY_WORLDS_SUCCESS, payload })
export const fetchMyWorldsFailure = payload => ({ type: FETCH_MY_WORLDS_FAILURE, payload })
export const fetchMyWorldsToggleModal = payload => ({ type: FETCH_MY_WORLDS_TOGGLE_MODAL, payload })

export const fetchMyWorlds = () => dispatch => {
   dispatch(fetchMyWorldsStart())
   getMyWorlds()
      .then(({ data }) => dispatch(fetchMyWorldsSuccess(data)))
      .catch(err => dispatch(fetchMyWorldsFailure(err.response.data.code)))
}
