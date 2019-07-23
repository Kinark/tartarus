import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

export default class DraggableAdded extends PureComponent {
   static propTypes = {
      onDragStart: PropTypes.func,
      onDrag: PropTypes.func,
      onDragEnd: PropTypes.func,
      onClick: PropTypes.func,
      nonce: PropTypes.number.isRequired,
      translateX: PropTypes.number.isRequired,
      translateY: PropTypes.number.isRequired,
      children: PropTypes.node.isRequired
   }

   static defaultProps = {
      onDragStart: undefined,
      onDrag: undefined,
      onDragEnd: undefined,
      onClick: undefined
   }

   state = {
      isDragging: false,

      originalX: 0,
      originalY: 0,

      lastTranslateX: 0,
      lastTranslateY: 0
   }

   componentWillUnmount() {
      window.removeEventListener('mousemove', this.handleMouseMove)
      window.removeEventListener('mouseup', this.handleMouseUp)
   }

   handleMouseDown = e => {
      e.preventDefault()
      window.addEventListener('mousemove', this.handleMouseMove)
      window.addEventListener('mouseup', this.handleMouseUp)
      const { onDragStart, translateX, translateY } = this.props

      if (onDragStart) onDragStart()

      this.setState({
         originalX: e.clientX,
         originalY: e.clientY,
         lastTranslateX: translateX,
         lastTranslateY: translateY,
         isDragging: true,
         willClick: true
      })
   }

   handleMouseMove = ({ clientX, clientY }) => {
      const { isDragging, originalX, originalY, lastTranslateX, lastTranslateY } = this.state
      const { nonce, onDrag } = this.props

      if (!isDragging) return

      const translateX = clientX - originalX + lastTranslateX
      const translateY = clientY - originalY + lastTranslateY

      onDrag(nonce, translateX, translateY)

      this.setState({ willClick: false })
   }

   handleMouseUp = e => {
      window.removeEventListener('mousemove', this.handleMouseMove)
      window.removeEventListener('mouseup', this.handleMouseUp)
      const { willClick } = this.state
      const { nonce, translateX, translateY, onDragEnd, onClick } = this.props

      if (willClick) onClick(nonce)

      this.setState(
         {
            originalX: 0,
            originalY: 0,
            lastTranslateX: translateX,
            lastTranslateY: translateY,
            isDragging: false
         },
         () => {
            if (onDragEnd) onDragEnd(e)
         }
      )
   }

   render() {
      const { children, translateX, translateY } = this.props
      const { isDragging, isBeingDragged } = this.state

      return (
         <Container onMouseDown={this.handleMouseDown} x={translateX} y={translateY} isDragging={isDragging} isBeingDragged={isBeingDragged}>
            {children}
         </Container>
      )
   }
}

export const Container = styled.div.attrs(({ x, y }) => ({
   style: { transform: `translate(${x}px, ${y}px)` }
}))`
   cursor: grab;
   user-drag: none;
   user-select: none;
   position: absolute;
   ${({ isDragging }) =>
      isDragging &&
      css`
         opacity: 0.8;
         cursor: grabbing;
         z-index: 999999;
      `};
`
