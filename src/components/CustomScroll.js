import styled from 'styled-components'

export default styled.div`
   ::-webkit-scrollbar-button {
      display: none;
      height: 13px;
      border-radius: 0px;
      background-color: #aaa;
   }
   ::-webkit-scrollbar-button:hover {
      background-color: #aaa;
   }
   ::-webkit-scrollbar-thumb {
      background-color: #ccc;
      border-radius: 6px;
   }
   ::-webkit-scrollbar-thumb:hover {
      background-color: #ccc;
   }
   ::-webkit-scrollbar-track {
      background-color: transparent;
      border-radius: 4px;
   }
   ::-webkit-scrollbar-track:hover {
      background-color: transparent;
   }
   ::-webkit-scrollbar {
      width: 3px;
   }
`
