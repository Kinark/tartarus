import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { enterRoomAndAddTab, togglePlayMode } from '~/redux/actions/app'

class World extends PureComponent {
   static propTypes = {
      dispatch: PropTypes.func.isRequired,
      openedTabs: PropTypes.arrayOf(
         PropTypes.shape({
            _id: PropTypes.string.isRequired
         })
      ).isRequired,
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
      const { match } = this.props
      const { worldId } = match.params
      return <div>Você está no mundo {worldId}</div>
   }
}
const mapStateToProps = state => ({ openedTabs: state.app.tabs })
export default connect(mapStateToProps)(World)
