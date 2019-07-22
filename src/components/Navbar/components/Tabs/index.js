import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { BasicTab, Tab } from './components/TabTypes'

class Tabs extends PureComponent {
   static propTypes = {
      openedTabs: PropTypes.arrayOf(
         PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
         })
      ).isRequired
   }

   render() {
      const { openedTabs } = this.props
      return (
         <TabsWrapper>
            <BasicTab to="/" exact>
               Boas vindas
            </BasicTab>
            <BasicTab to="/worlds">Mundos</BasicTab>
            <BasicTab to="/ruleset">Sistemas</BasicTab>
            {openedTabs.map(world => (
               <Tab key={world._id} worldId={world._id} to={`/world/${world._id}`}>
                  {world.name}
               </Tab>
            ))}
         </TabsWrapper>
      )
   }
}
const mapStateToProps = state => ({ openedTabs: state.app.tabs })
export default connect(mapStateToProps)(Tabs)

const TabsWrapper = connect(state => ({ playMode: state.app.playMode }))(styled.ul`
   position: absolute;
   bottom: ${props => (props.playMode ? '20px' : '0')};
   left: ${props => (props.playMode ? '180px' : '0')};
   margin: 0 15px;
   padding: 0;
   transition: bottom 300ms, left 300ms;
   list-style-type: none;
`)
