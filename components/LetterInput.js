import React from 'react'
import {
  StyleSheet,
  TextInput,
} from 'react-native';
import PropTypes from 'prop-types'

const LetterInput = ({letters, onAdd, focus}) => {
  if (letters === "" && !focus) {
    return null
  } else {
    return (
      <TextInput
        style = {styles.input}
        maxLength = {1}
        autoFocus = {focus}
        value = ""
        onChangeText={(letter) => onAdd(letter.toLowerCase())}
      />
  )}
}

const styles = StyleSheet.create({
  input: {
    flex: 0,
    width: 35,
    height: 50,
    fontSize: 30,
  }
});

LetterInput.propTypes = {
  letters: PropTypes.string.isRequired,
  onAdd: PropTypes.func.isRequired,
  focus: PropTypes.bool.isRequired,
}

export default LetterInput
