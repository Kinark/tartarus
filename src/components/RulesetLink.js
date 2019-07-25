import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

// import playerPropTypes from '~/propTypes/player'
import colors from '~/constants/colors'
// import { toggleLoadingRoomModal } from '~/redux/actions/app'

class RulesetLink extends PureComponent {
   static propTypes = {
      // theme: PropTypes.string.isRequired,
      data: PropTypes.shape({
         _id: PropTypes.string.isRequired,
         name: PropTypes.string.isRequired,
         bg: PropTypes.string
      }).isRequired,
      className: PropTypes.string
   }

   static defaultProps = {
      className: ''
   }

   render() {
      const { data, className } = this.props
      const bgImg = data.pages.length ? data.pages[0].bgImg : ''
      return (
         <Ruleset to={`/ruleset/${data._id}`} style={{ backgroundImage: `url(${bgImg})` }} className={className}>
            <RulesetTitle>{data.name}</RulesetTitle>
         </Ruleset>
      )
   }
}
const mapStateToProps = state => ({ theme: state.settings.theme })
export default connect(mapStateToProps)(RulesetLink)

const Ruleset = styled(Link)`
   max-width: 445px;
   height: 200px;
   text-align: center;
   background-size: cover;
   border-radius: 8px;
   border: ${({ theme, covered }) => (covered ? 'none' : `solid 1px ${theme.TITLE}`)};
   /* color: ${({ theme, covered }) => (covered ? colors.dark.TITLE : theme.TITLE)}; */
   color: white;
   display: flex;
   justify-content: center;
   flex-direction: column;
   margin: 0 0 12px 0;
   /* padding: 8px 10px; */
   opacity: 1;
   transition: opacity 300ms;
   font-size: 14px;
   line-height: normal;
   position: relative;
   overflow: hidden;
   &::before {
      content: "";
      position: absolute;
      background-color: rgba(116, 80, 67,0.75);
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
   }
   &:hover {
      opacity: 0.6;
   }
`
Ruleset.defaultProps = { theme: colors.light }

const RulesetTitle = styled.div`
   font-family: 'upgrade', sans-serif;
   font-weight: 500;
   font-size: 22px;
   position: relative;
   z-index: 1;
`

// const FirstLine = styled.div`
//    display: flex;
//    justify-content: space-between;
// `

// const ThirdLine = styled.div`
//    font-size: 11px;
//    text-transform: uppercase;
//    display: flex;
//    justify-content: space-between;
// `
