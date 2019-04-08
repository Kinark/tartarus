import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import colors from '~/constants/colors'

export default class Tabs extends PureComponent {
   render() {
      return (
         <TabsWrapper>
            <Tab to="/" exact>
               Welcome
            </Tab>
            <Tab to="/worlds">Worlds</Tab>
         </TabsWrapper>
      )
   }
}

const TabsWrapper = styled.ul`
   position: absolute;
   bottom: 0;
   left: 0;
   margin: 0 15px;
   padding: 0;
`

const NavLinkWarningFix = ({ dispatch, ...rest }) => <NavLink {...rest} />

const Tab = connect(state => ({ theme: state.settings.theme }))(styled(NavLinkWarningFix)`
   font-size: 24px;
   border-right: solid 1px ${({ theme }) => colors[theme].DIVIDER_STRONG};
   padding: 0 13px;
   opacity: 1;
   transition: opacity 300ms;
   :hover {
      opacity: 0.75;
   }
   &.active {
      font-family: 'upgrade', sans-serif;
      font-weight: 500;
      padding: 0 12px;
   }
   :last-child {
      border-right: none;
   }
`)
