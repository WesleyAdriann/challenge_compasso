import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

const PokemonList = ({ navigation }) => {
  const pokemonList = useSelector((state) => state.pokemonList)

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.push('pokemon')}>
        <Text>Pokemon List</Text>
        <Text>{JSON.stringify(pokemonList)}</Text>
      </TouchableOpacity>
    </View>
  )
}

PokemonList.propTypes = {
  navigation: PropTypes.object.isRequired
}

export default PokemonList
