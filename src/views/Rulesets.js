import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { fetchMyRulesets } from '~/redux/actions/myRulesets'

import AppMainWrapper from '~/components/AppMainWrapper'
// import FullHeight from '~/components/FullHeight'
import RulesetLink from '~/components/RulesetLink'
import SectionContent from '~/components/SectionContent'
import SectionTitle from '~/components/SectionTitle'
import TitleInfo from '~/components/TitleInfo'

class Rulesets extends PureComponent {
   static propTypes = {
      dispatch: PropTypes.func.isRequired,
      content: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
      loading: PropTypes.bool.isRequired,
      done: PropTypes.bool.isRequired,
      error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired
   }

   componentDidMount() {
      const { dispatch, done } = this.props
      if (!done) dispatch(fetchMyRulesets())
   }

   renderRulesets = () => {
      const { content, loading, error } = this.props
      if (loading) return 'Loading'
      if (error) return 'Error'
      return content.map(ruleset => <RulesetLink data={ruleset} key={ruleset._id} />)
   }

   render() {
      return (
         <AppMainWrapper>
            <SectionContent>
            <SectionTitle>Seus sistemas</SectionTitle>
            <TitleInfo>É só clicar e editar!</TitleInfo>
            {this.renderRulesets()}
            </SectionContent>
         </AppMainWrapper>
      )
   }
}

const mapStateToProps = state => ({ content: state.myRulesets.content, loading: state.myRulesets.loading, error: state.myRulesets.error, done: state.myRulesets.done })
export default connect(mapStateToProps)(Rulesets)
