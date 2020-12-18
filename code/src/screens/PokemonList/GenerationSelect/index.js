import React from 'react'
import PropTypes from 'prop-types'

import { GenerationSelectWrapper, Label, OptionsContainer, GenerationButton } from './style'

const GenerationSelect = ({ generations, selected, handleSelectGeneration }) => (
  <GenerationSelectWrapper>
    <Label>Generations</Label>
    <OptionsContainer>
      {
        generations.map((generation, index) => (
          <GenerationButton
            key={index}
            selected={selected === generation.id}
            onPress={() => handleSelectGeneration(generation.id)}
          >
            {
              selected === generation.id
                ? <GenerationButton.Icon />
                : <GenerationButton.Text>{generation.id}</GenerationButton.Text>
            }
          </GenerationButton>
        ))
      }
    </OptionsContainer>
  </GenerationSelectWrapper>
)

GenerationSelect.propTypes = {
  generations: PropTypes.arrayOf(PropTypes.object).isRequired,
  selected: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  handleSelectGeneration: PropTypes.func
}

GenerationSelect.defaultProps = {
  handleSelectGeneration: () => {},
  selected: 0
}

export default GenerationSelect
