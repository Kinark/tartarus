import styled from 'styled-components'
import { connect } from 'react-redux'

import colors from '~/constants/colors'

const CardTitle = styled.h3`
   font-size: 30px;
   color: ${({ theme }) => colors[theme].TITLE};
   margin-bottom:0;
`

const mapStateToProps = state => ({ theme: state.settings.theme })
export default connect(mapStateToProps)(CardTitle)
