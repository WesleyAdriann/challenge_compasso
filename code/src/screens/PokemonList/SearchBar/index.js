import React from 'react'
import PropTypes from 'prop-types'

import { IMAGES } from '../../../style'

import RoundButton from '../../../components/RoundButton'

import { SearchBarWrapper, SearchInput } from './style'

const SearchBar = ({ handleInputChange, searchValue, handleSearchPokemon, wasSearched }) => (
  <SearchBarWrapper>
    <SearchInput
      value={searchValue}
      onChangeText={handleInputChange('searchInput')}
      placeholder='Pokemon name or number'
    />
    <RoundButton onPress={handleSearchPokemon}>
      <RoundButton.Icon source={wasSearched ? IMAGES.icons.cancelIcon : IMAGES.icons.searchIcon} />
    </RoundButton>
  </SearchBarWrapper>
)

SearchBar.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  searchValue: PropTypes.string,
  handleSearchPokemon: PropTypes.func.isRequired,
  wasSearched: PropTypes.bool
}

SearchBar.defaultProps = {
  searchValue: '',
  wasSearched: false
}

export default SearchBar
