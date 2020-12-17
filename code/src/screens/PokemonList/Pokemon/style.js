import styled from 'styled-components/native'

import { globalStyles, COLORS } from '../../../style'

export const PokemonContainer = styled.TouchableOpacity`
  align-items: center;
  background-color: white;
  border-radius: 8px;
  margin: 8px;
  flex-grow: 1;
  elevation: 3;
  padding: 4px 0;
`

export const PokemonNumber = styled.Text`
  ${globalStyles.defaultFont}
  color: ${COLORS.primaryBlack};
  opacity: .6;
`

export const PokemonImage = styled.Image`
  resize-mode: cover;
  height: 96px;
  width: 96px;
`

export const PokemonName = styled.Text`
  ${globalStyles.defaultFont}
  color: ${COLORS.primaryBlack}
`
