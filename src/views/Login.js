import React, { Component } from 'react'

import { BG_LIGHT } from '~/constants/colors'

export default class Login extends Component {
   componentDidMount = () => {
      document.body.style.backgroundColor = BG_LIGHT
   }

   componentWillUnmount = () => {
      document.body.style.backgroundColor = null
   }

   render() {
      return <div>Login</div>
   }
}

