import api from '~/instances/api'

export default update => api.patch('ruleset', update)
