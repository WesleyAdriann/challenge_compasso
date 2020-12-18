import React, { useEffect } from 'react'
import { Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import {
  setPokemons,
  handleChangeText,
  setPage,
  setIsLoading,
  setGenerations,
  setTotalPokemons,
  setSelectedGeneration,
  setWasSearched
} from '../../store/actions/pokemonList'
import { getPokemonsList, getGenerationsList, getPokemon } from '../../services/pokeAPI'
import { ROUTES } from '../../settings'

import LoadingFull from '../../components/LoadingFull'
import Loading from '../../components/Loading'

import Pokemon from './Pokemon'
import SearchBar from './SearchBar'
import GenerationSelect from './GenerationSelect'
import { ScreenContainer, PokemonsFlatList } from './style'

let requesTimeout = 0

const PokemonList = ({ navigation }) => {
  const dispatch = useDispatch()
  const {
    pokemonList,
    page,
    perPage,
    searchInput,
    isLoading,
    generationList,
    selectedGeneration,
    totalPokemons,
    wasSearched
  } = useSelector((state) => state.pokemonList)

  /**
   * Function to request pokemon list and set in redux store
   * @param {number} pageToRequest - Page to search
   */
  const requestPokemonList = (pageToRequest) => {
    if (isNaN(pageToRequest)) return
    dispatch(setIsLoading(true))
    clearTimeout(requesTimeout)
    requesTimeout = setTimeout(() => {
      getPokemonsList(pageToRequest, perPage)
        .then(({ data }) => {
          const { results } = data
          let pokemons = results.map((poke) => {
            const id = poke.url.split('pokemon/').pop().replace(/\D/g, '')
            return { ...poke, id }
          })

          // concat pokemons
          if (pageToRequest) pokemons = [...pokemonList, ...pokemons]

          dispatch(setPokemons(pokemons))
          dispatch(setPage(pageToRequest))
          dispatch(setIsLoading(false))
          if (!totalPokemons) dispatch(setTotalPokemons(data.count))
          if (selectedGeneration) dispatch(setSelectedGeneration(0))
        })
        .catch((error) => {
          console.log('requestPokemonList error:', error)
          Alert.alert('Attention', 'There was an error loading the pokémons', [
            { text: 'Ok', onPress: () => dispatch(setIsLoading(false)) },
            { text: 'Try Again', onPress: () => requestPokemonList(pageToRequest) }
          ])
        })
    }, 500)
  }

  /**
   * Request to get list of pokemons generations
   */
  const requestPokemonGenerations = () => {
    if (generationList.length) return
    getGenerationsList()
      .then(({ data }) => {
        const { results } = data
        const generations = results.map((generation) => {
          const id = generation.url.split('generation/').pop().replace(/\D/g, '')
          return { ...generation, id }
        })
        dispatch(setGenerations(generations))
      })
      .catch((error) => {
        console.log('requestPokemonList error:', error)
        setTimeout(requestPokemonGenerations, 5000)
      })
  }

  /**
   * Request to get pokemons from one generation
   * @param {number} generationId - Id of pokemon generation
   */
  const requestPokemonsFromGeneration = (generationId) => {
    dispatch(setIsLoading(true))
    clearTimeout(requesTimeout)
    requesTimeout = setTimeout(() => {
      getGenerationsList(generationId)
        .then(({ data }) => {
          const { pokemon_species: results } = data
          const pokemons = results
            .map((poke) => {
              const id = poke.url.split('pokemon-species/').pop().replace(/\D/g, '')
              return { ...poke, id }
            })
            .sort(({ id: pokeAId }, { id: pokeBId }) => pokeAId - pokeBId)
          dispatch(setPokemons(pokemons))
          dispatch(setPage(0))
          dispatch(setSelectedGeneration(generationId))
          dispatch(setIsLoading(false))
        })
        .catch((error) => {
          console.log('requestPokemonsFromGeneration error:', error)
          Alert.alert('Attention', 'There was an error loading the pokémons', [
            { text: 'Ok', onPress: () => dispatch(setIsLoading(false)) },
            { text: 'Try Again', onPress: () => requestPokemonsFromGeneration(generationId) }
          ])
        })
    }, 500)
  }

  /**
   * Request to search pokemon using name or number
   */
  const requestPokemonSearch = () => {
    dispatch(setIsLoading(true))
    clearTimeout(requesTimeout)
    requesTimeout = setTimeout(() => {
      getPokemon(searchInput)
        .then(({ data }) => {
          const pokemon = {
            id: data.id,
            name: data.name
          }
          dispatch(setPokemons([pokemon]))
          dispatch(setPage(0))
          dispatch(setWasSearched(true))
          dispatch(setIsLoading(false))
        })
        .catch((error) => {
          console.log('requestPokemonsFromGeneration error:', error)
          if (error.response.status === 404) {
            Alert.alert('Attention', 'Pokemon not finded', [
              {
                text: 'Ok',
                onPress: () => {
                  dispatch(setIsLoading(false))
                  requestPokemonList(0)
                }
              }
            ])
          }
        })
    }, 500)
  }

  /**
   * Handler to load more pokemons in infinity scroll
   */
  const handleLoadMorePokemon = () => {
    if (selectedGeneration) return
    if (wasSearched) return
    if (page * perPage >= totalPokemons) return Alert.alert('Attention', 'All pokemons are loaded')

    const nextPageToRequest = page + 1
    requestPokemonList(nextPageToRequest)
  }

  /**
   * Handler to manipulate to get or clear pokemons from generation
   * @param {number} generationId - Id of pokemon generation
   */
  const handleSelectGeneration = (generationId) => {
    dispatch(setPokemons([]))

    if (generationId === selectedGeneration) {
      dispatch(setSelectedGeneration(0))
      requestPokemonList(0)
      return
    }

    dispatch(setWasSearched(false))
    requestPokemonsFromGeneration(generationId)
  }

  /**
   * Handler to manipulate search pokemons or clear search
   */
  const handleSearchPokemon = () => {
    if (!searchInput && !wasSearched) return Alert.alert('', 'Insert Pokemon name or number')

    dispatch(setSelectedGeneration(0))
    dispatch(setPokemons([]))
    if (wasSearched) {
      dispatch(setWasSearched(false))
      handleInputChange('searchInput')('')
      requestPokemonList(0)
      return
    }

    requestPokemonSearch()
  }

  /**
   * Handler to text input
   * @param {string} inputName - Name of input to manipulate in store
   * @param {string} text - Text from input event
   */
  const handleInputChange = (inputName) => (text) => dispatch(handleChangeText(text, inputName))

  /**
   * Handler to navigate to pokemon selected
   * @param {number | string} pokemonId - Id from pokemon
   */
  const handlePushToPokemon = (pokemonId) => () => navigation.push(ROUTES.pokemon, { pokemonId })

  useEffect(() => {
    requestPokemonList(0)
    requestPokemonGenerations()
  }, [])

  return (
    <ScreenContainer>
      <LoadingFull visible={!pokemonList.length && isLoading} />
      <SearchBar
        handleInputChange={handleInputChange}
        searchValue={searchInput}
        handleSearchPokemon={handleSearchPokemon}
        wasSearched={wasSearched}
      />
      <GenerationSelect
        generations={generationList}
        handleSelectGeneration={handleSelectGeneration}
        selected={selectedGeneration}
      />
      <PokemonsFlatList
        data={pokemonList}
        numColumns={3}
        renderItem={({ item, index }) => <Pokemon key={`${index}-${item.id}`} id={item.id} name={item.name} handlePushToPokemon={handlePushToPokemon(item.id)} /> }
        onEndReached={handleLoadMorePokemon}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => <Loading visible={!!pokemonList.length && isLoading} /> }
      />
    </ScreenContainer>
  )
}

PokemonList.propTypes = {
  navigation: PropTypes.object.isRequired
}

export default PokemonList
