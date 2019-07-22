import React, { PureComponent } from 'react'
import styled from 'styled-components'

import Sidebar from '~/components/Sidebar'
import AppMainWrapper from '~/components/AppMainWrapper'
import CustomScroll from '~/components/CustomScroll'
import Draggable from '~/components/Draggable'
import { Input } from '~/components/Input'

export default class RulesetEditor extends PureComponent {
   state = {
      bgImg: '',
      bgWidth: ''
   }

   inputHandler = e => this.setState({ [e.target.name]: e.target.value })

   render() {
      const { bgImg, bgWidth } = this.state
      return (
         <React.Fragment>
            <Sidebar title="Campos" titleInfo="Arraste e solte para adicionar.">
               <Draggable>
                  <Input readOnly placeholder="Input normal" />
               </Draggable>
               {/* <DraggableInput readOnly placeholder="Input normal" /> */}
            </Sidebar>
            <AppMainWrapper>
               <SheetFrame>
                  <Sheet src={bgImg} width={bgWidth} />
               </SheetFrame>
            </AppMainWrapper>
            <Sidebar title="Sistema" titleInfo="Ajustes globais do seu sistema.">
               <Input value={bgImg} onChange={this.inputHandler} name="bgImg" placeholder="URL da imagem de fundo" />
               <Input value={bgWidth} type="number" onChange={this.inputHandler} name="bgWidth" placeholder="Largura da imagem de fundo" />
            </Sidebar>
         </React.Fragment>
      )
   }
}

// const DraggableInput = styled(Input)`
//    cursor: default;
// `

const Sheet = styled.img`
   /* width: ${({ width }) => width}px; */
   margin: auto;
   display: block;
`

const SheetFrame = styled(CustomScroll)`
   position: relative;
`
