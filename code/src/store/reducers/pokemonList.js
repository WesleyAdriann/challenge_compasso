import { pokemonListTypes } from '../actionsTypes'

const INITIAL_STATE = {
  pokemonList: [],
  page: 0,
  perPage: 21,
  searchInput: '',
  cache: {
    PokemonList: [],
    page: 0
  },
  isLoading: false
}

const pokemonList = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case pokemonListTypes.SETPOKEMONS:
      return {
        ...state,
        pokemonList: [...state.pokemonList, ...action.pokemonList]
      }
    case pokemonListTypes.SETPAGE:
      return {
        ...state,
        page: action.page
      }
    case pokemonListTypes.SETPERPAGE:
      return {
        ...state,
        perPage: action.perPage
      }
    case pokemonListTypes.HANDLECHANGETEXT:
      return {
        ...state,
        [action.inputName]: action.text
      }
    case pokemonListTypes.SETISLOADING:
      return {
        ...state,
        isLoading: action.isLoading
      }
    default:
      return state
  }
}

export default pokemonList
