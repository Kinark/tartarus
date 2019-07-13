import api from '~/instances/api'

export default messageObject => api.post('roll', messageObject)
