import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from '~/redux/store'
import { Metas } from '~/components/Metas'
import Favicon from '~/components/Favicon'
import PrivateRoute from '~/components/PrivateRoute'

import Login from '~/views/Login'

const title = 'Sample Website'
const description = 'A sample website.'
// const cover = "";

class App extends Component {
   render() {
      return (
         <Provider store={store}>
            <Metas title={title} description={description} />
            <Favicon />
            <Switch>
               <Route path="/login" component={Login} />
               <PrivateRoute path="/" component={Login} />
               <PrivateRoute path="/worlds" component={Login} />
            </Switch>
         </Provider>
      )
   }
}

export default hot(module)(App)
