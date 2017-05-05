const appends = (dictionary) => {
  let append = Object.create(null);
  for (var word of dictionary) {
    if (word.length < 4) {
      continue
    }
    for (let i = 0; i < word.length; ++i) {
      for (let j = i; j < word.length; ++j) {
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
