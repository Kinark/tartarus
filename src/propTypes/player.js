import PropTypes from 'prop-types'

const playerPropTypes = {
   _id: PropTypes.string.isRequired,
   online: PropTypes.bool.isRequired,
   user: {
      createdAt: PropTypes.string.isRequired,
      currentSocket: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired
   }
}

export default playerPropTypes
