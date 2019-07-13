import api from '~/instances/api'

export default (email, password) => api.post('login', { email, password })
