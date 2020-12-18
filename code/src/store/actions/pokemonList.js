import { pokemonListTypes } from '../actionsTypes'

export const setPokemons = (pokemonList) => ({
  type: pokemonListTypes.SETPOKEMONS,
  pokemonList
})

export const setGenerations = (generationList) => ({
  type: pokemonListTypes.SETGENERATIONS,
  generationList
})

export const setSelectedGeneration = (generationId) => ({
  type: pokemonListTypes.SETSELECTEDGENERATION,
  generationId
})

export const setPage = (page) => ({
  type: pokemonListTypes.SETPAGE,
  page
})

export const handleChangeText = (text, inputName) => ({
  type: pokemonListTypes.HANDLECHANGETEXT,
  text,
  inputName
})

export const setIsLoading = (isLoading) => ({
  type: pokemonListTypes.SETISLOADING,
  isLoading
})

export const setTotalPokemons = (total) => ({
  type: pokemonListTypes.SETTOTALPOKEMONS,
  total
})

export const setWasSearched = (wasSearched) => ({
  type: pokemonListTypes.SETWASSEARCHED,
  wasSearched
})
