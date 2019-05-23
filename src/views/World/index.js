import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { enterRoomAndAddTab, togglePlayMode } from '~/redux/actions/app'

import Chat from '~/components/Chat'

class World extends PureComponent {
   static propTypes = {
      dispatch: PropTypes.func.isRequired,
      openedTabs: PropTypes.arrayOf(
         PropTypes.shape({
            _id: PropTypes.string.isRequired
         })
      ).isRequired,
      messages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
      match: PropTypes.shape({
         params: PropTypes.shape({
            worldId: PropTypes.string.isRequired
         }).isRequired
      }).isRequired
   }

   componentDidMount = () => {
      const { openedTabs, dispatch, match } = this.props
      const { worldId } = match.params
      dispatch(togglePlayMode(true))
      if (!openedTabs.find(world => world._id === worldId)) dispatch(enterRoomAndAddTab(worldId))
   }

   componentWillUnmount = () => {
      const { dispatch } = this.props
      dispatch(togglePlayMode(false))
   }

   render() {
      const { match, messages } = this.props
      const { worldId } = match.params
      const filteredMessages = messages.filter(msg => msg.room === worldId)
      return (
         <FullHeight className="row">
            <FullHeight className="col xs12 m6">
               <Chat data={filteredMessages} title="Aventura" room={worldId} type="adventure" />
            </FullHeight>
         </FullHeight>
      )
   }
}
const mapStateToProps = state => ({ openedTabs: state.app.tabs, messages: state.app.messages })
export default connect(mapStateToProps)(World)

const FullHeight = styled.div`
   height: 100%;
`
