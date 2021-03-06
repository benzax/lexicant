/**
 * Lexicant
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  KeyboardAvoidingView,
  View
} from 'react-native';
import dictionary from './../data/dictionary'
import randomChoice from './../random/choice'
import LetterBitMapTrie from './../trie/LetterBitMapTrie'
import PlayMessage from './PlayMessage'
import HintsMessage from './HintsMessage'
import Letters from './Letters'

export default class Lexicant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: '',
      prepend: '',
      append: '',
      c_prepend: '',
      c_append: '',
      wins: 0,
      losses: 0,
      hint: false
    };
    this.dictionary = new Set(dictionary)
    this.trie = new LetterBitMapTrie(this.dictionary)
    this.appends = this.trie.append()
    this.prepends = this.trie.prepend()
    this.onPrepend = this.onPrepend.bind(this)
    this.onAppend = this.onAppend.bind(this)
    this.prependInput = null
    this.appendInput = null
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='height' style={styles.container}>
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
          prepends = {this.prepends.get(this.state.word)}
          appends = {this.appends.get(this.state.word)}
        />
        <Text style={styles.text}>
          {this.state.message}{"\n"}
        </Text>
        <Text style={styles.text}>
          score: {this.state.wins} - {this.state.losses}
        </Text>
      </KeyboardAvoidingView>
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
    if (this.dictionary.has(word)) {
      this.computerAppend('')
      this.uproot(word)
      this.resetGame({
        word: '',
        message: 'computer won with ' + word,
        losses: this.state.losses + 1,
      })
    } else {
      let apps = this.appends.get(word)
      let preps = this.prepends.get(word)

      let winning_appends = apps.filter(
          letter => this.trie.perfectPlay(word + letter) === 1)
      let winning_prepends = preps.filter(
          letter => this.trie.perfectPlay(letter + word) === 1)

      let safe_appends = apps.filter(
          letter => !this.dictionary.has(word + letter))
      let safe_prepends = preps.filter(
          letter => !this.dictionary.has(letter + word))

      if (winning_appends.length !== 0 &&
          (winning_prepends.length === 0 || Math.random() > .5)) {
        let move = randomChoice(winning_appends)
        next = word + move
        this.computerAppend(move)
      } else if (winning_prepends.length !== 0) {
        let move = randomChoice(winning_prepends)
        next = move + word
        this.computerPrepend(move)
      } else if (safe_appends.length !== 0 &&
          (safe_prepends.length === 0 || Math.random() > .5)) {
        let move = randomChoice(safe_appends)
        next = word + move
        this.computerAppend(move)
      } else if (safe_prepends.length !== 0) {
        let move = randomChoice(safe_prepends)
        next = move + word
        this.computerPrepend(move)
      } else if (apps.length > 0) {
        let move = randomChoice(apps)
        next = word + move
        this.computerAppend(move)
      } else if (preps.length > 0) {
        let move = randomChoice(preps)
        next = move + word
        this.computerPrepend(move)
      } else {
        this.computerAppend('')
        let completion = this.completion(this.state.word)
        this.uproot(completion)
        this.resetGame({
          message: 'computer challenged ' + word +
            '\ncomputer was thinking of ' + completion,
          word: '',
          losses: this.state.losses + 1,
        })
        return
      }
      if (this.dictionary.has(next)) {
        this.uproot(next)
        this.resetGame({
          message: 'you won with ' + next,
          word: '',
          wins: this.state.wins + 1,
        })
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

  resetGame(newState) {
    if ((this.state.wins + this.state.losses) % 2 == 0) {
      letter = randomChoice(this.trie.winningStarts())
      newState['word'] = letter
      newState['c_prepend'] = letter
      newState['append'] = ''
      newState['prepend'] = ''
    }
    this.setState(newState)
  }

  uproot(word) {
    this.dictionary.delete(word)
    this.uprootRecursively(word)
  }

  uprootRecursively(letters) {
    if (!this.dictionary.has(letters) && !this.trie.hasExtensions(letters)) {
      this.uprootPrefix(letters.slice(1), letters.slice(0,1))
      this.uprootSuffix(letters.slice(0,-1), letters.slice(-1))
    } else {
      this.trie.recomputeWinner(letters)
    }
  }

  uprootPrefix(letters, prefix) {
    this.trie.removePrefix(letters, prefix)
    this.uprootRecursively(letters)
  }

  uprootSuffix(letters, suffix) {
    this.trie.removeSuffix(letters, suffix)
    this.uprootRecursively(letters)
  }

  completion(letters) {
    let word = letters
    while (!this.dictionary.has(word)) {
      let apps = this.appends.get(word)
      let preps = this.prepends.get(word)
      if (apps.length !== 0 && (preps.length === 0 || Math.random() > .5)) {
        let move = randomChoice(apps)
        word = word + move
      } else if (preps.length !== 0) {
        let move = randomChoice(preps)
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
