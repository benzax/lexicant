import React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import PropTypes from 'prop-types'

const Letters = ({letters, onPrepend, onAppend, focusPrepend}) => {
  let prepend = 
    <TextInput
      style = {styles.input}
      value = ""
      autoFocus = {focusPrepend || letters === ""}
      onChangeText={(prepend) => onPrepend(prepend.toLowerCase())}
    />
  if (letters === "") {
    return prepend
  } else {
    return (
      <View style={styles.view}>
        {prepend}
        <Text style={styles.text}>
          {letters}
        </Text>
        <TextInput
          style = {styles.input}
          autoFocus = {!focusPrepend}
          value = ""
          onChangeText={(append) => onAppend(append.toLowerCase())}
        />
      </View>
  )}
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    height: 40,
  },
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

Letters.propTypes = {
  letters: PropTypes.string.isRequired,
  onPrepend: PropTypes.func.isRequired,
  onAppend: PropTypes.func.isRequired,
}

export default Letters
