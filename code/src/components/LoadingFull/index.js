import React from 'react'
import { ActivityIndicator, Modal } from 'react-native'
import PropTypes from 'prop-types'

import { COLORS } from '../../style'

import { Container } from './style'

const LoadingFull = ({ visible = false, message = '' }) => (
  <Modal
    animationType='fade'
    transparent
    visible={visible}
  >
    <Container>
      <ActivityIndicator size='large' color={COLORS.primaryRed} />
      <Container.Text>{message}</Container.Text>
    </Container>
  </Modal>
)

LoadingFull.propTypes = {
  visible: PropTypes.bool,
  message: PropTypes.string
}

export default LoadingFull
