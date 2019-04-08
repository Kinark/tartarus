import styled from 'styled-components'
import { connect } from 'react-redux'

import colors from '~/constants/colors'

const SectionTitle = styled.h3`
   font-family: 'upgrade', sans-serif;
   font-weight: 500;
   font-size: 32px;
   color: ${({ theme }) => colors[theme].TITLE};
   margin-top: 0;
   margin-bottom: 0;
`

const mapStateToProps = state => ({ theme: state.settings.theme })
export default connect(mapStateToProps)(SectionTitle)
