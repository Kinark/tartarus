import axios from '~/instances/axios'

export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOFF = 'LOGOFF'

export const loginStart = () => ({ type: LOGIN_START })
export const loginSuccess = payload => ({ type: LOGIN_SUCCESS, payload })
export const loginFailure = payload => ({ type: LOGIN_FAILURE, payload })
export const logoff = () => ({ type: LOGOFF })

export const logUserIn = (email = '', password = '') => dispatch => {
   dispatch(loginStart())
   axios
      .post('login', { email, password })
      .then(({ data }) => {
         localStorage.setItem('JWToken', data.token)
         return dispatch(loginSuccess(data))
      })
      .catch(err => {
         if (err.response) return dispatch(loginFailure(err.response.data.code || 'something-wrong'))
         if (err.request) return dispatch(loginFailure('cannot-connect'))
         return dispatch(loginFailure('something-really-wrong'))
      })
}

export const logUserOff = () => dispatch => {
   localStorage.removeItem('JWToken')
   dispatch(logoff())
}
