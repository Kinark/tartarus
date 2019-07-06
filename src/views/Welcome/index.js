import React, { Component } from 'react'

import AppMainWrapper from '~/components/AppMainWrapper'
import CustomScroll from '~/components/CustomScroll'
import SectionTitle from '~/components/SectionTitle'
import TitleInfo from '~/components/TitleInfo'
import SectionContent from '~/components/SectionContent'

export default class Welcome extends Component {
   render() {
      return (
         <AppMainWrapper>
            <SectionContent>
               <SectionTitle>Bem-vindo!</SectionTitle>
               <TitleInfo>Os mais falados na taverna</TitleInfo>
               <CustomScroll>Ao menos é o que disseram o taverneiro e o bêbado no canto...</CustomScroll>
            </SectionContent>
         </AppMainWrapper>
      )
   }
}
