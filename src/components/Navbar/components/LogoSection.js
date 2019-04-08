import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { LogoNormal, LogoOutline } from '~/components/Logo'

class LogoSection extends PureComponent {
   static propTypes = {
      theme: PropTypes.string.isRequired
   }

   render() {
      const { theme } = this.props
      return (
         <LogoSectionWrapper>
            {theme === 'dark' ? <LogoOutline height="68" /> : <LogoNormal height="62" />}
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

const mapStateToProps = state => ({ theme: state.settings.theme })
export default connect(mapStateToProps)(LogoSection)
