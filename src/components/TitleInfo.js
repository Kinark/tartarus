import styled from 'styled-components'
import { connect } from 'react-redux'

import colors from '~/constants/colors'

const CardTitle = styled.p`
   font-size: 18px;
   color: ${({ theme }) => colors[theme].TITLE_INFO};
   margin-top: 0;
`

const mapStateToProps = state => ({ theme: state.settings.theme })
export default connect(mapStateToProps)(CardTitle)
