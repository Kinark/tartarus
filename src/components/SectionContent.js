import styled from 'styled-components'

import colors from '~/constants/colors'

const SectionContent = styled.section`
   padding: 30px 30px 0;
   height: 100%;
   border-right: ${({ bordered, theme }) => (bordered ? `solid 1px ${theme.DIVIER_SOFT}` : 'none')};
`

SectionContent.defaultProps = { theme: colors.light }

export default SectionContent
