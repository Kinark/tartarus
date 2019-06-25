import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'

import axios from '~/instances/axios'
import colors from '~/constants/colors'
import { toggleLoadingRoomModal } from '~/redux/actions/app'

import CardTitle from '~/components/CardTitle'
import TitleInfo from '~/components/TitleInfo'
import { Input } from '~/components/Input'
import { Button } from '~/components/Button'

ReactModal.setAppElement('#root')

class LoadingRoomModal extends PureComponent {
   static propTypes = {
      dispatch: PropTypes.func.isRequired,
      worldId: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
      openedWorlds: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
      theme: PropTypes.string.isRequired
   }

   static errorTranslator = err => {
      switch (err) {
         case 'missing-info':
            return 'Informação faltando'
         case 'world-not-found':
            return 'O mundo não foi encontrado'
         case 'missing-password':
            return 'Senha faltando'
         case 'wrong-password':
            return 'Senha incorreta'
         case 'cannot-connect':
            return 'Não encontramos o portal para Tartarus'
         case 'something-wrong':
            return 'Algo de estranho aconteceu...'
         default:
            return 'Algo de muito estranho aconteceu...'
      }
   }

   state = {
      password: '',
      loading: true,
      locked: false,
      redirect: false,
      error: false
   }

   handleRequestCloseFunc = () => {
      const { dispatch } = this.props
      this.setState({ password: '', loading: true, locked: false, redirect: false, error: false })
      dispatch(toggleLoadingRoomModal(false))
   }

   inputHandler = ({ target }) => this.setState({ [target.name]: target.value })

   getWorld = () => {
      const { worldId, openedWorlds } = this.props
      if (openedWorlds.some(el => el._id === worldId)) return this.setState({ redirect: true }, () => this.handleRequestCloseFunc())
      axios
         .get(`world/${worldId}`)
         .then(({ data }) => {
            if (data.locked) return this.setState({ locked: true, loading: false })
            return this.joinWorld()
         })
         .catch(() => this.handleRequestCloseFunc())
   }

   joinWorld = () => {
      const { worldId } = this.props
      const { password } = this.state
      axios
         .patch('join-world', { _id: worldId, password })
         .then(() => this.setState({ redirect: true }, () => this.handleRequestCloseFunc()))
         .catch(err => {
            if (err.response) return this.setState({ loading: false, error: err.response.data.code || 'something-wrong' })
            if (err.request) return this.setState({ loading: false, error: 'cannot-connect' })
            return this.setState({ loading: false, error: 'something-really-wrong' })
         })
   }

   submitHandler = e => {
      e.preventDefault()
      this.joinWorld()
   }

   render() {
      const { worldId, theme } = this.props
      const { password, loading, locked, redirect, error } = this.state
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
            background: colors[theme].BG,
            color: colors[theme].TITLE,
            borderRadius: '20px',
            padding: '38px 160px'
         }
      }

      return (
         <ReactModal closeTimeoutMS={150} onAfterOpen={this.getWorld} isOpen={!!worldId} style={modalStyles} onRequestClose={this.handleRequestCloseFunc}>
            {loading && (
               <div className="center">
                  <CardTitle>Esperando o mundo se formar...</CardTitle>
                  <TitleInfo>Pois de cá a lá, ainda há o abismo.</TitleInfo>
               </div>
            )}

            {redirect && !!worldId && <Redirect to={`/world/${worldId}`} />}

            {locked && (
               <Form loading={loading} className="center" onSubmit={this.submitHandler} autoComplete="off">
                  <CardTitle>Este mundo está selado</CardTitle>
                  <TitleInfo>Digite a senha para adentrá-lo</TitleInfo>
                  {!!error && <div className="center red">{LoadingRoomModal.errorTranslator(error)}</div>}
                  <div className="row no-mrg-bot">
                     <div className="col xs12">
                        <Input onChange={this.inputHandler} value={password} placeholder="Senha do mundo" name="password" required />
                     </div>
                  </div>
                  <Button type="submit" inline>
                     Criar mundo
                  </Button>
               </Form>
            )}
         </ReactModal>
      )
   }
}
const mapStateToProps = state => ({ worldId: state.app.loadingRoomModal, theme: state.settings.theme, openedWorlds: state.app.tabs })
export default connect(mapStateToProps)(LoadingRoomModal)

const Form = styled.form`
   pointer-events: ${({ loading }) => (loading ? 'none' : 'auto')};
`
