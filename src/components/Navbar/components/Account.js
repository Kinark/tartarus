import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import colors from '~/constants/colors'

export default class LogoSection extends PureComponent {
   render() {
      return (
         <AccountWrapper>
            <Info>
               Matheus-kun
               <span>Online</span>
            </Info>
            <AvatarWrapper>
               <img src="https://bit.ly/2Kbomr6" alt="" />
            </AvatarWrapper>
         </AccountWrapper>
      )
   }
}

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

const Info = connect(state => ({ theme: state.settings.theme }))(styled.div`
   font-size: 18px;
   line-height: 18px;
   font-family: 'upgrade', sans-serif;
   font-weight: 400;
   span {
      display: block;
      font-size: 16px;
      color: ${({ theme }) => colors[theme].TITLE_INFO};
   }
`)
