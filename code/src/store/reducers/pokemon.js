import { pokemonTypes } from '../actionsTypes'

const INITIAL_STATE = {
  pokemon: {}
}

const pokemonList = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case pokemonTypes.SETPOKEMONS:
      return {
        ...state,
        pokemon: action.pokemon
      }
    default:
      return state
  }
}

export default pokemonList
