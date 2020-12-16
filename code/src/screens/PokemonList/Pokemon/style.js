import styled from 'styled-components/native'

import { globalStyles } from '../../../style'

export const PokemonContainer = styled.TouchableOpacity`
  align-items: center;
  border-color: red;
  border-radius: 8px;
  border-width: 1px;
  margin: 8px;
  flex-grow: 1;
`

export const PokemonImage = styled.Image`
  resize-mode: cover;
  height: 96;
  width: 96;
`;

export const PokemonName = styled.Text`
  ${globalStyles.defaultFont}
`
