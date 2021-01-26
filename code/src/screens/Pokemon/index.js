import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Alert } from 'react-native'
import PropTypes from 'prop-types'

import { IMAGES, COLORS } from '../../style'
import { setPokemon, setIsLoading, setEvolutions } from '../../store/actions/pokemon'
import { getPokemonSpecie, getPokemon, getPokemonEvolutionChain } from '../../services/pokeAPI'
import { string } from '../../utils'

import LoadingFull from '../../components/LoadingFull'
import RoundButton from '../../components/RoundButton'

import Section from './Section'
import { Title as SectionTitle } from './Section/style'

import {
  ScreenContainer,
  BackButtonWrapper,
  PokemonHeaderWrapper,
  PokemonImage,
  PokemonPrincipalData,
  BadgesWrapper,
  PokemonDataWrapper,
  PokemonEvolutionsWrapper
} from './style'

const Pokemon = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const { pokemon, specie, isLoading, evolutions } = useSelector((state) => state.pokemon)

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

        let description = ''

        while (true) {
          const flavorText = specie.flavor_text_entries.pop()
          if (flavorText.language.name === 'en' || !specie.flavor_text_entries.length) {
            description = flavorText.flavor_text
            break
          }
        }
        specie.description = description

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
        const evolutionsList = []
        let { chain } = data

        while (true) {
          const { species } = chain
          const specieId = species.url.split('pokemon-species/').pop().replace(/\D/g, '')
          evolutionsList.push({ ...species, id: specieId })
          if (!chain.evolves_to.length) break
          chain = chain.evolves_to[0]
        }

        dispatch(setEvolutions(evolutionsList))
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
    dispatch(setEvolutions([]))
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
        <SectionTitle>#{String(pokemon.id).padStart(4, '0')}</SectionTitle>
        <Section
          title='Description'
          texts={[specie.description]}
        />
        <Section
          title='Technical features'
          texts={[
            `Base XP: ${pokemon.base_experience}`,
            `Weight: ${pokemon.weight}`,
            `Height: ${pokemon.height}`
          ]}
        />
        <Section
          title='Stats'
          texts={
            pokemon.stats?.map(({ stat, base_stat: baseStat }) => `${string.capitalize(stat.name).replace('-', ' ')}: ${baseStat}`)
          }
        />
        <Section title='Evolution Chain'>
          <PokemonEvolutionsWrapper>
            {
              evolutions.map((evo, index) => (
                <PokemonEvolutionsWrapper.Image key={index} source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evo.id}.png` }} />
              ))
            }
          </PokemonEvolutionsWrapper>
        </Section>
      </PokemonDataWrapper>
    </ScreenContainer>
  )
}

Pokemon.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired
}

export default Pokemon
