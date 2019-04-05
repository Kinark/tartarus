import React, { Component } from 'react'
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'

import colors from '~/constants/colors'

import { LogoOutline } from '~/components/Logo'
import CardTitle from '~/components/CardTitle'
import TitleInfo from '~/components/TitleInfo'
import Input from '~/components/Input'
import Button from '~/components/Button'

export default class Login extends Component {
   state = {
      redirect: false
   }

   componentDidMount = () => {}

   componentWillUnmount = () => {}

   render() {
      const { redirect } = this.state
      if (redirect) return <Redirect to="/" />
      return (
         <LoginWrapper>
            <OutlinedCard>
               <LogoNormalStyled height="90" />
               <CardTitle>Login</CardTitle>
               <TitleInfo>Onde nada é belo ou feio</TitleInfo>
               <Input className="center" placeholder="Email" />
               <Input className="center" placeholder="Password" />
               <Button>ENTRAR</Button>
               <div className="row">
                  <div className="col xs5 left-align">Criar uma conta</div>
                  <div className="col xs7 right-align">Esqueci minha senha</div>
               </div>
            </OutlinedCard>
         </LoginWrapper>
      )
   }
}

const LogoNormalStyled = styled(LogoOutline)`
   margin: 25px auto;
`

const LoginWrapper = styled.div`
   width: 95%;
   max-width: 410px;
   margin: 85px auto;
`

const OutlinedCard = styled.div`
   border-radius: 6px;
   border: 1px solid ${colors.light.TITLE_INFO};
   text-align: center;
   padding: 30px 60px;
`
