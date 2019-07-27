import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'

import playerPropTypes from '~/propTypes/player'
import { addWorldSubTab } from '~/redux/actions/app'

import CustomScroll from '~/components/CustomScroll'
import { Input, Textarea } from '~/components/Input'

class Sheet extends PureComponent {
   static getDerivedStateFromProps({ tabs, match }) {
      if (!tabs.length) return null
      const { pages } = tabs
         .find(tab => tab._id === match.params.worldId)
         .members.find(member => member.characters.find(char => char._id === match.params.sheetId))
         .characters.find(char => char._id === match.params.sheetId).ruleset
      return { selectedPageNonce: pages[0].nonce }
   }

   static propTypes = {
      dispatch: PropTypes.func.isRequired,
      tabs: PropTypes.arrayOf(
         PropTypes.shape({
            members: PropTypes.arrayOf(PropTypes.shape(playerPropTypes)).isRequired
         })
      ).isRequired,
      subTabs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
      match: PropTypes.shape({
         params: PropTypes.shape({
            worldId: PropTypes.string.isRequired,
            sheetId: PropTypes.string.isRequired
         }).isRequired
      }).isRequired
   }

   state = {
      selectedPageNonce: null,
      sheetInputs: []
   }

   componentDidMount() {
      const { subTabs, match } = this.props
      if (!subTabs.find(subTab => subTab._id === match.params.sheetId)) this.addTab()
   }

   componentDidUpdate(prevProps) {
      const { tabs, match } = this.props
      if (JSON.stringify(prevProps.tabs) === JSON.stringify(tabs) && prevProps.match.params.sheetId === match.params.sheetId) return
      this.addTab()
   }

   addTab = () => {
      const { dispatch, tabs, match } = this.props
      if (!tabs.length) return
      const { name } = tabs
         .find(tab => tab._id === match.params.worldId)
         .members.find(member => member.characters.find(char => char._id === match.params.sheetId))
         .characters.find(char => char._id === match.params.sheetId)
      dispatch(addWorldSubTab({ worldId: match.params.worldId, _id: match.params.sheetId, name, path: `sheet/${match.params.sheetId}` }))
   }

   inputHandler = ({ target }) => {
      const { sheetInputs } = this.state
      const newSheetInputs = [...sheetInputs]
      const alreadyThereInput = newSheetInputs.find(input => input.modelNonce === +target.name)
      if (alreadyThereInput) alreadyThereInput.content = target.value
      else newSheetInputs.push({ modelNonce: +target.name, content: target.value })
      this.setState({ sheetInputs: newSheetInputs })
   }

   render() {
      const { selectedPageNonce, sheetInputs } = this.state
      const { tabs, match } = this.props
      const ruleset = tabs.length
         ? tabs
              .find(tab => tab._id === match.params.worldId)
              .members.find(member => member.characters.find(char => char._id === match.params.sheetId))
              .characters.find(char => char._id === match.params.sheetId).ruleset
         : null
      const rightPage = ruleset ? ruleset.pages.find(page => page.nonce === selectedPageNonce) : null
      return (
         <SheetScrollFrame>
            <SheetContainer>
               {!!selectedPageNonce && (
                  <React.Fragment>
                     {ruleset.inputs
                        .filter(input => input.pageNonce === selectedPageNonce)
                        .map(({ nonce, x, y, fontSize, width, height, type }) => {
                           const sheetInput = sheetInputs.find(input => input.modelNonce === nonce)
                           const sheetInputContent = sheetInput ? sheetInput.content : ''
                           return type === 'input' ? (
                              <StyledInput
                                 name={nonce}
                                 value={sheetInputContent}
                                 onChange={this.inputHandler}
                                 key={nonce}
                                 x={x}
                                 y={y}
                                 fontSize={fontSize}
                                 width={width}
                                 height={height}
                              />
                           ) : (
                              <StyledTextarea
                                 name={nonce}
                                 value={sheetInputContent}
                                 onChange={this.inputHandler}
                                 key={nonce}
                                 x={x}
                                 y={y}
                                 fontSize={fontSize}
                                 width={width}
                                 height={height}
                              />
                           )
                        })}
                     <SheetImg src={rightPage.bgImg} width={rightPage.bgWidth} />
                  </React.Fragment>
               )}
            </SheetContainer>
         </SheetScrollFrame>
      )
   }
}
const mapStateToProps = state => ({ tabs: state.app.tabs, subTabs: state.app.subTabs })
export default connect(mapStateToProps)(Sheet)

const InputsBase = css`
   position: absolute;
   border: none;
`

const StyledInput = styled(Input).attrs(({ x, y, width, height, fontSize }) => ({
   style: { left: `${x}px`, top: `${y}px`, width: `${width}px`, height: `${height}px`, fontSize: `${fontSize}px` }
}))`
   ${InputsBase}
`

const StyledTextarea = styled(Textarea).attrs(({ x, y, width, height, fontSize }) => ({
   style: { left: `${x}px`, top: `${y}px`, width: `${width}px`, height: `${height}px`, fontSize: `${fontSize}px` }
}))`
   ${InputsBase}
`

const SheetScrollFrame = styled(CustomScroll)`
   text-align: center;
`

const SheetContainer = styled.div`
   position: relative;
   display: inline-block;
`

const SheetImg = styled.img`
   /* width: ${({ width }) => width}px; */
   margin: auto;
   display: block;
   user-drag: none; 
   user-select: none;
`
