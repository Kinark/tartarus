import React, { PureComponent } from 'react'

import AppMainWrapper from '~/components/AppMainWrapper'
import FullHeight from '~/components/FullHeight'

import SearchWorlds from './components/SearchWorlds'
import MyWorlds from './components/MyWorlds'
import WhereILive from './components/WhereILive'

export default class Worlds extends PureComponent {
   render() {
      return (
         <AppMainWrapper>
            <FullHeight className="row">
               <FullHeight className="col xs12 m4">
                  <SearchWorlds />
               </FullHeight>
               <FullHeight className="col xs12 m4">
                  <MyWorlds />
               </FullHeight>
               <FullHeight className="col xs12 m4">
                  <WhereILive />
               </FullHeight>
            </FullHeight>
         </AppMainWrapper>
      )
   }
}
