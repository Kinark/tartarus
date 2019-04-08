import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'

import CustomScroll from '~/components/CustomScroll'
import SectionTitle from '~/components/SectionTitle'
import TitleInfo from '~/components/TitleInfo'
import SectionContent from '~/components/SectionContent'

import colors from '~/constants/colors'

export default class Sidebar extends PureComponent {
   static propTypes = {
      children: PropTypes.node.isRequired,
      align: PropTypes.oneOf(['left', 'right']).isRequired,
      title: PropTypes.string.isRequired,
      titleInfo: PropTypes.string.isRequired
   }

   render() {
      const { children, title, titleInfo, align } = this.props
      return (
         <SideNav>
            <SectionContent>
               <TitleSection className={`${align}-align`}>
                  <SectionTitle>{title}</SectionTitle>
                  <TitleInfo>{titleInfo}</TitleInfo>
               </TitleSection>
               <CustomScroll>{children}</CustomScroll>
            </SectionContent>
         </SideNav>
      )
   }
}

const SideNav = connect(state => ({ theme: state.settings.theme }))(styled.aside`
   height: 100%;
   width: 310px;
   background-color: ${({ theme }) => colors[theme].SECTION_1};
`)

const TitleSection = styled.div`
   margin-bottom: 20px;
`
