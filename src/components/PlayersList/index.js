import React, { PureComponent } from 'react'
// import styled from 'styled-components'

import Sidebar from '~/components/Sidebar'
import Friend from './components/Friend'

export default class PlayersList extends PureComponent {
   render() {
      return (
         <Sidebar align="left" title="Lista de jogadores" titleInfo="Fale com seus companheiros">
            PlayersList
         </Sidebar>
      )
   }
}
