import PropTypes from 'prop-types'

const playerPropTypes = {
   _id: PropTypes.string.isRequired,
   online: PropTypes.bool.isRequired,
   user: PropTypes.shape({
      createdAt: PropTypes.string,
      currentSocket: PropTypes.string,
      name: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired
   }).isRequired
}

export default playerPropTypes
