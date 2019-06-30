import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom'
import styled from 'styled-components'

import colors from '~/constants/colors'
import { toggleLoadingRoomModal } from '~/redux/actions/app'

class WorldLink extends PureComponent {
   static propTypes = {
      dispatch: PropTypes.func.isRequired,
      data: PropTypes.shape({
         _id: PropTypes.string.isRequired,
         name: PropTypes.string.isRequired,
         description: PropTypes.string,
         members: PropTypes.arrayOf(PropTypes.string).isRequired,
         ruleset: PropTypes.string
      }).isRequired,
      className: PropTypes.string
   }

   static defaultProps = {
      className: ''
   }

   clickHandler = e => {
      const { dispatch, data } = this.props
      dispatch(toggleLoadingRoomModal(data._id))

      e.preventDefault()
   }

   render() {
      const { data, className } = this.props
      return (
         <World onClick={this.clickHandler} href={`/world/${data._id}`} className={className}>
            <WorldTitle>{data.name}</WorldTitle>
            {!!data.description && <OverflowText>{data.description}</OverflowText>}
            <WorldMembers>
               <div>{data.members.length} MEMBROS</div>
               {!!data.ruleset && <div>{data.ruleset}</div>}
            </WorldMembers>
         </World>
      )
   }
}
export default connect()(WorldLink)

const World = styled.a`
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
World.defaultProps = { theme: colors.light }

const OverflowText = styled.div`
   white-space: nowrap;
   text-overflow: ellipsis;
   overflow: hidden;
`

const WorldTitle = styled(OverflowText)`
   font-family: 'upgrade', sans-serif;
   font-weight: 500;
   font-size: 17px;
`

const WorldMembers = styled.div`
   font-size: 11px;
   text-transform: uppercase;
   display: flex;
   justify-content: space-between;
`
