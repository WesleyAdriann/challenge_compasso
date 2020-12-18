/**
 * Endpoints used in application
 */
export const ENDPOINTS = {
  pokeApi: {
    BASE_URL: 'https://pokeapi.co/api/v2',
    list: (page, perPage) => `/pokemon/?offset=${page * perPage}&limit=${perPage}`,
    pokemon: (id) => `/pokemon/${id}`,
    pokemonSpecie: (id) => `/pokemon-species/${id}`,
    generations: (id) => `/generation/${id}`,
    evolutions: (id) => `/evolution-chain/${id}`
  }
}
