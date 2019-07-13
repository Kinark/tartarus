import api from '~/instances/axios'

export default ({ name, description, password, tags }) => api.post('world', { name, description, password, tags })
