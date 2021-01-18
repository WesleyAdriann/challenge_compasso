import React from 'react'
import renderer from 'react-test-renderer'

import GenerationSelect from './index'

describe('GenerationSelect Component', () => {
  test('renders correctly', () => {
    const props = {
      selected: 0,
      handleSelectGeneration: jest.fn(),
      generations: [],
    }

    const tree = renderer.create(<GenerationSelect {...props}/>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
