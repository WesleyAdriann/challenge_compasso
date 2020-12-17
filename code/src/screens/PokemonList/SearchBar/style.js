import styled, { css } from 'styled-components/native'

import { COLORS, IMAGES } from '../../../style'

export const SearchBarWrapper = styled.View`
  flex-direction: row;
  height: 48px;
  margin: 4px 0;
  padding: 4px 8px;
`

const defaultStyle = css`
  border-color: ${COLORS.primaryBlack};
  border-radius: 200px;
  border-width: 1px;
  elevation: 3;
`

export const SearchInput = styled.TextInput`
  ${defaultStyle}
  background-color: white;
  flex-grow: 1;
  padding: 8px 12px;
`

export const SearchButton = styled.TouchableOpacity`
  ${defaultStyle}
  align-items: center;
  background-color: ${COLORS.primaryRed};
  justify-content: center;
  margin-left: 8px;
  width: 40px;
`

SearchButton.Icon = styled.Image.attrs(({ wasSearched }) => ({
  source: wasSearched ? IMAGES.icons.cancelIcon : IMAGES.icons.searchIcon
}))`
  height: 16px;
  width: 16px;
`
