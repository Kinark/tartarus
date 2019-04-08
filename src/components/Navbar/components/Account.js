import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import colors from '~/constants/colors'

class LogoSection extends PureComponent {
   static propTypes = {
      darkMode: PropTypes.bool.isRequired
   }

   render() {
      const { darkMode } = this.props
      return (
         <AccountWrapper>
            <Info darkMode={darkMode}>
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

const Info = styled.div`
   font-size: 18px;
   line-height: 18px;
   font-family: 'upgrade', sans-serif;
   font-weight: 400;
   span {
      display: block;
      font-size: 16px;
      color: ${props => (props.darkMode ? colors.dark.TITLE_INFO : colors.light.TITLE_INFO)};
   }
`

const mapStateToProps = state => ({ darkMode: state.settings.darkMode })
export default connect(mapStateToProps)(LogoSection)
