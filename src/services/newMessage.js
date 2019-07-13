import api from '~/instances/api'

export default messageObject => api.post('message', messageObject)
