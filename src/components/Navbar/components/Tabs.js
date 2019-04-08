import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import colors from '~/constants/colors'

class Tabs extends PureComponent {
   static propTypes = {
      darkMode: PropTypes.bool.isRequired
   }

   render() {
      const { darkMode } = this.props
      return (
         <TabsWrapper>
            <Tab darkmode={darkMode ? 1 : 0} to="/" exact>
               Welcome
            </Tab>
            <Tab darkmode={darkMode ? 1 : 0} to="/worlds">
               Worlds
            </Tab>
         </TabsWrapper>
      )
   }
}

const mapStateToProps = state => ({ darkMode: state.settings.darkMode })
export default connect(mapStateToProps)(Tabs)

const TabsWrapper = styled.div`
   position: absolute;
   bottom: 0;
   left: 0;
   margin: 0 15px;
`

const Tab = styled(NavLink)`
   font-size: 24px;
   border-right: solid 1px ${({ darkmode }) => (darkmode ? colors.dark.DIVIDER_STRONG : colors.light.DIVIDER_STRONG)};
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
