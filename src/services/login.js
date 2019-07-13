import api from '~/instances/axios'

export default (email, password) => api.post('login', { email, password })
