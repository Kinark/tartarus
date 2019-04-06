import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { LogoNormal, LogoOutline } from '~/components/Logo'

class LogoSection extends PureComponent {
   static propTypes = {
      darkMode: PropTypes.bool.isRequired
   }

   render() {
      const { darkMode } = this.props
      return (
         <LogoSectionWrapper>
            {darkMode ? <LogoOutline height="68" /> : <LogoNormal height="62" />}
            Tartarus
         </LogoSectionWrapper>
      )
   }
}

const LogoSectionWrapper = styled.div`
   font-family: 'upgrade', sans-serif;
   font-weight: 600;
   display: flex;
   align-items: center;
   font-size: 35px;
   img {
      margin-right: 10px;
   }
`

const mapStateToProps = state => ({ darkMode: state.settings.darkMode })
export default connect(mapStateToProps)(LogoSection)
