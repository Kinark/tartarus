import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import { connect } from 'react-redux'

import { toggleNewWorldModal } from '~/redux/actions/app'

import CardTitle from '~/components/CardTitle'
import TitleInfo from '~/components/TitleInfo'
import { Input } from '~/components/Input'

const modalStyles = {
   overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      display: 'flex'
   },
   content: {
      position: 'static',
      top: 'auto',
      left: 'auto',
      right: 'auto',
      bottom: 'auto',
      width: '90%',
      maxWidth: '925px',
      margin: 'auto',
      border: '3px solid #745043',
      background: '#fff',
      // overflow: 'auto',
      borderRadius: '20px',
      outline: 'none',
      padding: '38px 160px'
   }
}
// const modalStyles = {
//    overlay: {
//       backgroundColor: 'rgba(0, 0, 0, 0.75)'
//    },
//    content: {
//       top: '50%',
//       left: '50%',
//       right: 'auto',
//       bottom: 'auto',
//       marginRight: '-50%',
//       transform: 'translate(-50%, -50%)',
//       width: '90%',
//       maxWidth: '925px',
//       border: '3px solid #745043',
//       background: '#fff',
//       // overflow: 'auto',
//       borderRadius: '20px',
//       padding: '38px 160px'
//    }
// }

ReactModal.setAppElement('#root')

class NewWorldModal extends PureComponent {
   static propTypes = {
      dispatch: PropTypes.func.isRequired,
      isOpen: PropTypes.bool.isRequired
   }

   handleRequestCloseFunc = () => {
      const { dispatch } = this.props
      dispatch(toggleNewWorldModal(false))
      console.log('trying to close')
   }

   render() {
      const { isOpen } = this.props
      return (
         <ReactModal closeTimeoutMS={150} isOpen={isOpen} style={modalStyles} onRequestClose={this.handleRequestCloseFunc}>
            <div className="center">
               <CardTitle>Novo mundo</CardTitle>
               <TitleInfo>Sejam leais em batalha</TitleInfo>
               <div className="row">
                  <div className="col xs12 m6">
                     <Input />
                  </div>
               </div>
            </div>
         </ReactModal>
      )
   }
}
const mapStateToProps = state => ({ isOpen: state.app.newWorldModalOpen })
export default connect(mapStateToProps)(NewWorldModal)
