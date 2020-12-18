import axios from 'axios'

import { ENDPOINTS } from '../settings'

const { BASE_URL: baseURL } = ENDPOINTS.pokeApi

const pokeApi = axios.create({ baseURL })

/**
 * Request to get list of pokemons
 * @param {number | string} page - Current page
 * @param {number | string} perPage - Quantity of pokemons per page
 */
export const getPokemonsList = (page, perPage) => {
  const route = ENDPOINTS.pokeApi.list(page, perPage)

  return new Promise((resolve, reject) => {
    pokeApi.get(route)
      .then(resolve)
      .catch((error) => {
        console.log(`Error in getPokemonsList: \n${error}\n ${error.response}\n ${error.message}`)
        reject(error)
      })
  })
}

/**
 * Request to get pokemon using id
 * @param {number | string} id - Pokemon id or name
 */
export const getPokemon = (id) => {
  const route = ENDPOINTS.pokeApi.pokemon(id)

  return new Promise((resolve, reject) => {
    pokeApi.get(route)
      .then(resolve)
      .catch((error) => {
        console.log(`Error in getPokemon: \n${error}\n ${JSON.stringify(error.response)}\n ${error.message}`)
        reject(error)
      })
  })
}

/**
 * Request to get pokemon specie details
 * @param {number | string} id - Pokemon id or name
 */
export const getPokemonSpecie = (id) => {
  const route = ENDPOINTS.pokeApi.pokemonSpecie(id)

  return new Promise((resolve, reject) => {
    pokeApi.get(route)
      .then((resolve))
      .catch((error) => {
        console.log(`Error in getPokemonSpecie: \n${error}\n ${error.response}\n ${error.message}`)
        reject(error)
      })
  })
}

/**
 * Request to get all pokemon generation or only one generation
 * @param {number | string} generationId - Pokemon generation id
 */
export const getGenerationsList = (generationId = '') => {
  const route = ENDPOINTS.pokeApi.generations(generationId)

  return new Promise((resolve, reject) => {
    pokeApi.get(route)
      .then(resolve)
      .catch((error) => {
        console.log(`Error in getGenerationsList: \n${error}\n ${error.response}\n ${error.message}`)
        reject(error)
      })
  })
}

/**
 * Request to get evolution chain of pokemon
 * @param {number} evolutionChainId - Evolution Chain id
 */
export const getPokemonEvolutionChain = (evolutionChainId) => {
  const route = ENDPOINTS.pokeApi.evolutions(evolutionChainId)

  return new Promise((resolve, reject) => {
    pokeApi.get(route)
      .then(resolve)
      .catch((error) => {
        console.log(`Error in getPokemonEvolutionChain: \n${error}\n ${error.response}\n ${error.message}`)
        reject(error)
      })
  })
}
