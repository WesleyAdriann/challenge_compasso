import React from 'react'
import { Provider } from 'react-redux'
import 'react-native-gesture-handler'

import store from './store'

import Routes from './Routes'

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  )
}

export default App
