import { pokemonListTypes } from '../actionsTypes'

export const setPokemons = (pokemons) => ({
  action: pokemonListTypes.SETPOKEMONS,
  pokemons
})
