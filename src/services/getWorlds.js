import api from '~/instances/axios'

export default search => api.post('search-worlds', { search })
