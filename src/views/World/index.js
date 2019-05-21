import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class World extends PureComponent {
   static propTypes = {
      match: PropTypes.shape({
         params: PropTypes.shape({
            worldId: PropTypes.string.isRequired
         }).isRequired
      }).isRequired
   }

   render() {
      const { match } = this.props
      const { worldId } = match.params
      return <div>Você está no mundo {worldId}</div>
   }
}
