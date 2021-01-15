import styled from 'styled-components/native'

import { COLORS, globalStyles } from '../../style'

const RoundButton = styled.TouchableOpacity`
  align-items: center;
  border-color: ${COLORS.primaryBlack};
  border-radius: 200px;
  border-width: 1px;
  elevation: 3;
  background-color: ${({ backgroundColor }) => backgroundColor || COLORS.primaryRed};
  height: 40px;
  justify-content: center;
  margin-left: 8px;
  margin-bottom: ${({ marginBottom }) => marginBottom || '0'}px;
  width: 40px;
`

RoundButton.Text = styled.Text`
  ${globalStyles.defaultFont}
  color: white;
`

RoundButton.Icon = styled.Image`
  height: 16px;
  resize-mode: cover;
  width: 16px;
`

export default RoundButton
