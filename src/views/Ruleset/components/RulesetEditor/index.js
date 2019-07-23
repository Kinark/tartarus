import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { Prompt } from 'react-router-dom'

import Sidebar from '~/components/Sidebar'
import AppMainWrapper from '~/components/AppMainWrapper'
import CustomScroll from '~/components/CustomScroll'
import EmptyPlaceholder from '~/components/EmptyPlaceholder'
import { Button } from '~/components/Button'
import { Input } from '~/components/Input'

import Draggable from './components/Draggable'
import DraggableAdded from './components/DraggableAdded'

export default class RulesetEditor extends Component {
   state = {
      bgImg: 'https://www.danny.com.br/wp-content/uploads/2015/12/imagem-branca-grande.png',
      bgWidth: '1280',
      inputs: [],
      selectedInputId: null,
      unsaved: false
   }

   addInput = (e, positionOnGrabX, positionOnGrabY) => {
      const { inputs } = this.state
      if (!e.target.isEqualNode(this.sheet)) return

      const rect = e.target.getBoundingClientRect()
      const newInputWidth = 250
      const newInputHeight = 40
      const releaseX = e.clientX - rect.left - positionOnGrabX
      const releaseY = e.clientY - rect.top - positionOnGrabY

      const sheetHeight = this.sheetContainer.scrollHeight
      const sheetWidth = this.sheetContainer.scrollWidth
      const inputWidth = newInputWidth
      const inputHeight = newInputHeight + 10

      const x = releaseX < 0 ? 0 : releaseX + inputWidth > sheetWidth ? sheetWidth - inputWidth : releaseX
      const y = releaseY < 0 ? 0 : releaseY + inputHeight > sheetHeight ? sheetHeight - inputHeight : releaseY

      const newInput = { id: Date.now(), x, y, width: 250, height: 40 }
      this.setState({ inputs: [...inputs, newInput], unsaved: true })
   }

   moveInput = (id, translateX, translateY) => {
      const { inputs } = this.state
      const copyInputs = [...inputs]
      const selectedInputIndex = copyInputs.findIndex(input => input.id === id)

      const sheetHeight = this.sheetContainer.scrollHeight
      const sheetWidth = this.sheetContainer.scrollWidth
      const inputHeight = copyInputs[selectedInputIndex].height + 10
      const inputWidth = copyInputs[selectedInputIndex].width

      copyInputs[selectedInputIndex].x = translateX < 0 ? 0 : translateX + inputWidth > sheetWidth ? sheetWidth - inputWidth : translateX
      copyInputs[selectedInputIndex].y = translateY < 0 ? 0 : translateY + inputHeight > sheetHeight ? sheetHeight - inputHeight : translateY
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

   save = () => this.setState({ unsaved: false })

   clearInputs = () => this.setState({ selectedInputId: null, inputs: [] })

   inputHandler = e => this.setState({ [e.target.name]: e.target.value })

   render() {
      const { bgImg, bgWidth, inputs, selectedInputId, unsaved } = this.state
      const selectedInputInfo = inputs.find(input => input.id === selectedInputId)
      return (
         <React.Fragment>
            <Prompt when={unsaved} message="Tem certeza que deseja sair sem salvar?" />
            <Sidebar align="left" title="Campos" titleInfo="Arraste e solte para adicionar.">
               <Draggable onDragEnd={this.addInput}>
                  <AddedInput readOnly placeholder="Input normal" />
               </Draggable>
            </Sidebar>
            <AppMainWrapper>
               {bgImg ? (
                  <SheetScrollFrame>
                     <SheetContainer ref={el => (this.sheetContainer = el)}>
                        {inputs.map(({ id, x, y, width }) => (
                           <DraggableAdded onClick={this.selectInput} translateX={x} onDrag={this.moveInput} translateY={y} id={id} key={id}>
                              <AddedInput readOnly width={width} selected={id === selectedInputId} />
                           </DraggableAdded>
                        ))}
                        <Sheet ref={el => (this.sheet = el)} onClick={this.unselectInput} src={bgImg} width={bgWidth} />
                     </SheetContainer>
                  </SheetScrollFrame>
               ) : (
                  <EmptyPlaceholder>
                     Nenhum fundo
                     <br />
                     ainda definido
                  </EmptyPlaceholder>
               )}
            </AppMainWrapper>
            {selectedInputId ? (
               <Sidebar align="right" title="Input" titleInfo="Ajuste o input selecionado.">
                  <label htmlFor="inputWidth">
                     Largura
                     <Input id="inputWidth" type="number" value={selectedInputInfo.width} name="width" onChange={this.editInput} placeholder="Largura do input" />
                  </label>
                  <label htmlFor="inputX">
                     Posição horizontal
                     <Input id="inputX" type="number" value={selectedInputInfo.x} name="x" onChange={this.editInput} placeholder="Posição horizontal do input" />
                  </label>
                  <label htmlFor="inputY">
                     Posição vertical
                     <Input id="inputY" type="number" value={selectedInputInfo.y} name="y" onChange={this.editInput} placeholder="Posição vertical do input" />
                  </label>
                  <Button onClick={this.deleteInput}>Excluir input</Button>
               </Sidebar>
            ) : (
               <Sidebar align="right" title="Sistema" titleInfo="Ajustes globais do seu sistema.">
                  <label htmlFor="inputY">
                     URL da imagem de fundo
                     <Input id="bg" value={bgImg} onChange={this.inputHandler} name="bgImg" placeholder="URL da imagem de fundo" />
                  </label>
                  <label htmlFor="inputY">
                     Largura da imagem de fundo
                     <Input id="bgWidth" value={bgWidth} type="number" onChange={this.inputHandler} name="bgWidth" placeholder="Largura da imagem de fundo" />
                  </label>
                  <Button onClick={this.clearInputs}>Limpar inputs</Button>
                  <Button onClick={this.save}>Salvar</Button>
               </Sidebar>
            )}
         </React.Fragment>
      )
   }
}

const SheetScrollFrame = styled(CustomScroll)`
   text-align: center;
`

export const AddedInput = styled(Input)`
   pointer-events: none;
   user-drag: none;
   user-select: none;
   width: ${({ width }) => width || 250}px;
   ${({ selected }) =>
      selected &&
      css`
         border-width: 2px;
      `}
`

const SheetContainer = styled.div`
   position: relative;
   display: inline-block;
`

const Sheet = styled.img`
   /* width: ${({ width }) => width}px; */
   margin: auto;
   display: block;
   user-drag: none; 
   user-select: none;
`
