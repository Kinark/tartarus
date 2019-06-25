import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import { connect } from 'react-redux'
import styled from 'styled-components'

import axios from '~/instances/axios'
import colors from '~/constants/colors'
import { fetchMyWorlds } from '~/redux/actions/myWorlds'
import { toggleNewWorldModal } from '~/redux/actions/app'

import CardTitle from '~/components/CardTitle'
import TitleInfo from '~/components/TitleInfo'
import { Input, Textarea } from '~/components/Input'
import WorldLink from '~/components/WorldLink'
import { Button } from '~/components/Button'

ReactModal.setAppElement('#root')

class NewWorldModal extends PureComponent {
   static propTypes = {
      dispatch: PropTypes.func.isRequired,
      isOpen: PropTypes.bool.isRequired,
      theme: PropTypes.string.isRequired
   }

   static errorTranslator = err => {
      switch (err) {
         case 'missing-info':
            return 'Informação faltando'
         case 'cannot-connect':
            return 'Não encontramos o portal para Tartarus'
         case 'something-wrong':
            return 'Algo de estranho aconteceu...'
         default:
            return 'Algo de muito estranho aconteceu...'
      }
   }

   state = {
      name: '',
      // cover: '',
      description: '',
      // ruleset: '',
      password: '',
      tags: '',
      loading: false,
      error: false
   }

   handleRequestCloseFunc = () => {
      const { dispatch } = this.props
      this.setState({ name: '', description: '', password: '', tags: '' })
      dispatch(toggleNewWorldModal(false))
   }

   inputHandler = ({ target }) => this.setState({ [target.name]: target.value })

   createWorld = () => {
      const { dispatch } = this.props
      const { name, description, password, tags } = this.state
      axios
         .post('world', { name, description, password, tags })
         .then(() => {
            dispatch(fetchMyWorlds())
            this.setState({ loading: false, error: false })
            return this.handleRequestCloseFunc()
         })
         .catch(err => {
            if (err.response) return this.setState({ loading: false, error: err.response.data.code || 'something-wrong' })
            if (err.request) return this.setState({ loading: false, error: 'cannot-connect' })
            return this.setState({ loading: false, error: 'something-really-wrong' })
         })
   }

   submitHandler = e => {
      e.preventDefault()
      this.createWorld()
   }

   render() {
      const { isOpen, theme } = this.props
      const { name, description, password, tags, loading, error } = this.state
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
      const fakeWorldLinkData = {
         _id: 'preview',
         name,
         description,
         members: ['one', 'two'],
         ruleset: 'SISTEMA PRÓPRIO'
      }
      return (
         <ReactModal closeTimeoutMS={150} isOpen={isOpen} style={modalStyles} onRequestClose={this.handleRequestCloseFunc}>
            <Form loading={loading} className="center" onSubmit={this.submitHandler} autoComplete="off">
               <CardTitle>Novo mundo</CardTitle>
               <TitleInfo>Sejam leais em batalha</TitleInfo>
               {!!error && <div className="center red">{NewWorldModal.errorTranslator(error)}</div>}
               <div className="row no-mrg-bot">
                  <div className="col xs12 m6">
                     <Input onChange={this.inputHandler} value={name} placeholder="Nome do mundo" name="name" required />
                     <Input onChange={this.inputHandler} value={password} placeholder="Senha" name="password" />
                     <Input onChange={this.inputHandler} value={tags} placeholder="Tags (separadas por espaços)" name="tags" />
                  </div>
                  <div className="col xs12 m6">
                     <NewWorldTextarea onChange={this.inputHandler} value={description} placeholder="Descrição" name="description" />
                  </div>
               </div>
               Previsualização
               <DisabledWorldLink data={fakeWorldLinkData} />
               <Button type="submit" inline>
                  Criar mundo
               </Button>
            </Form>
         </ReactModal>
      )
   }
}
const mapStateToProps = state => ({ isOpen: state.app.newWorldModalOpen, theme: state.settings.theme })
export default connect(mapStateToProps)(NewWorldModal)

const Form = styled.form`
   pointer-events: ${({ loading }) => (loading ? 'none' : 'auto')};
`

const NewWorldTextarea = styled(Textarea)`
   height: 140px;
   resize: none;
`

const DisabledWorldLink = styled(WorldLink)`
   pointer-events: none;
   text-align: left;
   margin: auto;
`
