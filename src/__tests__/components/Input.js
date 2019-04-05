import React from 'react'
import { create } from 'react-test-renderer'
import Input from '~/components/Input'

describe('Input component', () => {
   test('it shows the expected text when inserted', () => {
      const component = create(<Input />)
   })
})
