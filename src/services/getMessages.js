import api from '~/instances/api'

export default worldId => api.get(`messages/${worldId}`)
