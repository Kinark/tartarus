import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import CustomScroll from '~/components/CustomScroll'

import Message from './components/Message'
import TypeBar from './components/TypeBar'

export default class Chat extends PureComponent {
   static propTypes = {
      data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
      title: PropTypes.string.isRequired,
      room: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired
   }

   state = {
      locked: true
   }

   componentDidMount() {
      this.chatScroll.addEventListener('scroll', this.unlockOnManualScroll, { passive: true })
   }

   componentDidUpdate = () => {
      const { locked } = this.state
      if (locked) this.scrollChatDown()
   }

   componentWillUnmount() {
      this.chatScroll.removeEventListener('scroll', this.unlockOnManualScroll)
   }

   scrollChatDown = () => {
      this.chatScroll.scrollTop = this.chatScroll.scrollHeight
      this.setState({ locked: true })
   }

   unlockOnManualScroll = () => {
      const { locked } = this.state
      const isItScrolledDown = this.chatScroll.scrollHeight - this.chatScroll.scrollTop === this.chatScroll.clientHeight
      if (locked === isItScrolledDown) return
      this.setState({ locked: isItScrolledDown })
   }

   render() {
      const { data, title, room, type } = this.props
      return (
         <ChatWrapper>
            <CustomScroll ref={el => (this.chatScroll = el)}>
               {data.map(msg => (
                  <Message key={msg.nonce} data={msg} />
               ))}
            </CustomScroll>
            <TypeBar title={title} room={room} type={type} scrollChatDown={this.scrollChatDown} />
         </ChatWrapper>
      )
   }
}

const ChatWrapper = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   height: 100%;
   padding: 15px;
`
