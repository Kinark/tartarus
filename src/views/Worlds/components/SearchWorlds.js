import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'

import axios from '~/instances/axios'

import { Input } from '~/components/Input'
import CustomScroll from '~/components/CustomScroll'
import SectionTitle from '~/components/SectionTitle'
import TitleInfo from '~/components/TitleInfo'
import SectionContent from '~/components/SectionContent'
import WorldLink from '~/components/WorldLink'

export default class SearchWorlds extends PureComponent {
   state = {
      search: '',
      content: [],
      loading: false,
      error: null
   }

   doTheSearch = () => {
      const { search } = this.state
      this.setState({ loading: true })
      axios
         .post('search-worlds', { search })
         .then(({ data }) => this.setState({ content: data, loading: false }))
         .catch(err => this.setState({ error: err.message, loading: false }))
   }

   handleFormSubmit = e => {
      e.preventDefault()
      this.doTheSearch()
   }

   renderWorlds = () => {
      const { content, loading, error } = this.state
      if (loading) return 'Loading'
      if (error) return 'Error'
      return content.map(world => <WorldLink data={world} key={world._id} />)
   }

   render() {
      const { search } = this.state
      return (
         <SectionContent bordered>
            <SectionTitle>Procurar mundos</SectionTitle>
            <TitleInfo>Encontre seus animops</TitleInfo>
            <form onSubmit={this.handleFormSubmit}>
               <Input placeholder="O que você procura?" value={search} onChange={e => this.setState({ search: e.target.value })} />
            </form>
            <CustomScroll>{this.renderWorlds()}</CustomScroll>
         </SectionContent>
      )
   }
}

// const mapStateToProps = state => ({ content: state.myWorlds.content, loading: state.myWorlds.loading, error: state.myWorlds.error, done: state.myWorlds.done })
// export default connect(mapStateToProps)(MyWorlds)
