import axios from 'axios'
import apiUrl from '~/constants/apiUrl'

const token = localStorage.getItem('JWToken')

export default axios.create({
   baseURL: `${apiUrl}/`,
   timeout: 8000,
   headers: token ? { Authorization: `Bearer ${token}` } : undefined
})