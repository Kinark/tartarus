import React from 'react'
import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components'

import Navbar from '~/components/Navbar'
import FriendsList from '~/components/FriendsList'
import AppMainWrapper from '~/components/AppMainWrapper'
import BottomBar from '~/components/BottomBar'

import Welcome from '~/views/Welcome'
import Worlds from '~/views/Worlds'
import World from '~/views/World'

export default () => (
   <React.Fragment>
      <Route path="/" component={Navbar} />
      <AppContentWrapper>
         <Route path="/" component={FriendsList} />
         <AppMainWrapper>
            <Switch>
               <Route path="/" component={Welcome} exact />
               <Route path="/worlds" component={Worlds} />
               <Route path="/world/:worldId" component={World} />
            </Switch>
         </AppMainWrapper>
      </AppContentWrapper>
      <Route path="/" component={BottomBar} />
   </React.Fragment>
)

const AppContentWrapper = styled.div`
   display: flex;
   height: 100%;
`
