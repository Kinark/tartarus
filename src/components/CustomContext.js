import styled from 'styled-components'
import { ContextMenu } from 'react-contextmenu'

const CustomContext = styled(ContextMenu)`
   background-color: black;
   border-radius: 5px;
   color: white;
   overflow: hidden;
   .react-contextmenu-item {
      padding: 7px 10px;
      &:hover {
         background-color: gray;
         cursor: default;
      }
   }
`

export default CustomContext
