const appends = (dictionary) => {
  let append = Object.create(null);
  append[''] = 'abcdefghijklmnopqrstuvwxyz'.split('')
  for (var word of dictionary) {
    for (let i = 0; i < word.length; ++i) {
      for (let j = i+1; j < word.length; ++j) {
        let slice = word.slice(i, j)
        if (slice in append) {
          if (!append[slice].includes(word[j])) {
            append[slice].push(word[j])
          }
        } else {
          append[slice] = [ word[j] ]
        }
      }
    }
  }
  return append
}

export default appends
