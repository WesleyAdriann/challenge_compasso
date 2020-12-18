import styled, { css } from 'styled-components/native'

import { COLORS } from '../../../style'

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
