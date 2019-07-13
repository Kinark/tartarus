import api from '~/instances/axios'

export default worldId => api.get(`world/${worldId}`)
