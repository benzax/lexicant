/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import dictionary from './data/dictionary'
import appends from './reducers/appends'
import prepends from './reducers/prepends'

export default class LexicantApp extends Component {
  constructor(props) {
    super(props);
    this.state = {word: '', prepend: '', append: ''};
    this.dictionary = dictionary
    this.appends = appends(dictionary)
    this.prepends = prepends(dictionary)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Add to the start:
        </Text>
        <TextInput
          value = ""
          onChangeText={(prepend) => this.prepend(prepend)}
        />
        <Text>
          Add to end:
        </Text>
        <TextInput
          value = ""
          onChangeText={(append) => this.append(append)}
        />
        <Text>
          Message: {this.state.message}{"\n"}
          Prepend: {this.state.prepend}{"\n"}
          Append: {this.state.append}{"\n"}
          Word: {this.state.word}
        </Text>
      </View>
    );
  }

  prepend(letter) {
    this.setState({prepend: letter})
    this.setState({append: ''})
    let word = letter + this.state.word
    this.play(word)
  }
  
  append(letter) {
    this.setState({append: letter})
    this.setState({prepend: ''})
    let word = this.state.word + letter
    this.play(word)
  }

  play(word) {
    var next = ''
    if (word.length > 3 && this.dictionary.includes(word)) {
      this.setState({word: ''})
      this.setState({message: 'computer wins'})
    } else {
      let apps = this.appends[word]
      let preps = this.prepends[word]
      if (apps && (!preps || Math.random() > .5)) {
        let move = apps[Math.floor(Math.random()*apps.length)]
        next = word + move
      } else if (preps) {
        let move = preps[Math.floor(Math.random()*preps.length)]
        next = move + word
      } else {
        this.setState({message: 'player wins'})
      }
      if (this.dictionary.includes(next)) { 
        this.setState({message: 'player wins'})
        this.setState({word: ''})
      } else {
        this.setState({word: next})
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('LexicantApp', () => LexicantApp);
