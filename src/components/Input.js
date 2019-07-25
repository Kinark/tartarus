import styled, { css } from 'styled-components'

import colors from '~/constants/colors'

const inputBase = css`
   font-family: upgrade-lights, sans-serif;
   font-size: 16px;
   border-radius: 5px;
   color: ${({ theme }) => theme.TITLE};
   margin: 5px 0;
   padding: 10px 18px;
   border: solid 1px ${({ theme }) => theme.TITLE};
   background-color: transparent;
   width: 100%;
`
inputBase.defaultProps = { theme: colors.light }

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
      ${inputBase};
      text-align: left;
      cursor: pointer;
      opacity: 1;
      transition: opacity 150ms;
      &:hover {
         opacity: 0.75;
      }
   }
`

export const Input = styled.input`
   ${inputBase}
`

export const Textarea = styled.textarea`
   ${inputBase}
   resize: vertical;
`
