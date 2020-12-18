import React from 'react'
import PropTypes from 'prop-types'

import { COLORS, IMAGES } from '../../../style'

import RoundButton from '../../../components/RoundButton'

import { GenerationSelectWrapper, Label, OptionsContainer } from './style'

const GenerationSelect = ({ generations, selected, handleSelectGeneration }) => (
  <GenerationSelectWrapper>
    <Label>Generations</Label>
    <OptionsContainer>
      {
        generations.map((generation, index) => (
          <RoundButton
            key={index}
            backgroundColor={selected === generation.id ? COLORS.darkPrimaryBlue : COLORS.primaryBlue}
            onPress={() => handleSelectGeneration(generation.id)}
          >
            {
              selected === generation.id
                ? <RoundButton.Icon source={IMAGES.icons.cancelIcon} />
                : <RoundButton.Text>{generation.id}</RoundButton.Text>
            }
          </RoundButton>
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
