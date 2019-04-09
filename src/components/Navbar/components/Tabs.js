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

const TabsWrapper = connect(state => ({ playMode: state.app.playMode }))(styled.ul`
   position: absolute;
   bottom: ${props => (props.playMode ? '20px' : '0')};
   left: ${props => (props.playMode ? '180px' : '0')};
   margin: 0 15px;
   padding: 0;
   transition: bottom 300ms, left 300ms;
`)

const Tab = styled(NavLink)`
   font-size: 24px;
   border-right: solid 1px ${({ theme }) => theme.DIVIDER_STRONG};
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
`
Tab.defaultProps = { theme: colors.light }
