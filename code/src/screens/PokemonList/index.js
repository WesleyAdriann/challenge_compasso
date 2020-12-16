import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'

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

export default PokemonList
