import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { sendNewMessage } from '~/redux/actions/app'

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

   sendMessage = e => {
      const { message } = this.state
      const { dispatch, room, type, myId, name, scrollChatDown } = this.props
      e.preventDefault()
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
         <form onSubmit={this.sendMessage}>
            <SectionTitle small>{type === 'adventure' ? 'Aventura' : 'Conversa'}</SectionTitle>
            <Input name="message" value={message} onChange={e => this.setState({ message: e.target.value })} placeholder="Digite sua mensagem aqui." />
         </form>
      )
   }
}
const mapStateToProps = state => ({ myId: state.auth.userId, name: state.auth.username })
export default connect(mapStateToProps)(TypeBar)
