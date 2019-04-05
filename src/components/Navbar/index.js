import React, { PureComponent } from 'react'

import LogoSection from './components/LogoSection'
import Account from './components/Account'
import Tabs from './components/Tabs'

export default class index extends PureComponent {
  render() {
    return (
      <nav>
        <LogoSection />
        {/* <Account /> */}
        {/* <Tabs /> */}
      </nav>
    )
  }
}
