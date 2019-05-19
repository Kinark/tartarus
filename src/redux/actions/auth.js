import axios from '~/instances/axios'

export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOFF = 'LOGOFF'

export const loginStart = () => ({ type: LOGIN_START })
export const loginSuccess = () => ({ type: LOGIN_SUCCESS })
export const loginFailure = payload => ({ type: LOGIN_FAILURE, payload })
export const logoff = () => ({ type: LOGOFF })

export const logUserIn = (email, password) => dispatch => {
   dispatch(loginStart())
      axios
         .post('login', { email, password })
         .then(response => {
            localStorage.setItem('JWToken', response.data.token)
            return dispatch(loginSuccess())
         })
         .catch(err => dispatch(loginFailure(err.response.data.code)))
}

export const logUserOff = () => dispatch => {
   localStorage.removeItem('JWToken')
   dispatch(logoff())
}
