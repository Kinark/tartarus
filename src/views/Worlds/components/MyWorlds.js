import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { fetchMyWorlds } from '~/redux/actions/myWorlds'

import CustomScroll from '~/components/CustomScroll'
import SectionTitle from '~/components/SectionTitle'
import TitleInfo from '~/components/TitleInfo'
import SectionContent from '~/components/SectionContent'

class MyWorlds extends PureComponent {
   static propTypes = {
      dispatch: PropTypes.func.isRequired,
      content: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
      loading: PropTypes.bool.isRequired,
      done: PropTypes.bool.isRequired,
      error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired
   }

   componentDidMount = () => {
      const { dispatch, done } = this.props
      if (!done) dispatch(fetchMyWorlds())
   }

   renderWorlds = () => {
      const { content, loading, error } = this.props
      if (loading) return 'Loading'
      if (error) return 'Error'
      return content.map(world => <div key={world._id}>{world.name}</div>)
   }

   render() {
      // const { content, loading, error } = this.props
      return (
         <SectionContent>
            <SectionTitle>Meus mundos</SectionTitle>
            <TitleInfo>Encontre seus animops</TitleInfo>
            <CustomScroll>{this.renderWorlds()}</CustomScroll>
         </SectionContent>
      )
   }
}

const mapStateToProps = state => ({ content: state.myWorlds.content, loading: state.myWorlds.loading, error: state.myWorlds.error, done: state.myWorlds.done })
export default connect(mapStateToProps)(MyWorlds)
