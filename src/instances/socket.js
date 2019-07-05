import io from 'socket.io-client'
import apiUrl from '~/constants/apiUrl'

export default io.connect(apiUrl, {
   reconnection: true,
   reconnectionDelay: 1000,
   reconnectionAttempts: 100
 })
