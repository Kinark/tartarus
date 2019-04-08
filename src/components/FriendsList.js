import React, { PureComponent } from 'react'
// import styled from 'styled-components'

import Sidebar from '~/components/Sidebar'

export default class FriendsList extends PureComponent {
   render() {
      return (
         <Sidebar align="left" title="Lista de amigos" titleInfo="Lute com animops">
            Friendslist
         </Sidebar>
      )
   }
}
