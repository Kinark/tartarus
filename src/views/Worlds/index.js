import React, { PureComponent } from 'react'

import SearchWorlds from './components/SearchWorlds'
import MyWorlds from './components/MyWorlds'

export default class Worlds extends PureComponent {
   render() {
      return (
         <div className="row">
            <div className="col xs12 m4">
               <SearchWorlds />
            </div>
            <div className="col xs12 m4">
               <MyWorlds />
            </div>
         </div>
      )
   }
}
