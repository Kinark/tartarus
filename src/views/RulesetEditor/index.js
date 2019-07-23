import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { Prompt } from 'react-router-dom'
import { connect } from 'react-redux'

import getRuleset from '~/services/getRuleset'
import editRuleset from '~/services/editRuleset'
import { fetchMyRulesets } from '~/redux/actions/myRulesets'

import Sidebar from '~/components/Sidebar'
import AppMainWrapper from '~/components/AppMainWrapper'
import CustomScroll from '~/components/CustomScroll'
import EmptyPlaceholder from '~/components/EmptyPlaceholder'
import { Button } from '~/components/Button'
import { Input } from '~/components/Input'

import Draggable from './components/Draggable'
import DraggableAdded from './components/DraggableAdded'

class RulesetEditor extends Component {
   static propTypes = {
      dispatch: PropTypes.func.isRequired,
      match: PropTypes.shape({
         params: PropTypes.shape({
            rulesetId: PropTypes.string.isRequired
         }).isRequired
      }).isRequired
   }

   state = {
      name: '',
      bgImg: '',
      bgWidth: '',
      inputs: [],
      selectedInputNonce: null,
      unsaved: false,
      loading: true
   }

   componentDidMount() {
      this.fetchAndSet()
   }

   fetchAndSet = async () => {
      const { match } = this.props
      const { data } = await getRuleset(match.params.rulesetId)
      this.setState({ name: data.name, bgImg: data.bgImg, bgWidth: data.bgWidth, inputs: data.inputs })
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

      const newInput = { nonce: Date.now(), x, y, width: 250, height: 40 }
      this.setState({ inputs: [...inputs, newInput], unsaved: true })
   }

   moveInput = (nonce, translateX, translateY) => {
      const { inputs } = this.state
      const copyInputs = [...inputs]
      const selectedInputIndex = copyInputs.findIndex(input => input.nonce === nonce)

      const sheetHeight = this.sheetContainer.scrollHeight
      const sheetWidth = this.sheetContainer.scrollWidth
      const inputHeight = copyInputs[selectedInputIndex].height + 10
      const inputWidth = copyInputs[selectedInputIndex].width

      copyInputs[selectedInputIndex].x = translateX < 0 ? 0 : translateX + inputWidth > sheetWidth ? sheetWidth - inputWidth : translateX
      copyInputs[selectedInputIndex].y = translateY < 0 ? 0 : translateY + inputHeight > sheetHeight ? sheetHeight - inputHeight : translateY
      this.setState({ inputs: copyInputs, unsaved: true })
   }

   selectInput = nonce => this.setState({ selectedInputNonce: nonce })

   unselectInput = () => this.setState({ selectedInputNonce: null })

   editInput = e => {
      const { inputs, selectedInputNonce } = this.state
      const copyInputs = [...inputs]
      const selectedInputIndex = copyInputs.findIndex(input => input.nonce === selectedInputNonce)
      copyInputs[selectedInputIndex][e.target.name] = +e.target.value
      this.setState({ inputs: copyInputs, unsaved: true })
   }

   deleteInput = () => {
      const { inputs, selectedInputNonce } = this.state
      const copyInputs = [...inputs]
      const selectedInputIndex = copyInputs.findIndex(input => input.nonce === selectedInputNonce)
      copyInputs.splice(selectedInputIndex, 1)
      this.setState({ selectedInputNonce: null, inputs: copyInputs, unsaved: true })
   }

   save = async () => {
      const { match, dispatch } = this.props
      const { name, bgImg, bgWidth, inputs } = this.state
      try {
         await editRuleset(match.params.rulesetId, { name, bgImg, bgWidth, inputs })
         dispatch(fetchMyRulesets())
         this.setState({ unsaved: false })
      } catch (error) {
         console.log(error)
      }
   }

   clearInputs = () => this.setState({ selectedInputNonce: null, inputs: [], unsaved: true })

   inputHandler = e => this.setState({ [e.target.name]: e.target.value, unsaved: true })

   render() {
      const { name, bgImg, bgWidth, inputs, selectedInputNonce, unsaved } = this.state
      const selectedInputInfo = inputs.find(input => input.nonce === selectedInputNonce)
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
                        {inputs.map(({ nonce, x, y, width }) => (
                           <DraggableAdded onClick={this.selectInput} translateX={x} onDrag={this.moveInput} translateY={y} nonce={nonce} key={nonce}>
                              <AddedInput readOnly width={width} selected={nonce === selectedInputNonce} />
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
            {selectedInputNonce ? (
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
                  <label htmlFor="name">
                     Nome do sistema
                     <Input id="name" value={name} onChange={this.inputHandler} name="name" placeholder="Nome do sistema" />
                  </label>
                  <label htmlFor="inputY">
                     URL da imagem de fundo
                     <Input id="bg" value={bgImg} onChange={this.inputHandler} name="bgImg" placeholder="URL da imagem de fundo" />
                  </label>
                  <label htmlFor="inputY">
                     Largura da imagem de fundo
                     <Input id="bgWidth" value={bgWidth} type="number" onChange={this.inputHandler} name="bgWidth" placeholder="Largura da imagem de fundo" />
                  </label>
                  <Button onClick={this.clearInputs}>Limpar inputs</Button>
                  <Button disabled={!unsaved} onClick={this.save}>
                     {unsaved ? 'Salvar' : 'Salvo'}
                  </Button>
               </Sidebar>
            )}
         </React.Fragment>
      )
   }
}
export default connect()(RulesetEditor)

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
