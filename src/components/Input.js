import styled from 'styled-components'

import colors from '~/constants/colors'

const Input = styled.input`
   font-family: upgrade-lights, sans-serif;
   font-size: 16px;
   border-radius: 5px;
   color: ${({ theme }) => theme.TITLE};
   margin: 5px 0;
   padding: 10px 18px;
   border: solid 1px ${({ theme }) => theme.TITLE};
   background-color: transparent;
   width: 100%;
`
Input.defaultProps = { theme: colors.light }

export default Input
