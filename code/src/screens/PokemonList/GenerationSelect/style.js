import styled from 'styled-components/native'

import { COLORS, globalStyles } from '../../../style'

export const GenerationSelectWrapper = styled.View`
  margin: 0 8px 8px;
`

export const Label = styled.Text`
  ${globalStyles.defaultFont}
  color: ${COLORS.primaryBlack};
  font-size: 12px;
  margin-bottom: 2px;
  text-align: center;
`

export const OptionsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`
