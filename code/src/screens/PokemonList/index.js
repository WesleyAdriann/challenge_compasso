import React, { useEffect } from 'react'
import { Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { setPokemons, handleChangeText, setPage, setIsLoading } from '../../store/actions/pokemonList'

import { getPokemonsList } from '../../services/pokeAPI'

import LoadingFull from '../../components/LoadingFull'

import Pokemon from './Pokemon'
import SearchBar from './SearchBar'
import { ScreenContainer, PokemonsFlatList } from './style'

let requesTimeout = 0

const PokemonList = ({ navigation }) => {
  const dispatch = useDispatch()
  const { pokemonList, page, perPage, searchInput, isLoading } = useSelector((state) => state.pokemonList)

  const requestPokemonList = (pageToRequest, more = false) => {
    if (isNaN(pageToRequest)) return

    dispatch(setIsLoading(true))
    clearTimeout(requesTimeout)
    requesTimeout = setTimeout(() => {
      console.log('request')
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

  const handleLoadMorePokemon = () => {
    const nextPageToRequest = page + 1
    requestPokemonList(nextPageToRequest, true)
  }

  const handleInputChange = (inputName) => (text) => dispatch(handleChangeText(text, inputName))

  useEffect(() => {
    requestPokemonList(0)
  }, [])

  return (
    <ScreenContainer>
      <LoadingFull visible={isLoading} />
      <SearchBar
        handleInputChange={handleInputChange}
        searchValue={searchInput}
      />
      <PokemonsFlatList
        data={pokemonList}
        numColumns={3}
        renderItem={({ item, index }) => <Pokemon key={`${index}-${item.id}`} id={item.id} name={item.name} /> }
        onEndReached={handleLoadMorePokemon}
        onEndReachedThreshold={1}
      />
    </ScreenContainer>
  )
}

PokemonList.propTypes = {
  navigation: PropTypes.object.isRequired
}

export default PokemonList
