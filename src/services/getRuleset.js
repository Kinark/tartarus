import api from '~/instances/api'

export default worldId => api.get(`ruleset/${worldId}`)
