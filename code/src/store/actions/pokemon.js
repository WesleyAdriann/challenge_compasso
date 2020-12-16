import { pokemonTypes } from '../actionsTypes'

export const setPokemon = (pokemon) => ({
  type: pokemonTypes.SETPOKEMON,
  pokemon
})
