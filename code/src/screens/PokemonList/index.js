import React, { useEffect } from 'react'
import { Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { setPokemons } from '../../store/actions/pokemonList'

import { getPokemonsList } from '../../services/pokeAPI'

import { ScreenContainer, PokemonsFlatList } from './style'
import Pokemon from './Pokemon'

const PokemonList = ({ navigation }) => {
  const dispatch = useDispatch()
  const { pokemonList, page, perPage } = useSelector((state) => state.pokemonList)

  const requestPokemonList = () => {
    getPokemonsList(page, perPage)
      .then(({data}) => {
        const {results} = data
        const pokemons = results.map((poke) => {
          const id = poke.url.split('pokemon/').pop().replace(/\D/g, '');
          return { ...poke, id };
        })
        dispatch(setPokemons(pokemons))
      })
      .catch((error) => {
        console.log('requestPokemonList error:', error)
      })
  }

  useEffect(() => {
    requestPokemonList()
  }, [])

  return (
    <ScreenContainer>
      <PokemonsFlatList
        data={pokemonList}
        numColumns={3}
        renderItem={({item}) => <Pokemon key={item.id} id={item.id} name={item.name} /> }
      />
    </ScreenContainer>
  )
}

PokemonList.propTypes = {
  navigation: PropTypes.object.isRequired
}

export default PokemonList
