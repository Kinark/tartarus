import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import playerPropTypes from '~/propTypes/player'
import { addWorldSubTab } from '~/redux/actions/app'

class Sheet extends PureComponent {
   static propTypes = {
      dispatch: PropTypes.func.isRequired,
      tabs: PropTypes.arrayOf(
         PropTypes.shape({
            members: PropTypes.arrayOf(PropTypes.shape(playerPropTypes)).isRequired
         })
      ).isRequired,
      subTabs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
      match: PropTypes.shape({
         params: PropTypes.shape({
            worldId: PropTypes.string.isRequired,
            sheetId: PropTypes.string.isRequired
         }).isRequired
      }).isRequired
   }

   componentDidMount() {
      const { subTabs, match } = this.props
      if (!subTabs.find(subTab => subTab._id === match.params.sheetId)) this.addTab()
   }

   componentDidUpdate(prevProps) {
      const { tabs } = this.props
      if (JSON.stringify(prevProps.tabs) === JSON.stringify(tabs)) return
      this.addTab()
   }

   addTab = () => {
      const { dispatch, tabs, match } = this.props
      if (!tabs.length) return
      const { name } = tabs
         .find(tab => tab._id === match.params.worldId)
         .members.find(member => member.characters.find(char => char._id === match.params.sheetId))
         .characters.find(char => char._id === match.params.sheetId)
      dispatch(addWorldSubTab({ worldId: match.params.worldId, _id: match.params.sheetId, name, path: `sheet/${match.params.sheetId}` }))
   }

   render() {
      return <div>Ficha</div>
   }
}
const mapStateToProps = state => ({ tabs: state.app.tabs, subTabs: state.app.subTabs })
export default connect(mapStateToProps)(Sheet)
