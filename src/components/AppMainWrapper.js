import styled from 'styled-components';
import { connect } from 'react-redux'

import colors from '~/constants/colors'

const AppMainWrapper = styled.main`
   height: 100vh;
   background-color: ${({ theme }) => colors[theme].SECTION_2};
`

const mapStateToProps = state => ({ theme: state.settings.theme })
export default connect(mapStateToProps)(AppMainWrapper)
