import api from '~/instances/api'

export default search => api.post('search-worlds', { search })
