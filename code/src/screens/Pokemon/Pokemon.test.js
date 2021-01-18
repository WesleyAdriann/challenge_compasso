import React from 'react'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux'

import { INITIAL_STATE } from '../../store/reducers/pokemon' 

import Pokemon from './index'

describe('Pokemon screen', () => {
  test('renders correctly', () => {
    const mockStore = configureStore({})
    const store = mockStore({pokemon: INITIAL_STATE})

    const props = {
      navigation: {
        pop: jest.fn(),
      },
      route:  { params: { pokemonId: 1 } }
    }
  
    const tree = renderer.create(
      <Provider store={store}>
        <Pokemon {...props} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})

