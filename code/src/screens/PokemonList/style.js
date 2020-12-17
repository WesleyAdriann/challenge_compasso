import styled from 'styled-components/native'

import { COLORS } from '../../style'

export const ScreenContainer = styled.SafeAreaView`
  background-color: ${COLORS.primatyGray};
  border-left-width: 8px;
  border-right-width: 8px;
  border-color: ${COLORS.primaryRed};
  height: 100%;
`

export const PokemonsFlatList = styled.FlatList.attrs(() => ({
  contentContainerStyle: {
    paddingBottom: 8
  }
}))`
  flex-grow: 1;
`
