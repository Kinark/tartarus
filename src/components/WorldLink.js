import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import colors from '~/constants/colors'

export default class WorldLink extends PureComponent {
   static propTypes = {
      data: PropTypes.shape({
         _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        members: PropTypes.arrayOf(PropTypes.string).isRequired,
        ruleset: PropTypes.string,
      }).isRequired,
   }

   render() {
      const { data } = this.props
      return (
         <World to={`/world/${data._id}`}>
            <WorldTitle>{data.name}</WorldTitle>
            {!!data.description && <div>{data.description}</div>}
            <WorldMembers>
               <div>{data.members.length} MEMBROS</div>
               {!!data.ruleset && <div>{data.ruleset}</div>}
            </WorldMembers>
         </World>
      )
   }
}

const World = styled(Link)`
   max-width: 445px;
   border-radius: 8px;
   border: ${({ theme, covered }) => (covered ? 'none' : `solid 1px ${theme.TITLE}`)};
   color: ${({ theme, covered }) => (covered ? colors.dark.TITLE : theme.TITLE)};
   height: 75px;
   display: flex;
   justify-content: space-between;
   flex-direction: column;
   margin: 0 12px 12px 0;
   padding: 8px 10px;
   opacity: 1;
   font-size: 17px;
   transition: opacity 300ms;
   &:hover {
      opacity: 0.6;
   }
`
World.defaultProps = { theme: colors.light }

const WorldTitle = styled.div`
   font-family: 'upgrade', sans-serif;
   font-weight: 500;
`

const WorldMembers = styled.div`
   font-size: 11px;
   text-transform: uppercase;
   display: flex;
`
