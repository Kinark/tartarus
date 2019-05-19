import React, { PureComponent } from 'react'

import MyWorlds from './components/MyWorlds'

export default class Worlds extends PureComponent {
   render() {
      return (
         <div className="row">
            <div className="col xs12">
               <MyWorlds />
            </div>
         </div>
      )
   }
}
