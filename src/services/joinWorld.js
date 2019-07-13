import api from '~/instances/axios'

export default (worldId, password = '') => api.patch('join-world', { _id: worldId, password })
