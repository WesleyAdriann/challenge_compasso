import styled from 'styled-components/native'

import { COLORS, globalStyles } from '../../style'

export const ScreenContainer = styled.SafeAreaView`
  background-color: ${COLORS.primatyGray};
  height: 100%;
`

export const BackButtonWrapper = styled.View`
  margin: 8px 0;
`

export const PokemonHeaderWrapper = styled.View`
  flex-direction: row;
  padding: 8px;
  position: relative;
  z-index: 900;
`

export const PokemonImage = styled.Image`
  height: 160px;
  resize-mode: cover;
  width: 160px;
`

export const PokemonPrincipalData = styled.View`
  align-items: center;
  flex-grow: 1;
  justify-content: center;
`

PokemonPrincipalData.Name = styled.Text`
  ${globalStyles.defaultFont}
  font-size: 24px;
  font-weight: bold;
`

export const BadgesWrapper = styled.View`
  flex-direction: row;
`

BadgesWrapper.Badge = styled.View`
  background-color: ${({ pokemonType }) => COLORS.pokemonBadges[pokemonType]};
  border-radius: 16px;
  elevation: 3;
  padding: 8px;
  margin-left: ${({ index }) => index === 1 ? 4 : 0}px;
`

BadgesWrapper.Text = styled.Text`
  ${globalStyles.defaultFont}
  color: white;
`

export const PokemonDataWrapper = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    paddingVertical: 32
  }
}))`
  flex-grow: 1;
  background-color: white;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  padding: 0 16px 8px;
  margin-top: -36px;
  flex-grow: 1;
`

export const PokemonEvolutionsWrapper = styled.View`
  flex-direction: row;
  justify-content: space-around;
`

PokemonEvolutionsWrapper.Image = styled.Image`
  height: 96px;
  resize-mode: cover;
  width: 96px;
`
