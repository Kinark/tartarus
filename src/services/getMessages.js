import api from '~/instances/axios'

export default worldId => api.get(`messages/${worldId}`)
