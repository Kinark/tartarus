import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import colors from '~/constants/colors'

class Tabs extends PureComponent {
   static propTypes = {
      theme: PropTypes.string.isRequired
   }

   render() {
      const { theme } = this.props
      return (
         <TabsWrapper>
            <Tab theme={theme} to="/" exact>
               Welcome
            </Tab>
            <Tab theme={theme} to="/worlds">
               Worlds
            </Tab>
         </TabsWrapper>
      )
   }
}

const mapStateToProps = state => ({ theme: state.settings.theme })
export default connect(mapStateToProps)(Tabs)

const TabsWrapper = styled.div`
   position: absolute;
   bottom: 0;
   left: 0;
   margin: 0 15px;
`

const Tab = styled(NavLink)`
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
`
