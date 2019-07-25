import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { MenuItem, ContextMenuTrigger } from 'react-contextmenu'
// import styled from 'styled-components'

import playerPropTypes from '~/propTypes/player'

import CustomContext from '~/components/CustomContext'
import Sidebar from '~/components/Sidebar'

import Player from './components/Player'

const collect = props => props

class PlayersList extends PureComponent {
   static propTypes = {
      tabs: PropTypes.arrayOf(
         PropTypes.shape({
            members: PropTypes.arrayOf(PropTypes.shape(playerPropTypes)).isRequired
         })
      ).isRequired,
      myId: PropTypes.string.isRequired,
      room: PropTypes.string.isRequired
   }

   giveSheet = (e, data) => {
      console.log(data)
   }

   render() {
      const { tabs, myId, room } = this.props
      const roomObj = tabs.find(tab => tab._id === room)
      const isOwner = roomObj ? roomObj.owner === myId : false
      return (
         <Sidebar align="left" title="Lista de jogadores" titleInfo="Fale com seus companheiros">
            {tabs.length ? (
               <React.Fragment>
                  <div>Online:</div>
                  {roomObj.members
                     .filter(member => member.online)
                     .map(player => (
                        <ContextMenuTrigger key={player._id} id="playerMenu" playerId={player._id} collect={collect}>
                           <Player data={player} />
                        </ContextMenuTrigger>
                     ))}
                  <div>Offline:</div>
                  {roomObj.members
                     .filter(member => !member.online)
                     .map(player => (
                        <Player key={player._id} data={player} />
                     ))}
                  <CustomContext id="playerMenu">
                     {isOwner ? (
                        <React.Fragment>
                           <MenuItem onClick={this.giveSheet} data={{ action: 'Added' }}>
                              Dar ficha para jogador
                           </MenuItem>
                        </React.Fragment>
                     ) : (
                        <React.Fragment>
                           <MenuItem data={{ action: 'Removed' }}>Opção para quem não é dono</MenuItem>
                        </React.Fragment>
                     )}
                     <MenuItem data={{ action: 'Removed' }}>Ver ficha</MenuItem>
                  </CustomContext>
               </React.Fragment>
            ) : (
               'Loading...'
            )}
         </Sidebar>
      )
   }
}
const mapStateToProps = state => ({ tabs: state.app.tabs, myId: state.auth.userId })
export default connect(mapStateToProps)(PlayersList)
