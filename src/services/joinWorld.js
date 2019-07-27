import api from '~/instances/api'

export default (worldId, password = '') => api.patch('join-world', { _id: worldId, password })
