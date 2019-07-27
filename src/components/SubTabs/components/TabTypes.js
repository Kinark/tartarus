import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { NavLink, Link } from 'react-router-dom'

import colors from '~/constants/colors'

import { removeWorldSubTab } from '~/redux/actions/app'

class DisconnectedTab extends PureComponent {
   static propTypes = {
      dispatch: PropTypes.func.isRequired,
      to: PropTypes.string.isRequired,
      children: PropTypes.string.isRequired
   }

   closeTab = () => {
      const { dispatch, id } = this.props
      dispatch(removeWorldSubTab(id))
   }

   render() {
      const { worldId, children, dispatch, id, subTabPath, openedSubTabs, to, ...rest } = this.props
      const currentSubTabIndex = openedSubTabs.findIndex(subTab => subTab._id === id)
      const previousSubTab = openedSubTabs[currentSubTabIndex - 1]
      const previousTabLink = previousSubTab ? `/world/${worldId}/${previousSubTab.path}` : `/world/${worldId}`
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
const mapStateToProps = state => ({ openedSubTabs: state.app.subTabs })
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
TabWrapper.defaultProps = { theme: colors.light }

const TabBase = styled(NavLink)`
   padding: 0 13px;
   &.active {
      font-family: 'upgrade', sans-serif;
      font-weight: 500;
      padding: 0 12px;
   }
`

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
