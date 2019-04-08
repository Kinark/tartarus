import React, { Component } from 'react'

import CustomScroll from '~/components/CustomScroll'
import SectionTitle from '~/components/SectionTitle'
import TitleInfo from '~/components/TitleInfo'
import SectionContent from '~/components/SectionContent'

export default class Worlds extends Component {
   render() {
      return (
         <SectionContent>
            <SectionTitle>Procurar novos mundos</SectionTitle>
            <TitleInfo>Encontre seus animops</TitleInfo>
            <CustomScroll>Procuraaaa</CustomScroll>
         </SectionContent>
      )
   }
}
