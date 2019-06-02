import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Redirect, Link } from 'react-router-dom'

import { logUserIn } from '~/redux/actions/auth'

import OutlinedCard from '~/components/OutlinedCard'
import { LogoOutline } from '~/components/Logo'
import CardTitle from '~/components/CardTitle'
import TitleInfo from '~/components/TitleInfo'
import Input from '~/components/Input'
import { Button } from '~/components/Button'

class Login extends PureComponent {
   static propTypes = {
      dispatch: PropTypes.func.isRequired,
      loggedIn: PropTypes.bool.isRequired,
      loading: PropTypes.bool.isRequired,
      error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired
   }

   static errorTranslator = err => {
      switch (err) {
         case 'missing-info':
            return 'Informação faltando'
         case 'wrong-info':
            return 'E-mail ou senha incorretos.'
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
      password: ''
   }

   login = () => {
      const { dispatch } = this.props
      const { email, password } = this.state
      dispatch(logUserIn(email, password))
   }

   inputHandler = ({ target }) => this.setState({ [target.name]: target.value })

   submitHandler = e => {
      e.preventDefault()
      this.login()
   }

   render() {
      const { loggedIn, loading, error } = this.props
      const { email, pass } = this.state
      if (loggedIn) return <Redirect to="/" />
      return (
         <LoginWrapper>
            <OutlinedCard>
               <form onSubmit={this.submitHandler}>
                  <LogoNormalStyled height="90" />
                  <CardTitle>Login</CardTitle>
                  <TitleInfo>Mostre-se digno de Tartarus</TitleInfo>
                  {!!error && <div className="center red">{Login.errorTranslator(error)}</div>}
                  <Input className="center" onChange={this.inputHandler} value={email} placeholder="Email" name="email" required />
                  <Input className="center" onChange={this.inputHandler} value={pass} placeholder="Password" name="password" required />
                  <Button type="submit" loading={loading}>
                     ENTRAR
                  </Button>
                  <div className="row">
                     <Link to="/signup" className="col xs5 left-align">
                        Criar uma conta
                     </Link>
                     <div className="col xs7 right-align">Esqueci minha senha</div>
                  </div>
               </form>
            </OutlinedCard>
         </LoginWrapper>
      )
   }
}

const mapStateToProps = state => ({ loggedIn: state.auth.loggedIn, loading: state.auth.loading, error: state.auth.error })
export default connect(mapStateToProps)(Login)

const LogoNormalStyled = styled(LogoOutline)`
   margin: 25px auto;
`

const LoginWrapper = styled.div`
   width: 95%;
   max-width: 410px;
   margin: 85px auto;
`
