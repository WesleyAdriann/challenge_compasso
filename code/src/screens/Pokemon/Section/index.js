import React from 'react'
import PropTypes from 'prop-types'

import { Container, Title, Text } from './style'

const Section = ({ title, children, texts }) => (
  <Container>
    <Title>{title}</Title>
    {
      texts.length
        ? texts.map((text, index) => (
        <Text key={index}>{text}</Text>
          ))
        : children
    }
  </Container>
)

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  texts: PropTypes.arrayOf(PropTypes.string)
}

Section.defaultProps = {
  texts: []
}

export default Section
