import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { Route } from 'react-router-dom'
import { Provider } from 'redux'

import { store } from '~/redux/store'
import { Metas } from '~/components/Metas'
import Favicon from '~/components/Favicon'
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
            <Route path="/login" component={Login} />
         </Provider>
      )
   }
}

export default hot(module)(App)
