import React from 'react'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux'

import { INITIAL_STATE } from '../../store/reducers/pokemonList' 

import PokemonList from './index'

describe('PokemonList screen', () => {
  
  test('renders correctly', () => {
    const mockStore = configureStore({})
    const store = mockStore({pokemonList: INITIAL_STATE})
  
    const push = jest.fn();
  
    const tree = renderer.create(
      <Provider store={store}>
        <PokemonList navigation={{ push }} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})

