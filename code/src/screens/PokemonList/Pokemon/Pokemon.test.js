import React from 'react'
import renderer from 'react-test-renderer'

import Pokemon from './index'

describe('Pokemon Component', () => {
  test('renders correctly', () => {
    const props = {
      id: 1,
      name: 'bulbasaur',
      handlePushToPokemon: jest.fn()
    }

    const tree = renderer.create(<Pokemon {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
