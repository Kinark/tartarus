import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ContextMenu, SubMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu'
import { Redirect } from 'react-router-dom'

import playerPropTypes from '~/propTypes/player'
import { fetchMyRulesets } from '~/redux/actions/myRulesets'
import giveSheet from '~/services/giveSheet'

import Sidebar from '~/components/Sidebar'

import Player from './components/Player'

const collect = props => props

class PlayersList extends PureComponent {
   static getDerivedStateFromProps({ match }) {
      if (match.path === '/world/:worldId') return null
      return { redirectPath: null }
   }

   static propTypes = {
      dispatch: PropTypes.func.isRequired,
      rulesetsLoading: PropTypes.bool.isRequired,
      tabs: PropTypes.arrayOf(
         PropTypes.shape({
            members: PropTypes.arrayOf(PropTypes.shape(playerPropTypes)).isRequired
         })
      ).isRequired,
      myId: PropTypes.string.isRequired,
      room: PropTypes.string.isRequired,
      myRulesets: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired
   }

   state = {
      giveSheetLoading: null,
      redirectPath: null
   }

   componentDidMount() {
      const { dispatch, rulesetsLoading } = this.props
      if (!rulesetsLoading) dispatch(fetchMyRulesets())
   }

   componentWillUnmount() {
      clearTimeout(this.newSheetTimeout)
   }

   openSheet = async (e, { sheetId }) => {
      const { room } = this.props
      this.setState({ redirectPath: `/world/${room}/sheet/${sheetId}` })
   }

   giveSheet = async (e, { playerId, rulesetId, type }) => {
      const { room } = this.props
      const { giveSheetLoading } = this.state
      if (giveSheetLoading) return

      try {
         this.setState({ giveSheetLoading: 'Carregando...' })
         const newSheet = await giveSheet({ worldId: room, playerId, rulesetId, type })
         console.log(newSheet)
         this.setState({ giveSheetLoading: 'Ficha atribuída' })
         this.newSheetTimeout = setTimeout(() => {
            this.setState({ giveSheetLoading: null })
         }, 1000)
      } catch (err) {
         console.log(err.response)
      }
   }

   render() {
      const { redirectPath } = this.state
      const { tabs, myId, room, myRulesets } = this.props
      const roomObj = tabs.find(tab => tab._id === room)
      const isOwner = roomObj ? roomObj.owner === myId : false
      if (redirectPath) return <Redirect to={redirectPath} />
      return (
         <Sidebar align="left" title="Lista de jogadores" titleInfo="Fale com seus companheiros">
            {tabs.length ? (
               <React.Fragment>
                  <div>Online:</div>
                  {roomObj.members
                     .filter(member => member.online)
                     .map(player => (
                        <ContextMenuTrigger key={player._id} id={`${player._id}-menu`} playerId={player.user._id} collect={collect}>
                           <Player data={player} />
                        </ContextMenuTrigger>
                     ))}

                  <div>Offline:</div>
                  {roomObj.members
                     .filter(member => !member.online)
                     .map(player => (
                        <Player key={player._id} data={player} />
                     ))}

                  {roomObj.members
                     .filter(member => member.online)
                     .map(player => (
                        <ContextMenu key={player._id} id={`${player._id}-menu`}>
                           {isOwner ? (
                              <React.Fragment>
                                 <SubMenu hoverDelay={100} title="Dar ficha ao jogador">
                                    <MenuItem onClick={this.giveSheet} data={{ type: 'simpleSheet' }}>
                                       Ficha simples
                                    </MenuItem>
                                    {myRulesets.map(ruleset => (
                                       <MenuItem key={ruleset._id} onClick={this.giveSheet} data={{ rulesetId: ruleset._id, type: 'rulesetSheet' }}>
                                          {ruleset.name}
                                       </MenuItem>
                                    ))}
                                 </SubMenu>
                              </React.Fragment>
                           ) : (
                              <React.Fragment>
                                 <MenuItem data={{ action: 'Removed' }}>Opção para quem não é dono</MenuItem>
                              </React.Fragment>
                           )}
                           {!!player.characters.length && (
                              <SubMenu hoverDelay={100} title="Ver ficha">
                                 {player.characters.map(sheet => (
                                    <MenuItem key={sheet._id} onClick={this.openSheet} data={{ sheetId: sheet._id }}>
                                       {sheet.name}
                                    </MenuItem>
                                 ))}
                              </SubMenu>
                           )}
                        </ContextMenu>
                     ))}
               </React.Fragment>
            ) : (
               'Loading...'
            )}
         </Sidebar>
      )
   }
}
const mapStateToProps = state => ({ tabs: state.app.tabs, myId: state.auth.userId, rulesetsLoading: state.myRulesets.done, myRulesets: state.myRulesets.content })
export default connect(mapStateToProps)(PlayersList)
