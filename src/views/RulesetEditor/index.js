import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { Prompt } from 'react-router-dom'
import { Menu, Plus, Trash2 } from 'react-feather'
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc'
import arrayMove from 'array-move'
import { Rnd } from 'react-rnd'

import colors from '~/constants/colors'
import getRuleset from '~/services/getRuleset'
import editRuleset from '~/services/editRuleset'
import { fetchMyRulesets } from '~/redux/actions/myRulesets'

import Sidebar from '~/components/Sidebar'
import AppMainWrapper from '~/components/AppMainWrapper'
import CustomScroll from '~/components/CustomScroll'
import EmptyPlaceholder from '~/components/EmptyPlaceholder'
import { Button, FileInput } from '~/components/Button'
import { Input, Textarea } from '~/components/Input'

import Draggable from './components/Draggable'
// import DraggableAdded from './components/DraggableAdded'

class RulesetEditor extends Component {
   static propTypes = {
      dispatch: PropTypes.func.isRequired,
      match: PropTypes.shape({
         params: PropTypes.shape({
            rulesetId: PropTypes.string.isRequired
         }).isRequired
      }).isRequired,
      theme: PropTypes.string.isRequired
   }

   state = {
      name: '',
      pages: [],
      inputs: [],
      selectedInputNonce: null,
      selectedPageNonce: null,
      unsaved: false
      // loading: true
   }

   componentDidMount() {
      this.fetchAndSet()
   }

   fetchAndSet = async () => {
      const { match } = this.props
      const { data } = await getRuleset(match.params.rulesetId)
      this.setState({ name: data.name, pages: data.pages, inputs: data.inputs })
   }

   //
   // ─── INPUTS METHODS ─────────────────────────────────────────────────────────────
   //

   addInput = (e, positionOnGrabX, positionOnGrabY, inputType) => {
      const { inputs, selectedPageNonce } = this.state
      if (!e.target.isEqualNode(this.sheet)) return

      const rect = e.target.getBoundingClientRect()
      const newInputWidth = 250
      const newInputHeight = inputType === 'input' ? 40 : 58
      const newInputFontSize = 16
      const releaseX = Math.floor(e.clientX - rect.left - positionOnGrabX)
      const releaseY = Math.floor(e.clientY - rect.top - positionOnGrabY)

      const sheetHeight = this.sheetContainer.scrollHeight
      const sheetWidth = this.sheetContainer.scrollWidth
      const inputWidth = newInputWidth
      const inputHeight = newInputHeight + 10

      const x = releaseX < 0 ? 0 : releaseX + inputWidth > sheetWidth ? sheetWidth - inputWidth : releaseX
      const y = releaseY < 0 ? 0 : releaseY + inputHeight > sheetHeight ? sheetHeight - inputHeight : releaseY

      const newInput = { type: inputType, nonce: Date.now(), x, y, fontSize: newInputFontSize, width: 250, height: newInputHeight, pageNonce: selectedPageNonce }
      this.setState({ inputs: [...inputs, newInput], unsaved: true })
   }

   selectInput = nonce => this.setState({ selectedInputNonce: nonce })

   unselectInput = () => this.setState({ selectedInputNonce: null })

   editInput = (nonce, { x, y, w, h }) => {
      const { inputs } = this.state
      const copyInputs = [...inputs]
      const selectedInputIndex = copyInputs.findIndex(input => input.nonce === nonce)
      if (x) copyInputs[selectedInputIndex].x = typeof x === 'string' ? +x.substring(0, w.length - 2) : x
      if (y) copyInputs[selectedInputIndex].y = typeof y === 'string' ? +y.substring(0, w.length - 2) : y
      if (w) copyInputs[selectedInputIndex].width = typeof w === 'string' ? +w.substring(0, w.length - 2) : w
      if (h) copyInputs[selectedInputIndex].height = typeof h === 'string' ? +h.substring(0, h.length - 2) : h
      this.setState({ inputs: copyInputs, unsaved: true })
   }

   editInputByInput = ({ target }) => {
      const { selectedInputNonce } = this.state
      this.editInput(selectedInputNonce, { [target.name]: +target.value })
   }

   deleteInput = () => {
      const { inputs, selectedInputNonce } = this.state
      const copyInputs = [...inputs]
      const selectedInputIndex = copyInputs.findIndex(input => input.nonce === selectedInputNonce)
      copyInputs.splice(selectedInputIndex, 1)
      this.setState({ selectedInputNonce: null, inputs: copyInputs, unsaved: true })
   }

   clearInputs = () => {
      const { inputs, selectedPageNonce } = this.state
      this.setState({ selectedInputNonce: null, inputs: inputs.filter(input => input.pageNonce !== selectedPageNonce), unsaved: true })
   }

   inputHandler = e => this.setState({ [e.target.name]: e.target.value, unsaved: true })

   //
   // ─── PAGES METHODS ──────────────────────────────────────────────────────────────
   //

   editPage = e => {
      const { pages, selectedPageNonce } = this.state
      const copyPages = [...pages]
      const selectedPageIndex = copyPages.findIndex(page => page.nonce === selectedPageNonce)
      copyPages[selectedPageIndex][e.target.name] = e.target.value
      this.setState({ pages: copyPages, unsaved: true })
   }

   deletePage = pageNonce => {
      const { pages, selectedPageNonce } = this.state
      const copyPages = [...pages]
      const selectedPageIndex = copyPages.findIndex(page => page.nonce === pageNonce)
      copyPages.splice(selectedPageIndex, 1)
      this.setState({ selectedPageNonce: pageNonce === selectedPageNonce ? null : selectedPageNonce, pages: copyPages, unsaved: true })
   }

   addPage = () => {
      const { pages } = this.state
      const copyPages = [...pages]
      copyPages.push({
         nonce: Date.now(),
         bgImg: '',
         bgWidth: 720
      })
      this.setState({ pages: copyPages, unsaved: true })
   }

   switchToPage = nonce => this.setState({ selectedPageNonce: nonce })

   onPageSortEnd = ({ oldIndex, newIndex }) => {
      this.setState(({ pages }) => ({
         pages: arrayMove(pages, oldIndex, newIndex),
         unsaved: true
      }))
   }

   //
   // ─── GENERAL METHODS ────────────────────────────────────────────────────────────
   //

   importFile = e => {
      const reader = new FileReader()
      reader.onload = readerEvent => {
         const jsonObj = JSON.parse(readerEvent.target.result)
         this.setState({ name: jsonObj.name, pages: jsonObj.pages, inputs: jsonObj.inputs, unsaved: true })
      }
      reader.readAsText(e.target.files[0])
   }

   exportAsFile = () => {
      const { name, pages, inputs } = this.state
      const exportObj = { name, pages, inputs }
      const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(exportObj))}`
      const downloadAnchorNode = document.createElement('a')
      downloadAnchorNode.setAttribute('href', dataStr)
      downloadAnchorNode.setAttribute('download', `${name}.json`)
      document.body.appendChild(downloadAnchorNode) // required for firefox
      downloadAnchorNode.click()
      downloadAnchorNode.remove()
   }

   save = async () => {
      const { match, dispatch } = this.props
      const { name, pages, inputs } = this.state
      try {
         await editRuleset(match.params.rulesetId, { name, pages, inputs })
         dispatch(fetchMyRulesets())
         this.setState({ unsaved: false })
      } catch (error) {
         console.log(error)
      }
   }

   render() {
      const { name, inputs, pages, selectedInputNonce, selectedPageNonce, unsaved } = this.state
      const { theme } = this.props
      const selectedInputInfo = inputs.find(input => input.nonce === selectedInputNonce)
      const selectedPageInputs = inputs.filter(input => input.pageNonce === selectedPageNonce)
      const selectedPage = pages.find(page => page.nonce === selectedPageNonce)
      return (
         <React.Fragment>
            <Prompt when={unsaved} message="Tem certeza que deseja sair sem salvar?" />

            <Sidebar align="left" title="Campos" titleInfo="Arraste e solte para adicionar.">
               <Draggable onDragEnd={(e, positionOnGrabX, positionOnGrabY) => this.addInput(e, positionOnGrabX, positionOnGrabY, 'input')}>
                  <AddedInput width="250" height="40" readOnly placeholder="Input de uma linha" />
               </Draggable>
               <Draggable onDragEnd={(e, positionOnGrabX, positionOnGrabY) => this.addInput(e, positionOnGrabX, positionOnGrabY, 'textarea')}>
                  <AddedTextArea width="250" height="58" readOnly placeholder="Input multilinhas" />
               </Draggable>
            </Sidebar>

            <AppMainWrapper>
               {selectedPage && selectedPage.bgImg ? (
                  <SheetScrollFrame>
                     <SheetContainer ref={el => (this.sheetContainer = el)}>
                        {selectedPageInputs.map(({ nonce, x, y, fontSize, width, height, type }) => (
                           <Rnd
                              key={nonce}
                              bounds="parent"
                              size={{ width, height }}
                              position={{ x, y }}
                              onDragStop={(e, d) => this.editInput(nonce, { x: d.x, y: d.y })}
                              onResizeStop={(e, direction, ref, delta, position) => this.editInput(nonce, { w: ref.style.width, h: ref.style.height, ...position })}
                              onClick={() => this.selectInput(nonce)}
                           >
                              {type === 'input' ? (
                                 <AddedInput placeholder="Input normal" readOnly fontSize={fontSize} selected={nonce === selectedInputNonce} />
                              ) : (
                                 <AddedTextArea placeholder="Input de texto" readOnly fontSize={fontSize} selected={nonce === selectedInputNonce} />
                              )}
                           </Rnd>
                        ))}
                        <Sheet ref={el => (this.sheet = el)} onClick={this.unselectInput} src={selectedPage.bgImg} width={selectedPage.bgWidth} />
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
                  <label htmlFor="inputFontSize">
                     Tamanho da fonte
                     <Input id="inputFontSize" type="number" value={selectedInputInfo.fontSize} name="fontSize" onChange={this.editInputByInput} placeholder="Largura do input" />
                  </label>
                  <label htmlFor="inputWidth">
                     Largura
                     <Input id="inputWidth" type="number" value={selectedInputInfo.width} name="w" onChange={this.editInputByInput} placeholder="Largura do input" />
                  </label>
                  {selectedInputInfo.type === 'textarea' && (
                     <label htmlFor="inputHeight">
                        Altura
                        <Input id="inputHeight" type="number" value={selectedInputInfo.height} name="h" onChange={this.editInputByInput} placeholder="Altura do input" />
                     </label>
                  )}
                  <label htmlFor="inputX">
                     Posição horizontal
                     <Input id="inputX" type="number" value={selectedInputInfo.x} name="x" onChange={this.editInputByInput} placeholder="Posição horizontal do input" />
                  </label>
                  <label htmlFor="inputY">
                     Posição vertical
                     <Input id="inputY" type="number" value={selectedInputInfo.y} name="y" onChange={this.editInputByInput} placeholder="Posição vertical do input" />
                  </label>
                  <Button onClick={this.deleteInput}>Excluir input</Button>
               </Sidebar>
            ) : (
               <Sidebar unscrolled align="right" title="Sistema" titleInfo="Ajustes globais do seu sistema.">
                  <label htmlFor="name">
                     Nome do sistema
                     <Input id="name" value={name} onChange={this.inputHandler} name="name" placeholder="Nome do sistema" />
                  </label>
                  {!!selectedPage && (
                     <React.Fragment>
                        <label htmlFor="inputY">
                           URL da imagem de fundo da página
                           <Input id="bg" value={selectedPage.bgImg} onChange={this.editPage} name="bgImg" placeholder="URL da imagem de fundo" />
                        </label>
                        <label htmlFor="inputY">
                           Largura da imagem de fundo da página
                           <Input id="bgWidth" value={selectedPage.bgWidth} type="number" onChange={this.editPage} name="bgWidth" placeholder="Largura da imagem de fundo" />
                        </label>
                        <Button onClick={this.clearInputs}>Limpar inputs da página</Button>
                     </React.Fragment>
                  )}
                  <Button disabled={!unsaved} onClick={this.save}>
                     {unsaved ? 'Salvar' : 'Salvo'}
                  </Button>
                  <Button onClick={this.exportAsFile}>Exportar modelo</Button>
                  <FileInput type="file" onChange={this.importFile} id="modelLoad" name="modelLoad" required />
                  <label htmlFor="modelLoad">Carregar modelo</label>
                  <div className="row xs-bottom no-mrg" style={{ width: '100%' }}>
                     <div className="col xs no-pad weight-bold">
                        <h5>Páginas</h5>
                     </div>
                     <div className="col xs no-pad right-align">
                        <StyledPlus onClick={this.addPage} color={colors[theme].TITLE} size={20} />
                     </div>
                  </div>
                  <CustomScroll>
                     <SortableContainer onSortEnd={this.onPageSortEnd} useDragHandle>
                        {pages.map((page, i) => (
                           <SortableItem key={page.nonce} index={i} current={page.nonce === selectedPageNonce} onClick={() => this.switchToPage(page.nonce)}>
                              <span>Página {i + 1}</span>
                              <Trash2
                                 onClick={e => {
                                    e.stopPropagation()
                                    this.deletePage(page.nonce)
                                 }}
                                 color={colors[theme].TITLE}
                                 size={18}
                              />
                           </SortableItem>
                        ))}
                     </SortableContainer>
                  </CustomScroll>
               </Sidebar>
            )}
         </React.Fragment>
      )
   }
}
export default connect(state => ({ theme: state.settings.theme }))(RulesetEditor)

const DragHandle = sortableHandle(
   connect(state => ({ theme: state.settings.theme }))(props => (
      <StyledDragHandler>
         <Menu color={colors[props.theme].TITLE} size={18} />
      </StyledDragHandler>
   ))
)

const SortableItem = sortableElement(({ onClick, current, children }) => (
   <PageListItem onClick={onClick} current={current}>
      <DragHandle />
      {children}
   </PageListItem>
))

const SortableContainer = sortableContainer(({ children }) => <PageListContainer>{children}</PageListContainer>)

const StyledPlus = styled(Plus)`
   cursor: pointer;
`

const PageListContainer = styled.ul`
   list-style-type: none;
   margin: 0;
   padding: 0;
`

const PageListItem = styled.li`
   border: solid ${({ current }) => (current ? '2px' : '1px')} ${({ theme }) => theme.TITLE};
   border-radius: 8px;
   margin: ${({ current }) => (current ? '9px' : '10px')} 0;
   padding: 5px 10px;
   cursor: pointer;
   list-style-type: none;
   display: flex;
   justify-content: space-between;
`
PageListItem.defaultProps = { theme: colors.light }

const StyledDragHandler = styled.span`
   vertical-align: bottom;
   display: inline-flex;
   justify-content: center;
   margin-right: 5px;
   cursor: row-resize;
`

const SheetScrollFrame = styled(CustomScroll)`
   text-align: center;
`

export const InputsStyles = css`
   pointer-events: none;
   width: ${({ width }) => (width ? `${width}px` : '100%')};
   height: ${({ height }) => (height ? `${height}px` : '100%')};
   font-size: ${({ fontSize }) => fontSize || 16}px;
   ${({ selected }) =>
      selected &&
      css`
         border-width: 2px;
      `}
`

export const AddedInput = styled(Input)`
   ${InputsStyles}
`

export const AddedTextArea = styled(Textarea)`
   ${InputsStyles}
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
