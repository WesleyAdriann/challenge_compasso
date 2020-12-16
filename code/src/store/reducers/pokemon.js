import { pokemonTypes } from '../actionsTypes'

const INITIAL_STATE = {
  pokemon: {}
}

const pokemon = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case pokemonTypes.SETPOKEMON:
      return {
        ...state,
        pokemon: action.pokemon
      }
    default:
      return state
  }
}

export default pokemon
