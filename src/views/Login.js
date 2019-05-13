import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'

import { logUserIn } from '~/redux/actions/auth'

import colors from '~/constants/colors'

import { LogoOutline } from '~/components/Logo'
import CardTitle from '~/components/CardTitle'
import TitleInfo from '~/components/TitleInfo'
import Input from '~/components/Input'
import Button from '~/components/Button'

class Login extends PureComponent {
   static propTypes = {
      dispatch: PropTypes.func.isRequired,
      loggedIn: PropTypes.bool.isRequired,
      loading: PropTypes.bool.isRequired,
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
      const { loggedIn, loading } = this.props
      const { email, pass } = this.state
      if (loggedIn) return <Redirect to="/" />
      return (
         <LoginWrapper>
            <OutlinedCardForm onSubmit={this.submitHandler}>
               <LogoNormalStyled height="90" />
               <CardTitle>Login</CardTitle>
               <TitleInfo>Onde nada é belo ou feio</TitleInfo>
               <Input className="center" onChange={this.inputHandler} value={email} placeholder="Email" name="email" />
               <Input className="center" onChange={this.inputHandler} value={pass} placeholder="Password" name="password" />
               <Button type="submit" loading={loading}>
                  ENTRAR
               </Button>
               <div className="row">
                  <div className="col xs5 left-align">Criar uma conta</div>
                  <div className="col xs7 right-align">Esqueci minha senha</div>
               </div>
            </OutlinedCardForm>
         </LoginWrapper>
      )
   }
}

const mapStateToProps = state => ({ loggedIn: state.auth.loggedIn, loading: state.auth.loading })
export default connect(mapStateToProps)(Login)

const LogoNormalStyled = styled(LogoOutline)`
   margin: 25px auto;
`

const LoginWrapper = styled.div`
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
