import LetterBitMapTrie from './../trie/LetterBitMapTrie'

const prepends = (dictionary) => {
  let prepend = new LetterBitMapTrie()
  prepend.addAll('')

  for (var word of dictionary) {
    for (let i = 0; i < word.length; ++i) {
      for (let j = i+1; j < word.length; ++j) {
        let slice = word.slice(i+1, j+1)
        prepend.add(slice, word[i])
      }
    }
  }
  return prepend
}

export default prepends
