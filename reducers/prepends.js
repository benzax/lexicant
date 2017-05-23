const prepends = (dictionary, trie) => {
  let prepend = trie.prepend()

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
