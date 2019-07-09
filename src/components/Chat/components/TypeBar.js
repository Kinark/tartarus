import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { sendNewMessage } from '~/redux/actions/app'
import commands from '~/constants/commands'

import SectionTitle from '~/components/SectionTitle'
import { Input } from '~/components/Input'

class TypeBar extends PureComponent {
   static propTypes = {
      dispatch: PropTypes.func.isRequired,
      room: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      myId: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      scrollChatDown: PropTypes.func.isRequired
   }

   state = {
      message: ''
   }

   commanderProxy = e => {
      e.preventDefault()
      const { message } = this.state

      if (message.charAt(0) !== '/') return this.sendMessage()
      this.setState({ message: '' })

      const pureCommand = message.substr(1).split(' ')[0]
      const args = message.split(' ')
      args.shift()

      if (typeof commands[pureCommand] === 'undefined') return false
      commands[pureCommand](args, this.props)
   }

   sendMessage = () => {
      const { message } = this.state
      const { dispatch, room, type, myId, name, scrollChatDown } = this.props

      const messageObject = {
         author: {
            _id: myId,
            name
         },
         content: message,
         room,
         type,
         nonce: myId + Date.now(),
         subRoom: null
      }
      dispatch(sendNewMessage(messageObject))
      this.setState({ message: '' })
      scrollChatDown()
   }

   render() {
      const { message } = this.state
      const { type } = this.props
      return (
         <form autoComplete="off" onSubmit={this.commanderProxy}>
            <SectionTitle small>{type === 'adventure' ? 'Aventura' : 'Conversa'}</SectionTitle>
            <Input name="message" value={message} onChange={e => this.setState({ message: e.target.value })} placeholder="Digite sua mensagem aqui." />
         </form>
      )
   }
}
const mapStateToProps = state => ({ myId: state.auth.userId, name: state.auth.username })
export default connect(mapStateToProps)(TypeBar)
