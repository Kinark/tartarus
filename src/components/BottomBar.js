import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { toggleNewWorldModal, togglePlayMode, deactivateAppListeners } from '~/redux/actions/app'
import { setTheme } from '~/redux/actions/settings'
import { logUserOff } from '~/redux/actions/auth'
import { fetchMyRulesets } from '~/redux/actions/myRulesets'

import newRuleset from '~/services/newRuleset'

class BottomBar extends PureComponent {
   static propTypes = {
      theme: PropTypes.string.isRequired,
      playMode: PropTypes.bool.isRequired,
      dispatch: PropTypes.func.isRequired
   }

   handleNewWorld = () => {
      const { dispatch } = this.props
      dispatch(toggleNewWorldModal(true))
   }

   handleNewRuleset = async () => {
      const { dispatch } = this.props
      await newRuleset(`Ruleset ${Math.random() * 100}`)
      dispatch(fetchMyRulesets())
   }

   handleThemeClick = () => {
      const { theme, dispatch } = this.props
      dispatch(setTheme(theme === 'dark' ? 'light' : 'dark'))
   }

   handlePlayModeClick = () => {
      const { playMode, dispatch } = this.props
      dispatch(togglePlayMode(!playMode))
   }

   logoff = () => {
      const { dispatch } = this.props
      dispatch(deactivateAppListeners())
      dispatch(logUserOff())
   }

   render() {
      const { theme } = this.props
      return (
         <BottomBarUl>
            <Item onClick={this.handleNewWorld}>Novo mundo</Item>
            <Item onClick={this.handleNewRuleset}>Novo ruleset</Item>
            <Item onClick={this.handleThemeClick}>Modo {theme === 'dark' ? 'escuro' : 'claro'}</Item>
            <Item onClick={this.handlePlayModeClick}>Modo jogar</Item>
            <Item onClick={this.logoff}>Logoff</Item>
         </BottomBarUl>
      )
   }
}

const mapStateToProps = state => ({ theme: state.settings.theme, playMode: state.app.playMode })
export default connect(mapStateToProps)(BottomBar)

const BottomBarUl = styled.ul`
   flex: 0;
   margin: 0;
   padding: 0;
   list-style-type: none;
`

const Item = styled.li`
   display: inline-block;
   padding: 18px;
   text-transform: uppercase;
   font-size: 16px;
   font-family: 'upgrade', sans-serif;
   font-weight: 400;
   cursor: pointer;
   background-color: rgba(127, 127, 127, 0);
   transition: background-color 300ms;
   :hover {
      background-color: rgba(127, 127, 127, 0.1);
   }
`
