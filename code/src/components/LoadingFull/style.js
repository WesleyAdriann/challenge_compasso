import styled from 'styled-components/native'
import { Dimensions } from 'react-native'

import { COLORS } from '../../style'

const { width, height } = Dimensions.get('window')

export const Container = styled.View`
  width: ${width}px;
  min-height: ${height}px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.grayOpacity(0.4)};
`

Container.Text = styled.Text`
  color: white;
  padding-top: 10px;
`
