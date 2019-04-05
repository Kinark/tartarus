import styled from 'styled-components'
import { connect } from 'react-redux'

import colors from '~/constants/colors'

const CardTitle = styled.p`
   font-size: 18px;
   color: ${props => (props.darkMode ? colors.dark.TITLE_INFO : colors.light.TITLE_INFO)};
   margin-top: 0;
`

const mapStateToProps = state => ({ darkMode: state.settings.darkMode })
export default connect(mapStateToProps)(CardTitle)
