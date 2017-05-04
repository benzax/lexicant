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

export default class LexicantApp extends Component {
  constructor(props) {
    super(props);
    this.state = {word: '', prepend: '', append: ''};
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
    this.setState({word: letter + this.state.word})
  }
  
  append(letter) {
    this.setState({append: letter})
    this.setState({prepend: ''})
    this.setState({word: this.state.word + letter})
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
