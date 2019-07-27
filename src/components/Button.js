import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

import colors from '~/constants/colors'

const buttonBase = css`
   text-align: center;
   font-size: 15px;
   border-radius: 5px;
   color: ${({ theme }) => theme.BG};
   background-color: ${({ theme }) => theme.TITLE};
   display: ${props => (props.inline ? 'inline-block' : 'block')};
   width: ${props => (props.inline ? 'auto' : '100%')};
   margin: 8px 0;
   padding: 8px 24px;
   text-transform: uppercase;
   text-align: center;
   border: none;
   font-family: 'upgrade', sans-serif;
   font-weight: 400;
   cursor: pointer;
   opacity: ${props => (props.loading || props.disabled ? '0.75' : '1')};
   transition: opacity 300ms;
   position: relative;
   pointer-events: ${props => (props.loading || props.disabled ? 'none' : 'auto')};
   :hover {
      opacity: 0.75;
   }
   &::before {
      content: '';
      height: 3px;
      width: ${props => (props.loading ? '100%' : '0%')};
      background-color: ${({ theme }) => theme.TITLE};
      bottom: 0;
      left: 0;
      transition: width 500ms;
      position: absolute;
      opacity: 0.5;
   }
`
buttonBase.defaultProps = { theme: colors.light }

export const FileInput = styled.input`
   border: 0;
   clip: rect(0, 0, 0, 0);
   height: 1px;
   overflow: hidden;
   padding: 0;
   position: absolute !important;
   white-space: nowrap;
   width: 1px;
   &+label {
      ${buttonBase};
   }
`

const Button = styled.button`
   ${buttonBase}
`

const ButtonLink = styled(Link)`
   ${buttonBase}
`

export { Button, ButtonLink }
