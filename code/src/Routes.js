import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'

import PokemonList from './screens/PokemonList'
import Pokemon from './screens/Pokemon'

import { ROUTES } from './settings'

const Stack = createStackNavigator()

const Routes = () => (
  <NavigationContainer>
      <Stack.Navigator
        initialRouteName={ROUTES.pokemonList}
        headerMode='none'
        screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}
      >
        <Stack.Screen name={ROUTES.pokemonList} component={PokemonList} />
        <Stack.Screen name={ROUTES.pokemon} component={Pokemon} />
      </Stack.Navigator>
  </NavigationContainer>
)

export default Routes
