import PropTypes from 'prop-types'

const playerPropTypes = {
   _id: PropTypes.string.isRequired,
   name: PropTypes.string.isRequired,
   currentSocket: PropTypes.string.isRequired,
   room: PropTypes.string.isRequired
}

export default playerPropTypes
