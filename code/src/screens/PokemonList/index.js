import React, { useEffect } from 'react'
import { Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { setPokemons, handleChangeText, setPage, setIsLoading, setGenerations } from '../../store/actions/pokemonList'
import { getPokemonsList, getGenerationsList } from '../../services/pokeAPI'
import { string } from '../../utils'

import LoadingFull from '../../components/LoadingFull'
import Loading from '../../components/Loading'

import Pokemon from './Pokemon'
import SearchBar from './SearchBar'
import { ScreenContainer, PokemonsFlatList } from './style'

let requesTimeout = 0

const PokemonList = ({ navigation }) => {
  const dispatch = useDispatch()
  const { pokemonList, page, perPage, searchInput, isLoading, generationList } = useSelector((state) => state.pokemonList)

  const requestPokemonList = (pageToRequest, more = false) => {
    if (isNaN(pageToRequest)) return

    dispatch(setIsLoading(true))
    clearTimeout(requesTimeout)
    requesTimeout = setTimeout(() => {
      getPokemonsList(pageToRequest, perPage)
        .then(({ data }) => {
          const { results } = data
          const pokemons = results.map((poke) => {
            const id = poke.url.split('pokemon/').pop().replace(/\D/g, '')
            return { ...poke, id }
          })
          dispatch(setPage(pageToRequest))
          dispatch(setPokemons(pokemons))
          dispatch(setIsLoading(false))
        })
        .catch((error) => {
          console.log('requestPokemonList error:', error)
          Alert.alert('Attention', 'There was an error loading the pokémons', [
            { text: 'Ok', onPress: () => dispatch(setIsLoading(false)) },
            { text: 'Try Again', onPress: () => requestPokemonList(pageToRequest, more) }
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
          const [genName, genNumber] = generation.name.split('-')
          const name = `${string.capitalize(genName)} ${genNumber.toUpperCase()}`
          return { ...generation, name, id }
        })
        console.log(generations)
        dispatch(setGenerations(generations))
      })
      .catch((error) => {
        console.log('requestPokemonList error:', error)
        setTimeout(requestPokemonGenerations, 5000)
      })
  }

  const requestPokemonSearch = () => {
    if (!searchInput) Alert.alert('', 'Insert Pokemon name or number')

    clearTimeout(requesTimeout)
    requesTimeout = setTimeout(() => {

    }, 500)
  }

  const handleLoadMorePokemon = () => {
    const nextPageToRequest = page + 1
    requestPokemonList(nextPageToRequest, true)
  }

  const handleInputChange = (inputName) => (text) => dispatch(handleChangeText(text, inputName))

  useEffect(() => {
    // requestPokemonList(0)
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
