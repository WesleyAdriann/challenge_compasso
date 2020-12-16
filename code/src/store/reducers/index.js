import { combineReducers } from 'redux'

import pokemon from './pokemon'
import pokemonList from './pokemonList'

const reducers = combineReducers({
  pokemon,
  pokemonList
})

export default reducers
