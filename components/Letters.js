import React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import PropTypes from 'prop-types'

const Letters = ({letters, onPrepend, onAppend}) => {
  if (letters === "") {
    return (
      <TextInput
        style = {styles.input}
        value = ""
        onChangeText={(prepend) => onPrepend(prepend)}
      />
    )
  } else {
    return (
      <View style={styles.view}>
        <TextInput
          style = {styles.input}
          value = ""
          onChangeText={(prepend) => onPrepend(prepend)}
        />
        <Text style={styles.text}>
          {letters}
        </Text>
        <TextInput
          style = {styles.input}
          value = ""
          onChangeText={(append) => onAppend(append)}
        />
      </View>
  )}
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    height: 20,
  },
  text: {
    flex: 0,
    fontSize: 15,
  },
  input: {
    flex: 0,
    width: 30
  }
});

Letters.propTypes = {
  letters: PropTypes.string.isRequired,
  onPrepend: PropTypes.func.isRequired,
  onAppend: PropTypes.func.isRequired,
}

export default Letters
