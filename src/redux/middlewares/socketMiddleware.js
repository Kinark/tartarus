import io from 'socket.io-client'
import apiUrl from '~/constants/apiUrl'

export default function socketMiddleware() {
   const socket = io(`${apiUrl}/gateway`)

   return ({ dispatch }) => next => action => {
      return next(action)
      if (typeof action === 'function') {
         return next(action)
      }

      const { event, leave, handle, ...rest } = action

      if (!event) {
         return next(action)
      }

      if (leave) {
         socket.removeListener(event)
      }

      let handleEvent = handle
      if (typeof handleEvent === 'string') {
         handleEvent = payload => dispatch({ type: handle, payload, ...rest })
      }
      return socket.on(event, handleEvent)
   }
}
