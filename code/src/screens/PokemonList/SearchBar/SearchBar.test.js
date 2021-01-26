import React from 'react'
import renderer from 'react-test-renderer'

import SearchBar from './index'

describe('SearchBar Component', () => {
  test('renders correctly', () => {
    const props = {
      handleInputChange: jest.fn(),
      handleSearchPokemon: jest.fn()
    }

    const tree = renderer.create(<SearchBar {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
