import React, { PureComponent } from 'react'
import styled from 'styled-components';
import { connect } from 'react-redux'

import LogoSection from './components/LogoSection'
import Account from './components/Account'
import Tabs from './components/Tabs'

export default class Navbar extends PureComponent {
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

const Nav = connect(state => ({ playMode: state.app.playMode }))(styled.nav`
   display: flex;
   justify-content: space-between;
   padding: 15px 20px ${props => props.playMode ? '15px' : '50px'};
   position: relative;
   flex: 0;
   transition: padding 300ms;
`)
