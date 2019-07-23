import api from '~/instances/api'

export default (rulesetId, update) => api.patch(`ruleset/${rulesetId}`, update)
