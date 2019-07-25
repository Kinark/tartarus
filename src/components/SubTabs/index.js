import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import colors from '~/constants/colors'

import { BasicTab, Tab } from './components/TabTypes'

class Tabs extends PureComponent {
   static propTypes = {
      worldId: PropTypes.string.isRequired,
      openedSubTabs: PropTypes.arrayOf(
         PropTypes.shape({
            nonce: PropTypes.number.isRequired,
            worldId: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired
         })
      ).isRequired
   }

   render() {
      const { openedSubTabs, worldId } = this.props
      return (
         <TabsWrapper>
            <BasicTab to={`/world/${worldId}`} exact>
               Chats
            </BasicTab>
            {openedSubTabs.filter(subTab => subTab.worldId === worldId).map(subTab => (
               <Tab key={subTab.nonce} worldId={worldId} to={`/world/${worldId}/${subTab.path}`}>
                  {subTab.name}
               </Tab>
            ))}
         </TabsWrapper>
      )
   }
}
const mapStateToProps = state => ({ openedSubTabs: state.app.subTabs })
export default connect(mapStateToProps)(Tabs)

const TabsWrapper = connect(state => ({ playMode: state.app.playMode }))(styled.ul`
   /* position: absolute; */
   /* bottom: ${props => (props.playMode ? '20px' : '0')}; */
   /* left: ${props => (props.playMode ? '180px' : '0')}; */
   margin: 0;
   padding: 0;
   transition: bottom 300ms, left 300ms;
   list-style-type: none;
   border-bottom: solid 1px ${({ theme }) => theme.DIVIER_SOFT};
`)
TabsWrapper.defaultProps = { theme: colors.light }
