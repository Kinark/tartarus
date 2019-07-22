import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import styled, { ThemeProvider } from 'styled-components'

import colors from '~/constants/colors'
import { activateSocketListeners } from '~/redux/actions/app'

import { Metas } from '~/components/Metas'
import Favicon from '~/components/Favicon'
import PrivateRoute from '~/components/PrivateRoute'
import AppRoutes from '~/components/AppRoutes'

import Login from '~/views/Login'
import Signup from '~/views/Signup'
import Loading from '~/views/Loading'

const title = 'Tartarus'
const description = 'A sample website.'
// const cover = "";

class App extends Component {
   static propTypes = {
      dispatch: PropTypes.func.isRequired,
      theme: PropTypes.string.isRequired,
      connected: PropTypes.bool.isRequired
   }

   componentDidMount() {
      const { dispatch } = this.props
      dispatch(activateSocketListeners())
      this.setBodyColor()
   }

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
      const { theme, connected } = this.props
      return (
         <ThemeProvider theme={colors[theme]}>
            <AppWrapper>
               <Metas title={title} description={description} />
               <Favicon />
               {connected ? (
                  <Switch>
                     <Route path="/signup" component={Signup} />
                     <Route path="/login" component={Login} />
                     <PrivateRoute path="/" component={AppRoutes} />
                  </Switch>
               ) : (
                  <Loading type="Connecting..." />
               )}
            </AppWrapper>
         </ThemeProvider>
      )
   }
}

const mapStateToProps = state => ({ theme: state.settings.theme, connected: state.app.connected })
const connectedApp = connect(mapStateToProps)(App)
export default hot(connectedApp)

const AppWrapper = styled.div`
   background-color: ${({ theme }) => theme.BG};
   color: ${({ theme }) => theme.BODY_TEXT};
   display: flex;
   height: 100%;
   flex-direction: column;
`
AppWrapper.defaultProps = { theme: colors.light }
