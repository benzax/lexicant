import React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import PropTypes from 'prop-types'
import LetterInput from './LetterInput'

const Letters = ({letters, onPrepend, onAppend, focusPrepend,
    registerPrepend, registerAppend}) => {
  return (
    <View style={styles.view}>
      <LetterInput
        letters = {letters}
        focus = {focusPrepend}
        onAdd = {onPrepend}
        register = {registerPrepend}
      />
      <Text style={styles.text}>
        {letters}
      </Text>
      <LetterInput
        letters = {letters}
        focus = {!focusPrepend}
        onAdd = {onAppend}
        register = {registerAppend}
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
});

Letters.propTypes = {
  letters: PropTypes.string.isRequired,
  onPrepend: PropTypes.func.isRequired,
  onAppend: PropTypes.func.isRequired,
  focusPrepend: PropTypes.bool,
  registerPrepend: PropTypes.func.isRequired,
  registerAppend: PropTypes.func.isRequired,
}

export default Letters
