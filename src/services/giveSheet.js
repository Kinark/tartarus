import api from '~/instances/api'

export default (worldId, userId, rulesetId) => api.post(`/world/${worldId}/give-sheet`, { userId, rulesetId })
