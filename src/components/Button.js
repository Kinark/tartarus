import styled from 'styled-components'
import { connect } from 'react-redux'

import colors from '~/constants/colors'

const Button = styled.button`
   font-size: 15px;
   border-radius: 5px;
   color: ${({ theme }) => colors[theme].BG};
   background-color: ${({ theme }) => colors[theme].TITLE};
   display: ${props => (props.inline ? 'inline-block' : 'block')};
   width: ${props => (props.inline ? 'auto' : '100%')};
   margin: 5px 0;
   padding: 8px 24px;
   text-transform: uppercase;
   text-align: center;
   border: none;
   font-family: 'upgrade', sans-serif;
   font-weight: 400;
   cursor: pointer;
   opacity: ${props => (props.loading ? '0.75' : '1')};
   transition: opacity 300ms;
   position: relative;
   pointer-events: ${props => (props.loading ? 'none' : 'auto')};
   :hover {
      opacity: 0.75;
   }
   &::before {
      content: "";
      height: 3px;
      width: ${props => (props.loading ? '100%' : '0%')};
      background-color: ${({ theme }) => colors[theme].TITLE};
      bottom: 0;
      left: 0;
      transition: width 500ms;
      position: absolute;
      opacity: 0.5;
   }
`

const mapStateToProps = state => ({ theme: state.settings.theme })
export default connect(mapStateToProps)(Button)
