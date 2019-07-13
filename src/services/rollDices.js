import api from '~/instances/axios'

export default messageObject => api.post('roll', messageObject)
