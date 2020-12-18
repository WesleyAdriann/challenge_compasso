import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Alert } from 'react-native'
import PropTypes from 'prop-types'

import { IMAGES, COLORS } from '../../style'
import { setPokemon, setIsLoading } from '../../store/actions/pokemon'
import { getPokemonSpecie, getPokemon, getPokemonEvolutionChain } from '../../services/pokeAPI'
import { string } from '../../utils'

import LoadingFull from '../../components/LoadingFull'
import RoundButton from '../../components/RoundButton'

import {
  ScreenContainer,
  BackButtonWrapper,
  PokemonHeaderWrapper,
  PokemonImage,
  PokemonPrincipalData,
  BadgesWrapper,
  PokemonDataWrapper
} from './style'

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
      .then(([{ data: specie }, { data: pokemon }]) => {
        if ('official-artwork' in pokemon.sprites.other) {
          pokemon.image = pokemon.sprites.other['official-artwork'].front_default
        } else {
          pokemon.image = pokemon.sprites.front_default
        }

        requestEvolutions(specie.evolution_chain.url)
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

  const requestEvolutions = (evochainUrl) => {
    const id = evochainUrl.split('evolution-chain/').pop().replace(/\D/g, '')

    getPokemonEvolutionChain(id)
      .then(({ data }) => {
        const evolutions = []
        console.log(data)
        let { chain } = data

        while (true) {
          evolutions.push(chain.species)
          if (!chain.evolves_to.length) break
          chain = chain.evolves_to[0]
        }

        console.log(evolutions)
      })
      .catch((error) => {
        console.log('getPokemonInformations error: ', error)
        Alert.alert('Attention', 'There was an error to get pokemon evolutions', [
          { text: 'Ok', onPress: () => dispatch(setIsLoading(false)) },
          { text: 'Try Again', onPress: () => requestEvolutions(evochainUrl) }
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
      <PokemonHeaderWrapper>
        <PokemonImage source={{ uri: pokemon.image }} />
        <PokemonPrincipalData>
          <PokemonPrincipalData.Name>
            {string.capitalize(pokemon.name)}
          </PokemonPrincipalData.Name>
          <BadgesWrapper>
            {
              pokemon.types?.map(({ type }, index) => (
                <BadgesWrapper.Badge key={index} pokemonType={type.name} index={index}>
                  <BadgesWrapper.Text> {type.name} </BadgesWrapper.Text>
                </BadgesWrapper.Badge>
              ))
            }
          </BadgesWrapper>
        </PokemonPrincipalData>
      </PokemonHeaderWrapper>
      <PokemonDataWrapper>

      </PokemonDataWrapper>
    </ScreenContainer>
  )
}

Pokemon.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired
}

export default Pokemon
