import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { togglePlayMode } from '~/redux/actions/app'
import { setTheme } from '~/redux/actions/settings'

class BottomBar extends PureComponent {
   static propTypes = {
      theme: PropTypes.string.isRequired,
      playMode: PropTypes.bool.isRequired,
      dispatchSetTheme: PropTypes.func.isRequired,
      dispatchTogglePlayMode: PropTypes.func.isRequired
   }

   handleThemeClick = () => {
      const { theme, dispatchSetTheme } = this.props
      dispatchSetTheme(theme === 'dark' ? 'light' : 'dark')
   }

   handlePlayModeClick = () => {
      const { playMode, dispatchTogglePlayMode } = this.props
      dispatchTogglePlayMode(!playMode)
   }

   logoff = () => {
      localStorage.removeItem('JWToken')
      document.location.reload()
   }

   render() {
      const { theme } = this.props
      return (
         <BottomBarUl>
            <Item onClick={this.handleThemeClick}>Modo {theme === 'dark' ? 'escuro' : 'claro'}</Item>
            <Item onClick={this.handlePlayModeClick}>Modo jogar</Item>
            <Item onClick={this.logoff}>Logoff</Item>
         </BottomBarUl>
      )
   }
}

const mapDispatchToProps = dispatch => ({
   dispatchSetTheme: theme => dispatch(setTheme(theme)),
   dispatchTogglePlayMode: value => dispatch(togglePlayMode(value))
})
const mapStateToProps = state => ({ theme: state.settings.theme, playMode: state.app.playMode })
export default connect(
   mapStateToProps,
   mapDispatchToProps
)(BottomBar)

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
