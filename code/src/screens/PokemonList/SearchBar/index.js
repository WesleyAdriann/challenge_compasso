import React from 'react'
import PropTypes from 'prop-types'

import { SearchBarWrapper, SearchInput, SearchButton } from './style'

const SearchBar = ({ handleInputChange, searchValue, handleSearchPokemon, wasSearched }) => (
  <SearchBarWrapper>
    <SearchInput
      value={searchValue}
      onChangeText={handleInputChange('searchInput')}
      placeholder='Pokemon name or number'
    />
    <SearchButton onPress={handleSearchPokemon}>
      <SearchButton.Icon wasSearched={wasSearched} />
    </SearchButton>
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
