import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { LogoNormal, LogoOutline } from '~/components/Logo'
import SectionTitle from '~/components/SectionTitle'

class Loading extends PureComponent {
   static propTypes = {
      theme: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired
   }

   render() {
      const { theme, type } = this.props
      return (
         <LoadingWrapper>
            {theme === 'dark' ? <LogoOutline /> : <LogoNormal />}
            <SectionTitle>{type}</SectionTitle>
         </LoadingWrapper>
      )
   }
}
const mapStateToProps = state => ({ theme: state.settings.theme })
export default connect(mapStateToProps)(Loading)

const LoadingWrapper = styled.div`
   height: 100vh;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
`
