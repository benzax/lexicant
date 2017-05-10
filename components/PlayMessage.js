import React from 'react'
import { Text } from 'react-native';
import PropTypes from 'prop-types'

const PlayMessage = ({player, prepend, append, style}) => {
  if (prepend) {
    return (
      <Text style={style}>
        {player} added {prepend} to the start
      </Text>
    )
  } else if (append) {
    return (
        <Text style={style}>
          {player} added {append} to the end
        </Text>
    )
  } else if (player === 'You') {
    return (
        <Text style={style}>
          Waiting for your play
        </Text>
    )
  } else {
    return null
  }
}

PlayMessage.propTypes = {
  player: PropTypes.string.isRequired,
  prepend: PropTypes.string.isRequired,
  append: PropTypes.string.isRequired,
  style: PropTypes.number.isRequired
}

export default PlayMessage
