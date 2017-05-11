/**
 * Lexicant App
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View
} from 'react-native';
import dictionary from './../data/dictionary'
import appends from './../reducers/appends'
import prepends from './../reducers/prepends'
import PlayMessage from './PlayMessage'
import HintsMessage from './HintsMessage'
import Letters from './Letters'

export default class LexicantApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: '',
      prepend: '',
      append: '',
      c_prepend: '',
      c_append: '',
      hint: false
    };
    this.dictionary = dictionary
    this.appends = appends(dictionary)
    this.prepends = prepends(dictionary)
    this.onPrepend = this.onPrepend.bind(this)
    this.onAppend = this.onAppend.bind(this)
    this.prependInput = null
    this.appendInput = null
  }

  render() {
    return (
      <View style={styles.container}>
        <Letters 
          letters = {this.state.word}
          onPrepend = {this.onPrepend}
          onAppend = {this.onAppend}
          focusPrepend = {this.state.append === ""}
          registerPrepend = {(input) => this.prependInput = input}
          registerAppend = {(input) => this.appendInput = input}
        />
        <PlayMessage
          player = "You"
          prepend = {this.state.prepend}
          append = {this.state.append}
          style = {styles.text}
        />
        <PlayMessage
          player = "Computer"
          prepend = {this.state.c_prepend}
          append = {this.state.c_append}
          style = {styles.text}
        />
        {
          this.state.word === "" ? null :
            <Button
              onPress = {() => this.setState({hint: true})}
              title="get hint"
            />
        }
        <HintsMessage
          hint = {this.state.hint}
          prepends = {this.prepends[this.state.word]}
          appends = {this.appends[this.state.word]}
        />
        <Text style={styles.text}>
          {this.state.message}{"\n"}
        </Text>
      </View>
    );
  }

  onPrepend(letter) {
    if (!letter.match(/[a-z]/i)) {
      if (letter === " ") {
        if (this.appendInput) {
          this.appendInput.focus()
        }
      }
      return
    }
    this.setState({
      prepend: letter,
      append: '',
    })
    let word = letter + this.state.word
    this.play(word)
  }
  
  onAppend(letter) {
    if (!letter.match(/[a-z]/i)) {
      if (letter === " ") {
        if (this.prependInput) {
          this.prependInput.focus()
        }
      }
      return
    }
    this.setState({
      append: letter,
      prepend: '',
    })
    let word = this.state.word + letter
    this.play(word)
  }

  play(word) {
    this.setState({hint: false})
    var next = ''
    if (this.dictionary.includes(word)) {
      this.setState({
        word: '',
        message: 'computer won with ' + word
      })
      this.computerAppend('')
    } else {
      let apps = this.appends[word] || []
      let preps = this.prepends[word] || []
      let safe_appends = apps.filter(
          letter => !this.dictionary.includes(word + letter))
      let safe_prepends = preps.filter(
          letter => !this.dictionary.includes(letter + word))
      if (safe_appends.length !== 0 &&
          (safe_prepends.length === 0 || Math.random() > .5)) {
        let move = safe_appends[Math.floor(Math.random()*safe_appends.length)]
        next = word + move
        this.computerAppend(move)
      } else if (safe_prepends.length !== 0) {
        let move = safe_prepends[Math.floor(Math.random()*safe_prepends.length)]
        next = move + word
        this.computerPrepend(move)
      } else if (apps.length > 0) {
        let move = apps[Math.floor(Math.random()*apps.length)]
        next = word + move
        this.computerAppend(move)
      } else if (preps.length > 0) {
        let move = preps[Math.floor(Math.random()*preps.length)]
        next = move + word
        this.computerPrepend(move)
      } else {
        this.setState({
          message: 'computer challenged ' + word +
            '\ncomputer was thinking of ' + this.completion(this.state.word),
          word: ''
        })
        this.computerAppend('')
        return
      }
      if (this.dictionary.includes(next)) {
        this.setState({message: 'you won with ' + next})
        this.setState({word: ''})
      } else {
        this.setState({word: next})
        this.setState({message: ''})
      }
    }
  }

  computerPrepend(letter) {
    this.setState({c_prepend: letter, c_append: ''})
  }

  computerAppend(letter) {
    this.setState({c_prepend: '', c_append: letter})
  }

  completion(letters) {
    let word = letters
    while (!this.dictionary.includes(word)) {
      let apps = this.appends[word]
      let preps = this.prepends[word]
      if (apps && (!preps || Math.random() > .5)) {
        let move = apps[Math.floor(Math.random()*apps.length)]
        word = word + move
      } else if (preps) {
        let move = preps[Math.floor(Math.random()*preps.length)]
        word = move + word
      } else { // shouldn't get here
        return "letters"
      }
    }
    return word
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
