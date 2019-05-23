import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import colors from '~/constants/colors'

class LogoSection extends PureComponent {
   static propTypes = {
      username: PropTypes.string.isRequired
   }

   render() {
      const { username } = this.props
      return (
         <AccountWrapper>
            <Info>
               {username}
               <span>Online</span>
            </Info>
            <AvatarWrapper>
               <img src="https://bit.ly/2Kbomr6" alt="" />
            </AvatarWrapper>
         </AccountWrapper>
      )
   }
}
const mapStateToProps = state => ({ username: state.auth.username })
export default connect(mapStateToProps)(LogoSection)

const AccountWrapper = styled.div`
   display: flex;
   align-items: center;
   text-align: right;
`

const AvatarWrapper = styled.div`
   float: left;
   margin-left: 10px;
   height: 45px;
   width: 45px;
   border-radius: 50%;
   overflow: hidden;
   img {
      height: 100%;
   }
`

const Info = styled.div`
   font-size: 18px;
   line-height: 18px;
   font-family: 'upgrade', sans-serif;
   font-weight: 400;
   span {
      display: block;
      font-size: 16px;
      color: ${({ theme }) => theme.TITLE_INFO};
   }
`
Info.defaultProps = { theme: colors.light }
