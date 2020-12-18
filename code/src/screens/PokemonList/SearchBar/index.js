import React from 'react'
import PropTypes from 'prop-types'

import { SearchBarWrapper, SearchInput, SearchButton } from './style'

const SearchBar = ({ handleInputChange, searchValue = '', handlePressSearchPokemon }) => (
  <SearchBarWrapper>
    <SearchInput
      value={searchValue}
      onChangeText={handleInputChange('searchInput')}
      placeholder='Pokemon name or number'
    />
    <SearchButton onPress={handlePressSearchPokemon}>
      <SearchButton.Icon />
    </SearchButton>
  </SearchBarWrapper>
)

SearchBar.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  searchValue: PropTypes.string,
  handlePressSearchPokemon: PropTypes.func.isRequired
}

export default SearchBar
