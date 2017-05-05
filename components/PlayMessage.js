import React from 'react'
import { Text } from 'react-native';
import PropTypes from 'prop-types'

const PlayMessage = ({player, prepend, append}) => {
  if (prepend) {
    return <Text>{player} added {prepend} to the start </Text>
  } else if (append) {
    return <Text>{player} added {append} to the end </Text>
  } else if (player === 'You') {
    return <Text> Waiting for your play </Text>
  } else {
    return null
  }
}

PlayMessage.propTypes = {
  player: PropTypes.string,
  prepend: PropTypes.string,
  append: PropTypes.string
}

export default PlayMessage
