import styled from 'styled-components/native'

import { globalStyles } from '../../../style'

export const PokemonContainer = styled.TouchableOpacity`
  align-items: center;
  margin: 8px 0;
  width: 33%;
`

export const PokemonImage = styled.Image`
  resize-mode: cover;
  height: 96;
  width: 96;
`;

export const PokemonName = styled.Text`
  ${globalStyles.defaultFont}
`
