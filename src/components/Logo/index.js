import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import LogoNormalSVG from './images/normal.svg'
import LogoOutlineDarkSVG from './images/outline-dark.svg'
import LogoOutlineLightSVG from './images/outline-light.svg'

class NonConnectedLogoOutline extends PureComponent {
   static propTypes = {
      theme: PropTypes.string.isRequired
   }

   render() {
      const { theme, dispatch, ...rest } = this.props
      if (theme === 'dark') return <img {...rest} src={LogoOutlineDarkSVG} alt="Tartarus" />
      return <img {...rest} src={LogoOutlineLightSVG} alt="Tartarus" />
   }
}

const mapStateToProps = state => ({ theme: state.settings.theme })
export const LogoOutline = connect(mapStateToProps)(NonConnectedLogoOutline)


export class LogoNormal extends PureComponent {
   render() {
      return <img src={LogoNormalSVG} alt="Tartarus" {...this.props} />
   }
}
