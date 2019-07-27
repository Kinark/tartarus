import api from '~/instances/api'

export default ({ name, description, password, tags }) => api.post('world', { name, description, password, tags })
