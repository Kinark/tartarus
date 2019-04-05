import styled from 'styled-components'
import { connect } from 'react-redux'

import colors from '~/constants/colors'

const CardTitle = styled.h3`
   font-size: 30px;
   color: ${props => (props.darkMode ? colors.dark.TITLE : colors.light.TITLE)};
   margin-bottom:0;
`

const mapStateToProps = state => ({ darkMode: state.settings.darkMode })
export default connect(mapStateToProps)(CardTitle)
