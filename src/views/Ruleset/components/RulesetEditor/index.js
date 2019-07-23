import React, { Component } from 'react'
import styled from 'styled-components'

import Sidebar from '~/components/Sidebar'
import AppMainWrapper from '~/components/AppMainWrapper'
import CustomScroll from '~/components/CustomScroll'
import Draggable from '~/components/Draggable'
import DraggableAdded from '~/components/DraggableAdded'
import { Button } from '~/components/Button'
import { Input } from '~/components/Input'

export default class RulesetEditor extends Component {
   state = {
      bgImg: 'https://www.danny.com.br/wp-content/uploads/2015/12/imagem-branca-grande.png',
      bgWidth: '1280',
      inputs: [],
      selectedInputId: null
   }

   addInput = e => {
      const { inputs } = this.state
      const rect = e.target.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const newInput = {
         id: Date.now(),
         x,
         y,
         width: 250,
         height: 40
      }
      this.setState({ inputs: [...inputs, newInput] })
   }

   moveInput = (id, translateX, translateY) => {
      const { inputs } = this.state
      const copyInputs = [...inputs]
      const selectedInputIndex = copyInputs.findIndex(input => input.id === id)
      const containerHeight = this.sheetFrame.scrollHeight
      const containerWidth = this.sheetFrame.scrollWidth
      const inputHeight = copyInputs[selectedInputIndex].height + 10
      const inputWidth = copyInputs[selectedInputIndex].width
      copyInputs[selectedInputIndex].x = translateX < 0 ? 0 : translateX + inputWidth > containerWidth ? containerWidth - inputWidth : translateX
      copyInputs[selectedInputIndex].y = translateY < 0 ? 0 : translateY + inputHeight > containerHeight ? containerHeight - inputHeight : translateY
      this.setState({ inputs: copyInputs })
   }

   selectInput = id => this.setState({ selectedInputId: id })

   unselectInput = () => this.setState({ selectedInputId: null })

   editInput = e => {
      const { inputs, selectedInputId } = this.state
      const copyInputs = [...inputs]
      const selectedInputIndex = copyInputs.findIndex(input => input.id === selectedInputId)
      copyInputs[selectedInputIndex][e.target.name] = +e.target.value
      this.setState({ inputs: copyInputs })
   }

   deleteInput = () => {
      const { inputs, selectedInputId } = this.state
      const copyInputs = [...inputs]
      const selectedInputIndex = copyInputs.findIndex(input => input.id === selectedInputId)
      copyInputs.splice(selectedInputIndex, 1)
      this.setState({ selectedInputId: null, inputs: copyInputs })
   }

   clearInputs = () => this.setState({ inputs: [] })

   inputHandler = e => this.setState({ [e.target.name]: e.target.value })

   render() {
      const { bgImg, bgWidth, inputs, selectedInputId } = this.state
      const selectedInputInfo = inputs.find(input => input.id === selectedInputId)
      return (
         <React.Fragment>
            <Sidebar align="left" title="Campos" titleInfo="Arraste e solte para adicionar.">
               <Draggable onDragEnd={this.addInput}>
                  <Input readOnly placeholder="Input normal" style={{ pointerEvents: 'none' }} />
               </Draggable>
               <button type="button" onClick={this.clearInputs}>
                  Limpar inputs
               </button>
            </Sidebar>
            <AppMainWrapper>
               <SheetFrame>
                  {inputs.map(({ id, x, y, width }) => (
                     <DraggableAdded onClick={this.selectInput} translateX={x} onDrag={this.moveInput} translateY={y} id={id} key={id}>
                        <AddedInput readOnly width={width} />
                     </DraggableAdded>
                  ))}
                  <Sheet onClick={this.unselectInput} ref={el => (this.sheetFrame = el)} src={bgImg} width={bgWidth} />
               </SheetFrame>
            </AppMainWrapper>
            {selectedInputId ? (
               <Sidebar align="right" title="Input" titleInfo="Ajuste o input selecionado.">
                  <label htmlFor="inputWidth">
                     Largura
                     <Input
                        id="inputWidth"
                        type="number"
                        value={selectedInputInfo.width}
                        name="width"
                        onChange={this.editInput}
                        placeholder="Largura do input"
                     />
                  </label>
                  <label htmlFor="inputX">
                     Posição horizontal
                     <Input
                        id="inputX"
                        type="number"
                        value={selectedInputInfo.x}
                        name="x"
                        onChange={this.editInput}
                        placeholder="Posição horizontal do input"
                     />
                  </label>
                  <label htmlFor="inputY">
                     Posição vertical
                     <Input id="inputY" type="number" value={selectedInputInfo.y} name="y" onChange={this.editInput} placeholder="Posição vertical do input" />
                  </label>
                  <Button onClick={this.deleteInput}>Deletar input</Button>
               </Sidebar>
            ) : (
               <Sidebar align="right" title="Sistema" titleInfo="Ajustes globais do seu sistema.">
                  <Input value={bgImg} onChange={this.inputHandler} name="bgImg" placeholder="URL da imagem de fundo" />
                  <Input value={bgWidth} type="number" onChange={this.inputHandler} name="bgWidth" placeholder="Largura da imagem de fundo" />
               </Sidebar>
            )}
         </React.Fragment>
      )
   }
}

const SheetFrame = styled(CustomScroll)`
   position: relative;
`

export const AddedInput = styled(Input).attrs(({ x, y }) => ({
   style: { transform: `translate(${x}px, ${y}px)` }
}))`
   pointer-events: none;
   user-drag: none;
   user-select: none;
   width: ${({ width }) => width}px;
`

const Sheet = styled.img`
   /* width: ${({ width }) => width}px; */
   margin: auto;
   display: block;
   user-drag: none; 
   user-select: none;
`
