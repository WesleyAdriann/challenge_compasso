import React from 'react'
import renderer from 'react-test-renderer'

import Section from './index'

describe('Section Component', () => {
  test('renders correctly', () => {
    const props = {
      title: 'renders correctly test'
    }

    const tree = renderer.create(<Section {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
    
  })
})
