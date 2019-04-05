import styled from 'styled-components'
import { connect } from 'react-redux'

import colors from '~/constants/colors'

const Button = styled.button`
   font-family: upgrade-lights, sans-serif;
   font-size: 15px;
   border-radius: 5px;
   color: ${props => (props.darkMode ? colors.dark.BG : colors.light.BG)};
   background-color: ${props => (props.darkMode ? colors.dark.TITLE : colors.light.TITLE)};
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
   opacity: 1;
   transition: opacity 300ms;
   :hover {
      opacity: .75;
   }
`

const mapStateToProps = state => ({ darkMode: state.settings.darkMode })
export default connect(mapStateToProps)(Button)
