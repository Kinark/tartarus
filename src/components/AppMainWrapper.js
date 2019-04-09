import styled from 'styled-components';

import colors from '~/constants/colors'

const AppMainWrapper = styled.main`
   flex: 1 0;
   background-color: ${({ theme }) => theme.SECTION_2};
`
AppMainWrapper.defaultProps = { theme: colors.light }

export default AppMainWrapper
