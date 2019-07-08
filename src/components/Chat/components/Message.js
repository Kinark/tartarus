import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import colors from '~/constants/colors'
import { messagePropTypes } from '~/propTypes/message'

import DefaultAvatar from '../images/Avatar.jpg'

class Message extends PureComponent {
   static propTypes = {
      myId: PropTypes.string.isRequired,
      data: PropTypes.shape(messagePropTypes).isRequired
   }

   render() {
      const { myId, data } = this.props
      return (
         <MessageWrapper loading={!data._id}>
            <AvatarColumn owned={data.author._id === myId}>
               <Avatar src={DefaultAvatar} alt="Default Avatar" />
            </AvatarColumn>
            <ContentColumn owned={data.author._id === myId}>
               <Author>{data.author.name}</Author>
               <Content owned={data.author._id === myId}>{data.content}</Content>
            </ContentColumn>
         </MessageWrapper>
      )
   }
}
const mapStateToProps = state => ({ myId: state.auth.userId })
export default connect(mapStateToProps)(Message)

const MessageWrapper = styled.div`
   display: flex;
   margin: 20px 0;
   opacity: ${({ loading }) => loading ? '.5' : '1'};
   transition: opacity 300ms;
`

const AvatarColumn = styled.div`
   flex: 0;
   margin-right: ${({ owned }) => owned ? '0' : '10px'};
   margin-left: ${({ owned }) => owned ? '10px' : '0'};
   order: ${({ owned }) => owned ? '1' : '0'};
`

const Avatar = styled.img`
   border-radius: 50%;
   height: 45px;
   width: 45px;
`

const ContentColumn = styled.div`
   flex: 1;
   text-align: ${({ owned }) => owned ? 'right' : 'left'};
`

const Author = styled.div`
   font-family: 'upgrade';
   font-size: 18px;
`

const Content = styled.div`
   flex: 1;
   border-radius: ${({ owned }) => owned ? '15px 0' : '0 15px'} 15px 15px;
   background-color: ${({ theme }) => theme.CHAT_BG_COLOR};
   padding: 13px 16px 16px;
   max-width: 75%;
   display: inline-block;
   text-align: left;
`
ContentColumn.defaultProps = { theme: colors.light }
