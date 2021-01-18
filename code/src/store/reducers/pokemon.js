import { pokemonTypes } from '../actionsTypes'

export const INITIAL_STATE = {
  pokemon: {},
  specie: {},
  evolutions: [],
  isLoading: false
}

const pokemon = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case pokemonTypes.SETPOKEMON:
      return {
        ...state,
        pokemon: action.pokemon,
        specie: action.specie
      }
    case pokemonTypes.SETEVOLUTIONS:
      return {
        ...state,
        evolutions: action.evolutions
      }
    case pokemonTypes.SETISLOADING:
      return {
        ...state,
        isLoading: action.isLoading
      }
    default:
      return state
  }
}

export default pokemon
