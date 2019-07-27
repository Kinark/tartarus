import getMyRulesets from '~/services/getMyRulesets'

export const FETCH_MY_RULESETS_START = 'FETCH_MY_RULESETS_START'
export const FETCH_MY_RULESETS_SUCCESS = 'FETCH_MY_RULESETS_SUCCESS'
export const FETCH_MY_RULESETS_FAILURE = 'FETCH_MY_RULESETS_FAILURE'
export const FETCH_MY_RULESETS_TOGGLE_MODAL = 'FETCH_MY_RULESETS_FAILURE'

export const fetchMyRulesetsStart = () => ({ type: FETCH_MY_RULESETS_START })
export const fetchMyRulesetsSuccess = payload => ({ type: FETCH_MY_RULESETS_SUCCESS, payload })
export const fetchMyRulesetsFailure = payload => ({ type: FETCH_MY_RULESETS_FAILURE, payload })
export const fetchMyRulesetsToggleModal = payload => ({ type: FETCH_MY_RULESETS_TOGGLE_MODAL, payload })

export const fetchMyRulesets = () => dispatch => {
   dispatch(fetchMyRulesetsStart())
   getMyRulesets()
      .then(({ data }) => dispatch(fetchMyRulesetsSuccess(data)))
      .catch(err => dispatch(fetchMyRulesetsFailure(err.response.data.code)))
}
