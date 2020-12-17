import styled from 'styled-components/native'

import {COLORS} from '../../style'

export const ScreenContainer = styled.SafeAreaView`
  background-color: ${COLORS.primatyGray};
  flex-grow: 1;
  border-left-width: 8px;
  border-right-width: 8px;
  border-color: ${COLORS.primaryRed};
`

export const PokemonsFlatList = styled.FlatList.attrs(() => ({
  contentContainerStyle: {
    paddingVertical: 8
  },
}))``
