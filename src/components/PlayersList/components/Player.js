import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import colors from '~/constants/colors'
// import { messagePropTypes } from '~/propTypes/message'

import DefaultAvatar from '../images/Avatar.jpg'

class Message extends PureComponent {
   static propTypes = {
      data: PropTypes.shape({}).isRequired
   }

   render() {
      const { data } = this.props
      return (
         <MessageWrapper online={data.online}>
            <AvatarColumn>
               <Avatar src={DefaultAvatar} alt="Default Avatar" />
            </AvatarColumn>
            <ContentColumn>
               <Author>{data.user.name}</Author>
               {/* <Content>{content}</Content> */}
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
   opacity: ${({ online }) => (online ? '1' : '.5')};
   transition: opacity 300ms;
   align-items: center;
`

const AvatarColumn = styled.div`
   flex: 0;
   margin-right: ${({ owned }) => (owned ? '0' : '10px')};
   margin-left: ${({ owned }) => (owned ? '10px' : '0')};
   order: ${({ owned }) => (owned ? '1' : '0')};
`

const Avatar = styled.img`
   border-radius: 50%;
   height: 45px;
   width: 45px;
`

const ContentColumn = styled.div`
   flex: 1;
   text-align: ${({ owned }) => (owned ? 'right' : 'left')};
`

const Author = styled.div`
   font-family: 'upgrade';
   font-size: 18px;
   margin-top: -10px;
`

const Content = styled.div`
   flex: 1;
   border-radius: ${({ owned }) => (owned ? '15px 0' : '0 15px')} 15px 15px;
   background-color: ${({ theme }) => theme.CHAT_BG_COLOR};
   padding: 13px 16px 16px;
   max-width: 75%;
   display: inline-block;
   text-align: left;
`
ContentColumn.defaultProps = { theme: colors.light }

const RollResult = styled.div`
   flex: 0;
   border-radius: 0 0 ${({ owned }) => (owned ? '7px 0' : '0 7px')};
   background-color: ${({ theme }) => theme.TITLE};
   padding: 3px 16px;
   font-family: 'upgrade', sans-serif;
   font-size: 32px;
   font-weight: 500;
   color: ${({ theme }) => theme.BG};
   order: ${({ owned }) => (owned ? '1' : '0')};
`
RollResult.defaultProps = { theme: colors.light }

const EachDice = styled.div`
   margin: 0 5px;
   &:not(:last-of-type) {
      padding-right: 10px;
      border-right: solid 1px ${({ theme }) => theme.DIVIDER_SOFT};
   }
   span {
      font-weight: 700;
   }
`
EachDice.defaultProps = { theme: colors.light }
