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
      const { myId, data: { _id, author, dicesResults, dices, content } } = this.props
      const owned = author._id === myId
      return (
         <MessageWrapper loading={!_id}>
            <AvatarColumn owned={owned}>
               <Avatar src={DefaultAvatar} alt="Default Avatar" />
            </AvatarColumn>
            <ContentColumn owned={owned}>
               <Author>{author.name}</Author>
               {dicesResults && dicesResults.length > 0 ? (
                  <ContentRoll owned={owned}>
                     <RollResult owned={owned}>{content}</RollResult>
                     <RollDices>
                        {dices.map((dice, i) => (
                           <EachDice key={i}>
                              <span>{dice}</span>
                              <br />
                              {dicesResults[i]}
                           </EachDice>
                        ))}
                     </RollDices>
                  </ContentRoll>
               ) : (
                  <Content owned={author._id === myId}>{content}</Content>
               )}
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
   opacity: ${({ loading }) => (loading ? '.5' : '1')};
   transition: opacity 300ms;
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
   * {
      user-select: text !important;
   }
`

const Author = styled.div`
   font-family: 'upgrade';
   font-size: 18px;
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

const ContentRoll = styled.div`
   flex: 1;
   border-radius: ${({ owned }) => (owned ? '15px 0' : '0 15px')} 15px 15px;
   background-color: ${({ theme }) => theme.CHAT_BG_COLOR};
   border: solid 3px ${({ theme }) => theme.TITLE};
   /* padding: 13px 16px 16px; */
   max-width: 75%;
   display: inline-flex;
   text-align: left;
`
ContentColumn.defaultProps = { theme: colors.light }

const RollResult = styled.div`
   flex: 0;
   border-radius: 0 0 ${({ owned }) => (owned ? '7px 0' : '0 7px')};
   background-color: ${({ theme }) => theme.TITLE};
   padding: 3px 16px;
   font-family: 'upgrade',sans-serif;
   font-size: 32px;
   font-weight: 500;
   color: ${({ theme }) => theme.BG};
   order: ${({ owned }) => (owned ? '1' : '0')};
`
RollResult.defaultProps = { theme: colors.light }

const RollDices = styled.div`
   flex: 1;
   display: flex;
   flex-direction: row;
   padding: 7px 16px;
   line-height: normal;
`

const EachDice = styled.div`
   margin: 0 5px;
   &:not(:last-of-type) {
      padding-right: 10px;
      border-right: solid 1px ${({ theme }) => theme.DIVIER_SOFT};
   }
   span {
      font-weight: 700;
   }
`
EachDice.defaultProps = { theme: colors.light }
