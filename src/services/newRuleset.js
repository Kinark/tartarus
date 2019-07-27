import api from '~/instances/api'

export default name => api.post('ruleset', { name })
