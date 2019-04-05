import styled from 'styled-components'
import { connect } from 'react-redux'

import colors from '~/constants/colors'

const Input = styled.input`
   font-family: upgrade-lights, sans-serif;
   font-size: 16px;
   border-radius: 5px;
   color: ${props => (props.darkMode ? colors.dark.TITLE : colors.light.TITLE)};
   margin: 5px 0;
   padding: 10px 18px;
   border: solid 1px ${props => (props.darkMode ? colors.dark.TITLE : colors.light.TITLE)};
   background-color: transparent;
   width: 100%;
`

const mapStateToProps = state => ({ darkMode: state.settings.darkMode })
export default connect(mapStateToProps)(Input)
