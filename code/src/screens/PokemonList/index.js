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
  setSelectedGeneration
} from '../../store/actions/pokemonList'
import { getPokemonsList, getGenerationsList } from '../../services/pokeAPI'

import LoadingFull from '../../components/LoadingFull'
import Loading from '../../components/Loading'

import Pokemon from './Pokemon'
import SearchBar from './SearchBar'
import GenerationSelect from './GenerationSelect'
import { ScreenContainer, PokemonsFlatList } from './style'

let requesTimeout = 0

const PokemonList = ({ navigation }) => {
  const dispatch = useDispatch()
  const { pokemonList, page, perPage, searchInput, isLoading, generationList, selectedGeneration, totalPokemons } = useSelector((state) => state.pokemonList)

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
          if (pageToRequest) {
            pokemons = [...pokemonList, ...pokemons]
          }

          dispatch(setPokemons(pokemons))
          dispatch(setPage(pageToRequest))
          dispatch(setIsLoading(false))
          if (!totalPokemons) dispatch(setTotalPokemons(data.count))
          if (selectedGeneration) dispatch(setSelectedGeneration(null))
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

  const requestPokemonsFromGeneration = (generationId) => {
    dispatch(setIsLoading(true))
    clearTimeout(requesTimeout)
    requesTimeout = setTimeout(() => {
      getGenerationsList(generationId)
        .then(({ data }) => {
          const { pokemon_species: results } = data
          const pokemons = results.map((poke) => {
            const id = poke.url.split('pokemon-species/').pop().replace(/\D/g, '')
            return { ...poke, id }
          })
          dispatch(setPokemons(pokemons))
          dispatch(setPage(0))
          dispatch(setSelectedGeneration(generationId))
          dispatch(setIsLoading(false))
        })
    }, 500)
  }

  const requestPokemonSearch = () => {
    if (!searchInput) Alert.alert('', 'Insert Pokemon name or number')

    clearTimeout(requesTimeout)
    requesTimeout = setTimeout(() => {

    }, 500)
  }

  const handleLoadMorePokemon = () => {
    if (selectedGeneration) return

    if (page * perPage >= totalPokemons) return Alert.alert('Attention', 'All pokemons are loaded')

    const nextPageToRequest = page + 1
    requestPokemonList(nextPageToRequest)
  }

  const handleSelectGeneration = (generationId) => {
    dispatch(setPokemons([]))

    if (generationId === selectedGeneration) {
      dispatch(setSelectedGeneration(0))
      requestPokemonList(0)
      return
    }

    requestPokemonsFromGeneration(generationId)
  }

  const handleInputChange = (inputName) => (text) => dispatch(handleChangeText(text, inputName))

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
        handlePressSearchPokemon={requestPokemonSearch}
      />
      <GenerationSelect
        generations={generationList}
        handleSelectGeneration={handleSelectGeneration}
        selected={selectedGeneration}
      />
      <PokemonsFlatList
        data={pokemonList}
        numColumns={3}
        renderItem={({ item, index }) => <Pokemon key={`${index}-${item.id}`} id={item.id} name={item.name} /> }
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
