import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Text, Alert } from 'react-native'
import PropTypes from 'prop-types'

import { IMAGES, COLORS } from '../../style'
import { setPokemon, setIsLoading } from '../../store/actions/pokemon'
import { getPokemonSpecie, getPokemon } from '../../services/pokeAPI'

import LoadingFull from '../../components/LoadingFull'
import RoundButton from '../../components/RoundButton'

import { ScreenContainer, BackButtonWrapper } from './style'

const Pokemon = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const { pokemon, specie, isLoading } = useSelector((state) => state.pokemon)

  const requestPokemonInformations = (pokemonId) => {
    const promiseArr = [
      getPokemonSpecie(pokemonId),
      getPokemon(pokemonId)
    ]

    dispatch(setIsLoading(true))
    Promise.all(promiseArr)
      .then(([specie, pokemon]) => {
        console.log(specie, pokemon)
        dispatch(setPokemon(pokemon, specie))
        dispatch(setIsLoading(false))
      })
      .catch((error) => {
        console.log('getPokemonInformations error: ', error)
        Alert.alert('Attention', 'There was an error loading the pokemon', [
          { text: 'Ok', onPress: () => dispatch(setIsLoading(false)) },
          { text: 'Try Again', onPress: () => requestPokemonInformations(pokemonId) }
        ])
      })
  }


  const handleGoBack = () => {
    dispatch(setPokemon({}, {}))
    navigation.pop()
  }

  useEffect(() => {
    const { pokemonId } = route.params
    requestPokemonInformations(pokemonId)
  }, [])

  return (
    <ScreenContainer>
      <LoadingFull visible={isLoading} />
      <BackButtonWrapper>
        <RoundButton backgroundColor={COLORS.primaryBlue} onPress={handleGoBack} >
          <RoundButton.Icon source={IMAGES.icons.backIcon} />
        </RoundButton>
      </BackButtonWrapper>
      <Text>Pokemon</Text>
    </ScreenContainer>
  )
}

Pokemon.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired
}

export default Pokemon
