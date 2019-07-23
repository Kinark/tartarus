import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

// import playerPropTypes from '~/propTypes/player'
import colors from '~/constants/colors'
// import { toggleLoadingRoomModal } from '~/redux/actions/app'

class WorldLink extends PureComponent {
   static propTypes = {
      // theme: PropTypes.string.isRequired,
      data: PropTypes.shape({
         _id: PropTypes.string.isRequired,
         name: PropTypes.string.isRequired,
         bg: PropTypes.string,
      }).isRequired,
      className: PropTypes.string
   }

   static defaultProps = {
      className: ''
   }

   render() {
      const { data, className } = this.props
      return (
         <Ruleset to={`/ruleset/${data._id}`} style={{ backgroundImage: `url(${data.bg})` }} className={className}>
            <RulesetTitle>{data.name}</RulesetTitle>
         </Ruleset>
      )
   }
}
const mapStateToProps = state => ({ theme: state.settings.theme })
export default connect(mapStateToProps)(WorldLink)

const Ruleset = styled(Link)`
   max-width: 445px;
   border-radius: 8px;
   border: ${({ theme, covered }) => (covered ? 'none' : `solid 1px ${theme.TITLE}`)};
   color: ${({ theme, covered }) => (covered ? colors.dark.TITLE : theme.TITLE)};
   height: 75px;
   display: flex;
   justify-content: space-between;
   flex-direction: column;
   margin: 0 0 12px 0;
   padding: 8px 10px;
   opacity: 1;
   transition: opacity 300ms;
   font-size: 14px;
   line-height: normal;
   &:hover {
      opacity: 0.6;
   }
`
Ruleset.defaultProps = { theme: colors.light }

const OverflowText = styled.div`
   white-space: nowrap;
   text-overflow: ellipsis;
   overflow: hidden;
`

const RulesetTitle = styled(OverflowText)`
   font-family: 'upgrade', sans-serif;
   font-weight: 500;
   font-size: 17px;
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
