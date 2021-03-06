import axios from 'axios'
import apiUrl from '~/constants/apiUrl'

const api = axios.create({
   baseURL: `${apiUrl}/`,
   timeout: 8000
})

api.interceptors.request.use(config => {
   const token = localStorage.getItem('JWToken')
   // eslint-disable-next-line no-param-reassign
   if (token) config.headers.Authorization = `Bearer ${token}`
   return config
})

export default api
