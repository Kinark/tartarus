import React, { PureComponent } from 'react'
import styled from 'styled-components';

import LogoSection from './components/LogoSection'
import Account from './components/Account'
import Tabs from './components/Tabs'

export default class index extends PureComponent {
  render() {
    return (
      <Nav>
        <LogoSection />
        <Account />
        <Tabs />
      </Nav>
    )
  }
}

const Nav = styled.nav`
   display: flex;
   justify-content: space-between;
   padding: 15px 20px 50px;
   position: relative;
`
