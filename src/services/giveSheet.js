import api from '~/instances/api'

export default ({ worldId, playerId, rulesetId, type }) => api.post(`world/${worldId}/give-sheet`, { playerId, rulesetId, type })
