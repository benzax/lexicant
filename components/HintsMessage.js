import React from 'react'
import { Text } from 'react-native';
import PropTypes from 'prop-types'

const HintsMessage = ({hint, prepends, appends}) => {
  if (hint) {
    return (
      <Text>
        prepends: {prepends}{"\n"}
        appends: {appends}
      </Text>
    )
  } else {
    return null
  }
}

HintsMessage.propTypes = {
  hint: PropTypes.bool,
  prepends: PropTypes.arrayOf(PropTypes.string),
  appends: PropTypes.arrayOf(PropTypes.string)
}

export default HintsMessage
