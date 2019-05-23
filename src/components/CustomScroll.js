import styled from 'styled-components'

import colors from '~/constants/colors'

const CustomScroll = styled.div`
   padding-right: 6px;
   overflow-y: auto;
   ::-webkit-scrollbar-button {
      display: none;
   }
   ::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.CHAT_BG_COLOR};
      border-radius: 6px;
      display:none;
      transition: opacity 300ms;
   }
   &:hover {
      ::-webkit-scrollbar-thumb {
         display: block;
      }
   }
   ::-webkit-scrollbar-track {
      background-color: transparent;
   }
   ::-webkit-scrollbar {
      width: 3px;
   }
`
CustomScroll.defaultProps = { theme: colors.light }

export default CustomScroll
