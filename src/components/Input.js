import styled from 'styled-components'
import { connect } from 'react-redux'

import colors from '~/constants/colors'

const Input = styled.input`
   font-family: upgrade-lights, sans-serif;
   font-size: 16px;
   border-radius: 5px;
   color: ${({ theme }) => colors[theme].TITLE};
   margin: 5px 0;
   padding: 10px 18px;
   border: solid 1px ${({ theme }) => colors[theme].TITLE};
   background-color: transparent;
   width: 100%;
`

const mapStateToProps = state => ({ theme: state.settings.theme })
export default connect(mapStateToProps)(Input)
