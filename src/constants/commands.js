import axios from '~/instances/axios'
import { addToToastQueue } from '~/redux/actions/toastNotifications'
import { addMessage, removeMessage } from '~/redux/actions/app'

const commands = {
   roll: (dices, { dispatch, room, type, myId, name }) => {
      const nonce = myId + Date.now()
      const messageObject = {
         content: 'Rolando dados...',
         author: {
            _id: myId,
            name
         },
         room,
         type,
         nonce,
         subRoom: null,
         dices
      }
      dispatch(addMessage(messageObject))
      axios
         .post('roll', messageObject)
         .then(({ data }) => dispatch(addMessage(data)))
         .catch(err => {
            dispatch(removeMessage(nonce))
            let errorMsg;
            switch (err.response.data.code) {
               case 'wrong-dices':
                  errorMsg = 'Há algo de errado com estes dados (dados inválidos).'
                  break
               case 'too-many-dices':
                  errorMsg = 'Não rolamos tantos dados assim por aqui'
                  break
               default:
                  errorMsg = 'Algo de errado aconteceu na rolagem'
                  break
            }
            dispatch(addToToastQueue(errorMsg))
         })
   }
}

export default commands
