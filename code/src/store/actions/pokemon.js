import { pokemonTypes } from '../actionsTypes'

export const setPokemon = (pokemon) => ({
  action: pokemonTypes.SETPOKEMON,
  pokemon
})
