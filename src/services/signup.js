import api from '~/instances/api'

export default (name, email, password) => api.post('signup', { name, email, password })
