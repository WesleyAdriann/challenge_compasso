import { pokemonListTypes } from '../actionsTypes'

export const setPokemons = (pokemonList) => ({
  type: pokemonListTypes.SETPOKEMONS,
  pokemonList
})
