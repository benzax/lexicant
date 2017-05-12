import LetterBitMapTrie from './../trie/LetterBitMapTrie'

const appends = (dictionary) => {
  let append = new LetterBitMapTrie()
  append.addAll('')

  for (var word of dictionary) {
    for (let i = 0; i < word.length; ++i) {
      for (let j = i+1; j < word.length; ++j) {
        let slice = word.slice(i, j)
        append.add(slice, word[j])
      }
    }
  }
  return append
}

export default appends
