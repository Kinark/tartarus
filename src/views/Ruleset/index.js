import React, { PureComponent } from 'react'

// import AppMainWrapper from '~/components/AppMainWrapper'
// import FullHeight from '~/components/FullHeight'

import RulesetEditor from './components/RulesetEditor';

export default class Ruleset extends PureComponent {
   render() {
      return <RulesetEditor rulesetId="abc" />
   }
}
