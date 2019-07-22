import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

export default class Draggable extends React.Component {
   static propTypes = {
      onDragStart: PropTypes.func,
      onDrag: PropTypes.func,
      onDragEnd: PropTypes.func,
      children: PropTypes.node.isRequired
   }

   static defaultProps = {
      onDragStart: undefined,
      onDrag: undefined,
      onDragEnd: undefined
   }

   state = {
      isDragging: false,

      originalX: 0,
      originalY: 0,

      translateX: 0,
      translateY: 0,

      lastTranslateX: 0,
      lastTranslateY: 0
   }

   componentWillUnmount() {
      window.removeEventListener('mousemove', this.handleMouseMove)
      window.removeEventListener('mouseup', this.handleMouseUp)
   }

   handleMouseDown = ({ clientX, clientY }) => {
      window.addEventListener('mousemove', this.handleMouseMove)
      window.addEventListener('mouseup', this.handleMouseUp)
      const { onDragStart } = this.props

      if (onDragStart) onDragStart()

      this.setState({
         originalX: clientX,
         originalY: clientY,
         isDragging: true
      })
   }

   handleMouseMove = ({ clientX, clientY }) => {
      const { isDragging } = this.state
      const { onDrag } = this.props

      if (!isDragging) {
         return
      }

      this.setState(
         prevState => ({
            translateX: clientX - prevState.originalX + prevState.lastTranslateX,
            translateY: clientY - prevState.originalY + prevState.lastTranslateY
         }),
         () => {
            const { translateX, translateY } = this.state
            if (onDrag) onDrag({ translateX, translateY })
         }
      )
   }

   handleMouseUp = () => {
      window.removeEventListener('mousemove', this.handleMouseMove)
      window.removeEventListener('mouseup', this.handleMouseUp)
      const { onDragEnd } = this.props

      const { top, left } = this.el.getBoundingClientRect()

      this.setState(
         {
            translateX: 0,
            translateY: 0,
            originalX: 0,
            originalY: 0,
            //   lastTranslateX: this.state.translateX,
            //   lastTranslateY: this.state.translateY,
            lastTranslateX: 0,
            lastTranslateY: 0,

            isDragging: false
         },
         () => {
            if (onDragEnd) onDragEnd(top, left)
         }
      )
   }

   render() {
      const { children } = this.props
      const { translateX, translateY, isDragging } = this.state

      return (
         <Container ref={el => (this.el = el)} onMouseDown={this.handleMouseDown} x={translateX} y={translateY} isDragging={isDragging}>
            {children}
         </Container>
      )
   }
}

export const Container = styled.div.attrs(({ x, y }) => ({
   style: { transform: `translate(${x}px, ${y}px)` }
}))`
   cursor: grab;

   ${({ isDragging }) =>
      isDragging &&
      css`
         opacity: 0.8;
         cursor: grabbing;
         position: fixed;
         z-index: 999999;
      `};
`
