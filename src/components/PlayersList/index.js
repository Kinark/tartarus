import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
// import styled from 'styled-components'

import playerPropTypes from '~/propTypes/player'

import Sidebar from '~/components/Sidebar'

import Friend from './components/Friend'

export default class PlayersList extends PureComponent {
   static propTypes = {
      data: PropTypes.arrayOf(PropTypes.shape(playerPropTypes)).isRequired
   }

   render() {
      const { data } = this.props
      return (
         <Sidebar align="left" title="Lista de jogadores" titleInfo="Fale com seus companheiros">
            {data.map(player => <div key={player._id}>{player.name}</div>)}
         </Sidebar>
      )
   }
}
