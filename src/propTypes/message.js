import PropTypes from 'prop-types'

export const messagePropTypes = {
   _id: PropTypes.string,
   room: PropTypes.string.isRequired,
   type: PropTypes.string,
   subroom: PropTypes.string,
   author: PropTypes.shape({
      _id: PropTypes.string,
      username: PropTypes.string,
      avatar: PropTypes.string
   }),
   content: PropTypes.string.isRequired,
   timestamp: PropTypes.string,
   nonce: PropTypes.string.isRequired,
   dices: PropTypes.arrayOf(PropTypes.string).isRequired,
   dicesResults: PropTypes.arrayOf(PropTypes.string).isRequired
}

export const messageDefaultProps = {
   type: null,
   subroom: null
}
