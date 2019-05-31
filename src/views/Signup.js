import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Redirect, Link } from 'react-router-dom'

import axios from '~/instances/axios'

import colors from '~/constants/colors'

import { LogoOutline } from '~/components/Logo'
import CardTitle from '~/components/CardTitle'
import TitleInfo from '~/components/TitleInfo'
import Input from '~/components/Input'
import { Button, ButtonLink } from '~/components/Button'

class Signup extends PureComponent {
   static propTypes = {
      loggedIn: PropTypes.bool.isRequired
   }

   static errorTranslator = err => {
      switch (err) {
         case 'missing-info':
            return 'Informação faltando'
         case 'already-exists':
            return 'E-mail já cadastrado.'
         case 'cannot-connect':
            return 'Não encontramos o portal para Tartarus'
         case 'something-wrong':
            return 'Algo de estranho aconteceu...'
         default:
            return 'Algo de muito estranho aconteceu...'
      }
   }

   state = {
      email: '',
      password: '',
      name: '',
      loading: false,
      done: false,
      error: false
   }

   signup = () => {
      const { name, email, password } = this.state
      this.setState({ loading: true })
      axios
         .post('signup', { name, email, password })
         .then(() => this.setState({ done: true, loading: false, error: false }))
         .catch(err => {
            if (err.response) return this.setState({ loading: false, error: err.response.data.code || 'something-wrong' })
            if (err.request) return this.setState({ loading: false, error: 'cannot-connect' })
            return this.setState({ loading: false, error: 'something-really-wrong' })
         })
   }

   inputHandler = ({ target }) => this.setState({ [target.name]: target.value })

   submitHandler = e => {
      e.preventDefault()
      this.signup()
   }

   render() {
      const { loggedIn } = this.props
      const { email, pass, name, loading, error, done } = this.state
      if (loggedIn) return <Redirect to="/" />
      return (
         <SignupWrapper>
            <OutlinedCardForm onSubmit={this.submitHandler}>
               <LogoNormalStyled height="90" />
               {done ? (
                  <Success />
               ) : (
                  <React.Fragment>
                     <CardTitle>Registre-se</CardTitle>
                     <TitleInfo>Dê o seu nome para o guardião</TitleInfo>
                     {!!error && <div className="center red">{Signup.errorTranslator(error)}</div>}
                     <Input className="center" onChange={this.inputHandler} value={name} placeholder="Usuário" name="name" required />
                     <Input className="center" onChange={this.inputHandler} value={email} placeholder="Email" name="email" required />
                     <Input className="center" onChange={this.inputHandler} value={pass} placeholder="Password" name="password" required />
                     <Button type="submit" loading={loading}>
                        REGISTRAR
                     </Button>
                     <div className="row">
                        <Link to="/login" className="col xs5 left-align">
                           Logar ao invés
                        </Link>
                        <div className="col xs7 right-align">Esqueci minha senha</div>
                     </div>
                  </React.Fragment>
               )}
            </OutlinedCardForm>
         </SignupWrapper>
      )
   }
}

const mapStateToProps = state => ({ loggedIn: state.auth.loggedIn })
export default connect(mapStateToProps)(Signup)

class Success extends PureComponent {
   render() {
      return (
         <React.Fragment>
            <CardTitle>Você se cadastrou.</CardTitle>
            <TitleInfo>O guardião aceitou seu nome</TitleInfo>
            <ButtonLink to="/login">
               ATRAVESSE OS PORTÕES
            </ButtonLink>
         </React.Fragment>
      )
   }
}

const LogoNormalStyled = styled(LogoOutline)`
   margin: 25px auto;
`

const SignupWrapper = styled.div`
   width: 95%;
   max-width: 410px;
   margin: 85px auto;
`

const OutlinedCardForm = styled.form`
   border-radius: 6px;
   border: 1px solid ${colors.light.TITLE_INFO};
   text-align: center;
   padding: 30px 60px;
`
