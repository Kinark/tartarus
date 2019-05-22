import io from 'socket.io-client'
import apiUrl from '~/constants/apiUrl'

export default io(apiUrl)
