import React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import PropTypes from 'prop-types'
import Appendum from './Appendum'

const Letters = ({letters, onPrepend, onAppend, focusPrepend}) => {
  return (
    <View style={styles.view}>
      <TextInput
        ref = {(input) => { this.prependInput = input; }}
        style = {styles.input}
        value = ""
        autoFocus = {focusPrepend || letters === ""}
        onChangeText={(prepend) => onPrepend(prepend.toLowerCase())}
      />
      <Text style={styles.text}>
        {letters}
      </Text>
      <Appendum
        letters = {letters}
        onAppend = {onAppend}
        focusPrepend = {focusPrepend}
      />
    </View>
  )
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
  focusPrepend: PropTypes.bool,
}

export default Letters
