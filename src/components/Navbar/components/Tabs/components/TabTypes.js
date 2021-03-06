import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { NavLink, Link } from 'react-router-dom'

import colors from '~/constants/colors'

import { leaveRoomAndRemoveTab } from '~/redux/actions/app'

class DisconnectedTab extends PureComponent {
   static propTypes = {
      dispatch: PropTypes.func.isRequired,
      to: PropTypes.string.isRequired,
      children: PropTypes.string.isRequired
   }

   closeTab = () => {
      const { dispatch, worldId } = this.props
      dispatch(leaveRoomAndRemoveTab(worldId))
   }

   render() {
      const { worldId, children, dispatch, openedTabs, to, ...rest } = this.props
      const currentTabIndex = openedTabs.findIndex(tab => tab._id === to.replace('/world/', ''))
      const previousTab = openedTabs[currentTabIndex - 1]
      const previousTabLink = previousTab ? `/world/${previousTab._id}` : '/worlds'
      return (
         <TabWrapper>
            <TabClose to={previousTabLink} onClick={this.closeTab}>
               X
            </TabClose>
            <TabBase {...rest} to={to}>
               {children}
            </TabBase>
         </TabWrapper>
      )
   }
}
const mapStateToProps = state => ({ openedTabs: state.app.tabs })
export const Tab = connect(mapStateToProps)(DisconnectedTab)

export class BasicTab extends PureComponent {
   static propTypes = {
      to: PropTypes.string.isRequired,
      children: PropTypes.string.isRequired
   }

   render() {
      const { children, ...rest } = this.props
      return (
         <TabWrapper>
            <TabBase {...rest}>{children}</TabBase>
         </TabWrapper>
      )
   }
}

const TabWrapper = styled.li`
   position: relative;
   font-size: 24px;
   border-right: solid 1px ${({ theme }) => theme.DIVIDER_STRONG};
   opacity: 1;
   transition: opacity 300ms;
   display: inline-block;
   :hover {
      opacity: 0.75;
   }
   :last-child {
      border-right: none;
   }
`

const TabBase = styled(NavLink)`
   padding: 0 13px;
   &.active {
      font-family: 'upgrade', sans-serif;
      font-weight: 500;
      padding: 0 12px;
   }
`
Tab.defaultProps = { theme: colors.light }

const TabClose = styled(Link)`
   font-family: 'upgrade', sans-serif;
   font-weight: 500;
   background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, ${({ theme }) => theme.BG} 50%, ${({ theme }) => theme.BG} 100%);
   position: absolute;
   z-index: 1;
   right: 0;
   top: 0;
   bottom: 0;
   margin: auto;
   height: 100%;
   padding: 0 12px 0 24px;
   text-align: center;
   font-size: 18px;
   opacity: 0;
   display: flex;
   align-items: center;
   transition: opacity 300ms;
   cursor: pointer;
   :hover {
      opacity: 1;
   }
`
TabClose.defaultProps = { theme: colors.light }
