const prepends = (dictionary) => {
  let prepend = Object.create(null);
  for (var word of dictionary) {
    if (word.length < 4) {
      continue
    }
    for (let i = 0; i < word.length; ++i) {
      for (let j = i; j < word.length; ++j) {
        let slice = word.slice(i+1, j+1)
        if (slice in prepend) {
          if (!prepend[slice].includes(word[i])) {
            prepend[slice].push(word[i])
          }
        } else {
          prepend[slice] = [ word[i] ]
        }
      }
    }
  }
  return prepend
}

export default prepends
