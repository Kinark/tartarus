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

import Login from '~/views/Login'
import Welcome from '~/views/Welcome'
import Worlds from '~/views/Worlds'

const title = 'Sample Website'
const description = 'A sample website.'
// const cover = "";

class App extends Component {
   static propTypes = {
      darkMode: PropTypes.bool.isRequired
   }

   componentDidMount = () => {
      this.setBodyColor()
   }

   componentDidUpdate = prevProps => {
      const { darkMode } = this.props
      if (darkMode !== prevProps.darkMode) {
         this.setBodyColor()
      }
   }

   componentWillUnmount = () => {
      document.body.style.backgroundColor = null
   }

   setBodyColor = () => {
      const { darkMode } = this.props
      document.body.style.backgroundColor = darkMode ? colors.dark.BG : colors.light.BG
   }

   logoff = () => {
      localStorage.removeItem('JWToken')
      document.location.reload()
   }

   render() {
      const { darkMode } = this.props
      return (
         <AppWrapper darkMode={darkMode}>
            <Metas title={title} description={description} />
            <Favicon />
            <Switch>
               <Route path="/login" component={Login} />
               <PrivateRoute path="/" component={Welcome} />
               <PrivateRoute path="/worlds" component={Worlds} />
            </Switch>
            <button type="button" onClick={this.logoff}>Logoff</button>
         </AppWrapper>
      )
   }
}

const mapStateToProps = state => ({ darkMode: state.settings.darkMode })
const connectedApp = connect(mapStateToProps)(App)
export default hot(module)(connectedApp)

const AppWrapper = styled.div`
   background-color: ${props => (props.darkMode ? colors.dark.BG : colors.light.BG)};
   color: ${props => (props.darkMode ? colors.dark.BODY_TEXT : colors.light.BODY_TEXT)};
`
