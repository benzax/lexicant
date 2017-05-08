import React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import PropTypes from 'prop-types'

const Letters = ({letters, onPrepend, onAppend}) => {
  return (
    <View>
      <Text style={styles.text}>
        Add to the start:
      </Text>
      <TextInput
        value = ""
        onChangeText={(prepend) => onPrepend(prepend)}
      />
      <Text style={styles.text}>
        Add to end:
      </Text>
      <TextInput
        value = ""
        onChangeText={(append) => onAppend(append)}
      />
    </View>
)}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
});

Letters.propTypes = {
  letters: PropTypes.string.isRequired,
  onPrepend: PropTypes.func.isRequired,
  onAppend: PropTypes.func.isRequired,
}

export default Letters
