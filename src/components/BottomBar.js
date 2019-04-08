import React, { PureComponent } from 'react'
import styled from 'styled-components'

export default class BottomBar extends PureComponent {
   render() {
      return (
         <BottomBarUl>
            <li>lol</li>
            <li>lol</li>
         </BottomBarUl>
      )
   }
}

const BottomBarUl = styled.ul`
   height: 60px;
   flex: 0;
`
