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

   render() {
      const { data, title, room, type } = this.props
      return (
         <ChatWrapper>
            <CustomScroll>
               {data.map(msg => (
                  <Message key={msg.nonce} data={msg} />
               ))}
            </CustomScroll>
            <TypeBar title={title} room={room} type={type} />
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
