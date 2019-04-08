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
            {theme === 'dark' ? <LogoOutlineStyled /> : <LogoNormalStyled />}
            Tartarus
         </LogoSectionWrapper>
      )
   }
}

const LogoSectionWrapper = connect(state => ({ playMode: state.app.playMode }))(styled.div`
   font-family: 'upgrade', sans-serif;
   font-weight: 600;
   display: flex;
   align-items: center;
   font-size: ${props => (props.playMode ? '27px' : '35px')};
   transition: font-size 300ms;
   img {
      margin-right: 10px;
   }
`)

const LogoOutlineStyled = connect(state => ({ playMode: state.app.playMode }))(styled(LogoOutline)`
   height: ${props => (props.playMode ? '46px' : '62px')};
   transition: height 300ms;
`)

const LogoNormalStyled = connect(state => ({ playMode: state.app.playMode }))(styled(LogoNormal)`
   height: ${props => (props.playMode ? '46px' : '62px')};
   transition: height 300ms;
`)

const mapStateToProps = state => ({ theme: state.settings.theme })
export default connect(mapStateToProps)(LogoSection)
