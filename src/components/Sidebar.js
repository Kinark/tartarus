import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import colors from '~/constants/colors'

export default class index extends PureComponent {
   static propTypes = {
      children: PropTypes.node.isRequired
   }

   render() {
      const { children } = this.props
      return <SideNav>{children}</SideNav>
   }
}

const SideNav = styled.aside`
   height: 100%;
   background-color: ${({ theme }) => colors[theme].SECTION_1};
`
