import { pokemonListTypes } from '../actionsTypes'

const INITIAL_STATE = {
  pokemonList: [1, 2, 3]
}

const pokemonList = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case pokemonListTypes.SETPOKEMONS:
      return {
        ...state,
        pokemonList: [...state.pokemonsList, action.pokemonList]
      }
    default:
      return state
  }
}

export default pokemonList
