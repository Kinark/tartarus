import React, { PureComponent } from 'react'
// import styled from 'styled-components'

import Sidebar from '~/components/Sidebar'
import Friend from './components/Friend'

export default class FriendsList extends PureComponent {
   render() {
      return (
         <Sidebar align="left" title="Lista de amigos" titleInfo="Fale com seus companheiros">
            Friendslist
         </Sidebar>
      )
   }
}
