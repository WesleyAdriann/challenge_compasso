import React from 'react'
import PropTypes from 'prop-types'

import { string } from '../../../utils'

import { PokemonContainer, PokemonNumber, PokemonImage, PokemonName } from './style'

const Pokemon = ({ id, name }) => (
  <PokemonContainer>
    <PokemonNumber>
      #{String(id).padStart(4, '0')}
    </PokemonNumber>
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
