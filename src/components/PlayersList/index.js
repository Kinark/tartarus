import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import styled from 'styled-components'

import playerPropTypes from '~/propTypes/player'

import Sidebar from '~/components/Sidebar'

import Player from './components/Player'

class PlayersList extends PureComponent {
   static propTypes = {
      tabs: PropTypes.arrayOf(
         PropTypes.shape({
            members: PropTypes.arrayOf(PropTypes.shape(playerPropTypes)).isRequired
         })
      ).isRequired,
      room: PropTypes.string.isRequired
   }

   render() {
      const { tabs, room } = this.props
      return (
         <Sidebar align="left" title="Lista de jogadores" titleInfo="Fale com seus companheiros">
            {tabs.find(tab => tab._id === room) ? (
               <React.Fragment>
                  <div>Online:</div>
                  {tabs.find(tab => tab._id === room).members.map(player => (player.online ? <Player key={player._id} data={player} /> : ''))}
                  <div>Offline:</div>
                  {tabs.find(tab => tab._id === room).members.map(player => (!player.online ? <Player key={player._id} data={player} /> : ''))}
               </React.Fragment>
            ) : (
               'Loading...'
            )}
         </Sidebar>
      )
   }
}
const mapStateToProps = state => ({ tabs: state.app.tabs })
export default connect(mapStateToProps)(PlayersList)
