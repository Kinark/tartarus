import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components'

import { activateAppListeners } from '~/redux/actions/app'
import { logUserIn } from '~/redux/actions/auth'

import LoadingRoomModal from '~/components/LoadingRoomModal'
import NewWorldModal from '~/components/NewWorldModal'
import Navbar from '~/components/Navbar'
import FriendsList from '~/components/FriendsList'
import BottomBar from '~/components/BottomBar'

import Welcome from '~/views/Welcome'
import Worlds from '~/views/Worlds'
import World from '~/views/World'
import Rulesets from '~/views/Rulesets'
import RulesetEditor from '~/views/RulesetEditor'
import Loading from '~/views/Loading'

class AppRoutes extends PureComponent {
   static propTypes = {
      dispatch: PropTypes.func.isRequired,
      authenticated: PropTypes.bool.isRequired
   }

   componentDidMount() {
      this.appStartRoutine()
   }

   componentWillUnmount() {
      clearInterval(this.JWTRenewInterval)
   }

   appStartRoutine = () => {
      const { dispatch } = this.props
      dispatch(
         logUserIn(null, null, () => {
            dispatch(activateAppListeners())
         })
      )
      this.JWTRenewInterval = setInterval(() => dispatch(logUserIn()), 1 * 60 * 60 * 1000)
   }

   render() {
      const { authenticated } = this.props
      if (!authenticated) return <Loading type="Authenticating..." />
      return (
         <React.Fragment>
            <LoadingRoomModal />
            <NewWorldModal />
            <Route path="/" component={Navbar} />
            <AppContentWrapper>
               <Route path="(/|/worlds|/ruleset)" component={FriendsList} exact />
               <Switch>
                  <Route path="/" component={Welcome} exact />
                  <Route path="/worlds" component={Worlds} />
                  <Route path="/world/:worldId" component={World} />
                  <Route path="/ruleset" component={Rulesets} exact />
                  <Route path="/ruleset/:rulesetId" component={RulesetEditor} />
               </Switch>
            </AppContentWrapper>
            <Route path="/" component={BottomBar} />
         </React.Fragment>
      )
   }
}
const mapStateToProps = state => ({ authenticated: state.app.authenticated })
export default connect(mapStateToProps)(AppRoutes)

const AppContentWrapper = styled.div`
   display: flex;
   flex-grow: 1;
   overflow: hidden;
`
