import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Navbar from '~/components/Navbar'
import AppContentWrapper from '~/components/AppContentWrapper'
import BottomBar from '~/components/BottomBar'

import Welcome from '~/views/Welcome'
import Worlds from '~/views/Worlds'

export default () => (
   <React.Fragment>
      <Route path="/" component={Navbar} />
      <AppContentWrapper>
         <Switch>
            <Route path="/" component={Welcome} exact />
            <Route path="/worlds" component={Worlds} />
         </Switch>
      </AppContentWrapper>
      <Route path="/" component={BottomBar} />
   </React.Fragment>
)
