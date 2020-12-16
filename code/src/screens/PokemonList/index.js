import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const PokemonList = ({ navigation }) => (
  <View>
    <TouchableOpacity onPress={() => navigation.push('pokemon')}>
      <Text>Pokemon List</Text>
    </TouchableOpacity>
  </View>
)

export default PokemonList
