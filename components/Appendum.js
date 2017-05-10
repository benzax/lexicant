import React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import PropTypes from 'prop-types'

const Appendum = ({letters, onAppend, focusPrepend, onHide}) => {
  if (letters === "") {
    return null
  } else {
    return (
      <TextInput
        style = {styles.input}
        autoFocus = {!focusPrepend}
        value = ""
        onChangeText={(append) => onAppend(append.toLowerCase())}
      />
  )}
}

const styles = StyleSheet.create({
  text: {
    flex: 0,
    fontSize: 30,
  },
  input: {
    flex: 0,
    width: 30,
    height: 50,
    fontSize: 25,
  }
});

Appendum.propTypes = {
  letters: PropTypes.string.isRequired,
  onAppend: PropTypes.func.isRequired,
}

export default Appendum
