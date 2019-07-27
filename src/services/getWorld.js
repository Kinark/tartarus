import api from '~/instances/api'

export default worldId => api.get(`world/${worldId}`)
