import styled from 'styled-components'

import colors from '~/constants/colors'

const SectionTitle = styled.h3`
   font-family: 'upgrade', sans-serif;
   font-weight: 500;
   font-size: 32px;
   color: ${({ theme }) => theme.TITLE};
   margin-top: 0;
   margin-bottom: 0;
`
SectionTitle.defaultProps = { theme: colors.light }

export default SectionTitle
