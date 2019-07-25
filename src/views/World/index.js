import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import styled from 'styled-components'

import { messagePropTypes } from '~/propTypes/message'
import { enterRoomAndAddTab, togglePlayMode } from '~/redux/actions/app'

import AppMainWrapper from '~/components/AppMainWrapper'
import FullHeight from '~/components/FullHeight'
import SectionContent from '~/components/SectionContent'
import PlayersList from '~/components/PlayersList'
import SubTabs from '~/components/SubTabs'
import Chat from '~/components/Chat'

import Sheet from './components/Sheet'

class World extends PureComponent {
   static propTypes = {
      dispatch: PropTypes.func.isRequired,
      openedTabs: PropTypes.arrayOf(
         PropTypes.shape({
            _id: PropTypes.string.isRequired
         })
      ).isRequired,
      messages: PropTypes.arrayOf(PropTypes.shape(messagePropTypes)).isRequired,
      match: PropTypes.shape({
         params: PropTypes.shape({
            worldId: PropTypes.string.isRequired
         }).isRequired
      }).isRequired
   }

   componentDidMount() {
      const { openedTabs, dispatch, match } = this.props
      const { worldId } = match.params
      dispatch(togglePlayMode(true))
      if (!openedTabs.find(world => world._id === worldId)) dispatch(enterRoomAndAddTab(worldId))
   }

   componentWillUnmount() {
      const { dispatch } = this.props
      dispatch(togglePlayMode(false))
   }

   render() {
      const { match, messages } = this.props
      const { worldId } = match.params
      const filteredMessages = messages.filter(msg => msg.room === worldId)

      const adventureMessages = filteredMessages.filter(msg => msg.type === 'adventure')
      const chatMessages = filteredMessages.filter(msg => msg.type === 'talk')
      return (
         <React.Fragment>
            <PlayersList room={worldId} />
            <StyledAppMainWrapper>
               <SubTabs worldId={worldId} />
               <Route path={`${match.path}/sheet/:sheetId`} component={Sheet} />
               <Route
                  path={match.path}
                  exact
                  component={() => (
                     <div className="row no-mrg">
                        <FullHeight className="col xs12 m6">
                           <SectionContent className="no-pad" bordered>
                              <Chat data={adventureMessages} title="Aventura" room={worldId} type="adventure" />
                           </SectionContent>
                        </FullHeight>
                        <FullHeight className="col xs12 m6">
                           <SectionContent className="no-pad" bordered>
                              <Chat data={chatMessages} title="Conversa" room={worldId} type="talk" />
                           </SectionContent>
                        </FullHeight>
                     </div>
                  )}
               />
            </StyledAppMainWrapper>
         </React.Fragment>
      )
   }
}
const mapStateToProps = state => ({ openedTabs: state.app.tabs, messages: state.app.messages })
export default connect(mapStateToProps)(World)

const StyledAppMainWrapper = styled(AppMainWrapper)`
   display: flex;
   flex-direction: column;
`
