import React from 'react'
import { create } from 'react-test-renderer'
import { LogoNormal, LogoOutline } from '~/components/Logo'

describe('Input component', () => {
   test('it shows the expected text when inserted', () => {
      const component = create(<Input />)
   })
})
