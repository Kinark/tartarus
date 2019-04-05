import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import LogoNormalSVG from './images/normal.svg'
import LogoOutlineDarkSVG from './images/outline-dark.svg'
import LogoOutlineLightSVG from './images/outline-light.svg'

class NonConnectedLogoOutline extends PureComponent {
   static propTypes = {
      darkMode: PropTypes.bool.isRequired
   }

   render() {
      const { darkMode, dispatch, ...rest } = this.props
      if (darkMode) return <img {...rest} src={LogoOutlineDarkSVG} alt="Tartarus" />
      return <img {...rest} src={LogoOutlineLightSVG} alt="Tartarus" />
   }
}

const mapStateToProps = state => ({ darkMode: state.settings.darkMode })
export const LogoOutline = connect(mapStateToProps)(NonConnectedLogoOutline)


export class LogoNormal extends PureComponent {
   render() {
      return <img src={LogoNormalSVG} alt="Tartarus" {...this.props} />
   }
}
