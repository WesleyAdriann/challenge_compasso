import { pokemonTypes } from '../actionsTypes'

const INITIAL_STATE = {
  pokemon: {},
  specie: {},
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
