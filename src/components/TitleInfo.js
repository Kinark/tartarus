import styled from 'styled-components'

import colors from '~/constants/colors'

const TitleInfo = styled.p`
   font-size: 18px;
   color: ${({ theme }) => theme.TITLE_INFO};
   margin-top: 0;
`
TitleInfo.defaultProps = { theme: colors.light }

export default TitleInfo
