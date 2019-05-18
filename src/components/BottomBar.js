import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { togglePlayMode } from '~/redux/actions/app'
import { setTheme } from '~/redux/actions/settings'
import { logUserOff } from '~/redux/actions/auth'

class BottomBar extends PureComponent {
   static propTypes = {
      theme: PropTypes.string.isRequired,
      playMode: PropTypes.bool.isRequired,
      dispatch: PropTypes.func.isRequired
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
      dispatch(logUserOff())
   }

   render() {
      const { theme } = this.props
      return (
         <BottomBarUl>
            <Item onClick={this.handleThemeClick}>Novo mundo</Item>
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
