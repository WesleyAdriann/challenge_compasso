import React from 'react'
import { Text } from 'react-native'
import PropTypes from 'prop-types'

import { string } from '../../../utils'

import { PokemonContainer, PokemonImage, PokemonName } from './style'

const Pokemon = ({ id, name }) => (
  <PokemonContainer>
    <PokemonImage
      source={{
        uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
      }}
    />
    <PokemonName>{string.capitalize(name)}</PokemonName>
  </PokemonContainer>
)

Pokemon.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired
}

export default Pokemon
