import React from 'react'
import PropTypes from 'prop-types'

import { SearchBarWrapper, SearchInput, SearchButton } from './style'

const SearchBar = ({ handleInputChange, searchValue = '' }) => (
  <SearchBarWrapper>
    <SearchInput
      value={searchValue}
      onChangeText={handleInputChange('searchInput')}
      placeholder="Pokemon name or number"
    />
    <SearchButton>
      <SearchButton.Icon />
    </SearchButton>
  </SearchBarWrapper>
)

SearchBar.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  searchValue: PropTypes.string
}

export default SearchBar
