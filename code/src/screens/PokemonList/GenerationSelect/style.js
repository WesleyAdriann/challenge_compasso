import styled from 'styled-components/native'

import { COLORS, globalStyles, IMAGES } from '../../../style'

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

export const GenerationButton = styled.TouchableOpacity`
  align-items: center;
  background-color: ${({ selected }) => selected ? COLORS.darkPrimaryBlue : COLORS.primaryBlue};
  border-color: ${COLORS.primaryBlack};
  border-radius: 200px;
  border-width: 1px;
  elevation: 3;
  height: 40px;
  justify-content: center;
  width: 40px;
`

GenerationButton.Text = styled.Text`
  ${globalStyles.defaultFont}
  color: white;
`

GenerationButton.Icon = styled.Image.attrs(() => ({
  source: IMAGES.icons.cancelIcon
}))`
  height: 16px;
  width: 16px;
`
