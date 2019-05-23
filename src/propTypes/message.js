import PropTypes from 'prop-types'

export const messagePropTypes = {
   _id: PropTypes.string.isRequired,
   roomId: PropTypes.string.isRequired,
   type: PropTypes.string,
   subroom: PropTypes.string,
   author: PropTypes.string.isRequired,
   content: PropTypes.string.isRequired,
   sentAt: PropTypes.string.isRequired
}

export const messageDefaultProps = {
   type: null,
   subroom: null,
}
