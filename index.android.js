/**
 * Lexicant App
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  View
} from 'react-native';
import dictionary from './data/dictionary'
import appends from './reducers/appends'
import prepends from './reducers/prepends'
import PlayMessage from './components/PlayMessage'
import HintsMessage from './components/HintsMessage'
import Letters from './components/Letters'

export default class LexicantApp extends Component {
  constructor(props) {
    super(props);
    this.state = {word: '', prepend: '', append: '', hint: false};
    this.dictionary = dictionary
    this.appends = appends(dictionary)
    this.prepends = prepends(dictionary)
    this.onPrepend = this.onPrepend.bind(this)
    this.onAppend = this.onAppend.bind(this)
  }

  render() {
    return (
      <View style={styles.container}>
        <Letters 
          letters = {this.state.word}
          onPrepend = {this.onPrepend}
          onAppend = {this.onAppend}
        />
        <PlayMessage
          player = "You"
          prepend = {this.state.prepend}
          append = {this.state.append}
        />
        <PlayMessage
          player = "Computer"
          prepend = {this.state.c_prepend}
          append = {this.state.c_append}
        />
        <Button
          onPress = {() => this.setState({hint: true})}
          title="get hint"
        />
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
    this.setState({prepend: letter})
    this.setState({append: ''})
    let word = letter + this.state.word
    this.play(word)
  }
  
  onAppend(letter) {
    this.setState({append: letter})
    this.setState({prepend: ''})
    let word = this.state.word + letter
    this.play(word)
  }

  play(word) {
    this.setState({hint: false})
    var next = ''
    if (word.length > 3 && this.dictionary.includes(word)) {
      this.setState({
        word: '',
        message: 'computer won with ' + word
      })
      this.computerAppend('')
    } else {
      let apps = this.appends[word]
      let preps = this.prepends[word]
      if (apps && (!preps || Math.random() > .5)) {
        let move = apps[Math.floor(Math.random()*apps.length)]
        next = word + move
        this.computerAppend(move)
      } else if (preps) {
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
      if (next.length > 3 && this.dictionary.includes(next)) { 
        this.setState({message: 'player won with ' + next})
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
    while (!this.dictionary.includes(word) || word.length < 4) {
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
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  important_text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

AppRegistry.registerComponent('LexicantApp', () => LexicantApp);
