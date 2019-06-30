import React, { PureComponent } from 'react'

import FullHeight from '~/components/FullHeight'

import SearchWorlds from './components/SearchWorlds'
import MyWorlds from './components/MyWorlds'

export default class Worlds extends PureComponent {
   render() {
      return (
         <FullHeight className="row">
            <FullHeight className="col xs12 m4">
               <SearchWorlds />
            </FullHeight>
            <FullHeight className="col xs12 m4">
               <MyWorlds />
            </FullHeight>
         </FullHeight>
      )
   }
}
