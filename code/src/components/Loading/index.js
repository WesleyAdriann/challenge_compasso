import React from 'react'
import { ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'

import { COLORS } from '../../style'

const Loading = ({ visible }) => (
  <>
    {
      !!visible &&
      <ActivityIndicator size='small' color={COLORS.primaryRed} />
    }
  </>
)

Loading.propTypes = {
  visible: PropTypes.bool.isRequired
}

export default Loading
