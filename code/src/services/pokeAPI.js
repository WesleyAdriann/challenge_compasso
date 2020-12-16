import axios from 'axios'

import { ENDPOINTS } from '../settings'

const { baseURL } = ENDPOINTS.pokeApi

const pokeApi = axios.create({ baseURL })

/**
 * Route to get list of pokemons
 * @param {number | string} page - Current page
 * @param {number | string} perPage - Quantity of pokemons per page
 */
export const getPokemonsList = (page, perPage) => {
  const route = ENDPOINTS.pokeApi.list(page, perPage)

  return new Promise((resolve, reject) => {
    pokeApi.get(route)
      .then(resolve)
      .catch(reject)
  })
}

/**
 * Route to get pokemon using id
 * @param {number | string} id - Pokemon id
 */
export const getPokemon = (id) => {
  const route = ENDPOINTS.pokeApi.pokemon(id)

  return new Promise((resolve, reject) => {
    pokeApi.get(route)
      .then(resolve)
      .catch(reject)
  })
}
