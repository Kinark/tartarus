import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from '~/redux/store'
import App from '~/App'
import './styles.global.scss'
import { BrowserRouter, Route } from 'react-router-dom'

const root = document.getElementById('root')

render(
   <Provider store={store}>
      <BrowserRouter>
         <Route component={App} />
      </BrowserRouter>
   </Provider>,
   root
)

if (module.hot) {
   module.hot.accept()
}
