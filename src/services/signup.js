import api from '~/instances/axios'

export default (name, email, password) => api.post('signup', { name, email, password })
