import { pokemonListTypes } from '../actionsTypes'

const INITIAL_STATE = {
  pokemonList: [],
  totalPokemons: null,
  page: 0,
  perPage: 21,
  searchInput: '',
  wasSearched: false,
  generationList: [],
  selectedGeneration: 0,
  isLoading: false
}

const pokemonList = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case pokemonListTypes.SETPOKEMONS:
      return {
        ...state,
        pokemonList: action.pokemonList
      }
    case pokemonListTypes.SETPAGE:
      return {
        ...state,
        page: action.page
      }
    case pokemonListTypes.SETSELECTEDGENERATION:
      return {
        ...state,
        selectedGeneration: action.generationId
      }
    case pokemonListTypes.SETTOTALPOKEMONS:
      return {
        ...state,
        totalPokemons: action.totalPokemons
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
    case pokemonListTypes.SETGENERATIONS:
      return {
        ...state,
        generationList: action.generationList
      }
    case pokemonListTypes.SETWASSEARCHED:
      return {
        ...state,
        wasSearched: action.wasSearched
      }
    default:
      return state
  }
}

export default pokemonList
