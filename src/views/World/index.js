import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { enterRoomAndAddTab } from '~/redux/actions/app'

class World extends PureComponent {
   static propTypes = {
      dispatch: PropTypes.func.isRequired,
      openedTabs: PropTypes.arrayOf(PropTypes.string).isRequired,
      match: PropTypes.shape({
         params: PropTypes.shape({
            worldId: PropTypes.string.isRequired
         }).isRequired
      }).isRequired
   }

   componentDidMount = () => {
      const { openedTabs, dispatch, match } = this.props
      const { worldId } = match.params
      if (!openedTabs.find(world => world !== worldId)) dispatch(enterRoomAndAddTab(worldId))
   }

   render() {
      const { match } = this.props
      const { worldId } = match.params
      return <div>Você está no mundo {worldId}</div>
   }
}
const mapStateToProps = state => ({ openedTabs: state.app.tabs })
export default connect(mapStateToProps)(World)
