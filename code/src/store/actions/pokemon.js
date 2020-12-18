import { pokemonTypes } from '../actionsTypes'

export const setPokemon = (pokemon, specie) => ({
  type: pokemonTypes.SETPOKEMON,
  pokemon,
  specie
})

export const setEvolutions = (evolutions) => ({
  type: pokemonTypes.SETEVOLUTIONS,
  evolutions
})

export const setIsLoading = (isLoading) => ({
  type: pokemonTypes.SETISLOADING,
  isLoading
})
