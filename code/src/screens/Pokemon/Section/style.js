import styled from 'styled-components/native'

import { COLORS, globalStyles } from '../../../style'

export const Container = styled.View`
  padding: 8px 8px 16px;
  border-bottom-width: 1px;
  border-color: ${COLORS.primaryRed};
`

export const Title = styled.Text`
  ${globalStyles.defaultFont}
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 6px;
`

export const Text = styled.Text`
  ${globalStyles.defaultFont}
`
