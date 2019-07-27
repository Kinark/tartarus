import api from '~/instances/api'

export default rulesetId => api.get(`ruleset/${rulesetId}`)
