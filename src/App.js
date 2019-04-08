import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { hot } from 'react-hot-loader'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'

// import store from '~/redux/store'
import colors from '~/constants/colors'
import { Metas } from '~/components/Metas'
import Favicon from '~/components/Favicon'
import PrivateRoute from '~/components/PrivateRoute'
import Navbar from '~/components/Navbar'

import Login from '~/views/Login'
import Welcome from '~/views/Welcome'
import Worlds from '~/views/Worlds'

const title = 'Sample Website'
const description = 'A sample website.'
// const cover = "";

class App extends Component {
   static propTypes = {
      theme: PropTypes.string.isRequired
   }

   componentDidMount = () => this.setBodyColor()

   componentDidUpdate = prevProps => {
      const { theme } = this.props
      if (theme !== prevProps.theme) this.setBodyColor()
   }

   componentWillUnmount = () => {
      document.body.style.backgroundColor = null
   }

   setBodyColor = () => {
      const { theme } = this.props
      document.body.style.backgroundColor = colors[theme].BG
   }

   logoff = () => {
      localStorage.removeItem('JWToken')
      document.location.reload()
   }

   render() {
      const { theme } = this.props
      return (
         <AppWrapper theme={theme}>
            <Metas title={title} description={description} />
            <Favicon />
            <Switch>
               <Route path="/login" component={Login} />
               <PrivateRoute path="/" component={AppRoutes} />
            </Switch>
            <button type="button" onClick={this.logoff}>
               Logoff
            </button>
         </AppWrapper>
      )
   }
}

const mapStateToProps = state => ({ theme: state.settings.theme })
const connectedApp = connect(mapStateToProps)(App)
export default hot(module)(connectedApp)

const AppWrapper = styled.div`
   background-color: ${({ theme }) => colors[theme].BG};
   color: ${({ theme }) => colors[theme].BODY_TEXT};
`

const AppRoutes = () => (
   <React.Fragment>
      <Route path="/" component={Navbar} />
      <div className="row">
         <Switch>
            <Route path="/" component={Welcome} exact />
            <Route path="/worlds" component={Worlds} />
         </Switch>
      </div>
   </React.Fragment>
)
