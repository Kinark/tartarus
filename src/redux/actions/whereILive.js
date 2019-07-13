import getWhereILive from '~/services/getWhereILive';

export const FETCH_WHERE_I_LIVE_START = 'FETCH_WHERE_I_LIVE_START'
export const FETCH_WHERE_I_LIVE_SUCCESS = 'FETCH_WHERE_I_LIVE_SUCCESS'
export const FETCH_WHERE_I_LIVE_FAILURE = 'FETCH_WHERE_I_LIVE_FAILURE'
export const FETCH_WHERE_I_LIVE_TOGGLE_MODAL = 'FETCH_WHERE_I_LIVE_FAILURE'

export const fetchWhereILiveStart = () => ({ type: FETCH_WHERE_I_LIVE_START })
export const fetchWhereILiveSuccess = payload => ({ type: FETCH_WHERE_I_LIVE_SUCCESS, payload })
export const fetchWhereILiveFailure = payload => ({ type: FETCH_WHERE_I_LIVE_FAILURE, payload })
export const fetchWhereILiveToggleModal = payload => ({ type: FETCH_WHERE_I_LIVE_TOGGLE_MODAL, payload })

export const fetchWhereILive = () => dispatch => {
   dispatch(fetchWhereILiveStart())
   getWhereILive()
      .then(({ data }) => dispatch(fetchWhereILiveSuccess(data)))
      .catch(err => dispatch(fetchWhereILiveFailure(err.response.data.code)))
}
