import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { LogoOutline } from '~/components/Logo'
import SectionTitle from '~/components/SectionTitle'

export default class EmptyPlaceholder extends PureComponent {
   static propTypes = {
      children: PropTypes.node.isRequired,
   }

   render() {
      const { children } = this.props
      return (
         <LoadingWrapper>
            <LogoOutlineStyled />
            <SectionTitle>{children}</SectionTitle>
         </LoadingWrapper>
      )
   }
}

const LogoOutlineStyled = styled(LogoOutline)`
   margin-bottom: 2rem;
`

const LoadingWrapper = styled.div`
   opacity: 0.35;
   height: 100%;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   text-align: center;
   pointer-events: none;
   user-drag: none;
   user-select: none;
`
