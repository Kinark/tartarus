import styled from 'styled-components'

import colors from '~/constants/colors'

const CardTitle = styled.h3`
   font-size: 30px;
   color: ${({ theme }) => theme.TITLE};
   margin-bottom:0;
`
CardTitle.defaultProps = { theme: colors.light }

export default CardTitle
