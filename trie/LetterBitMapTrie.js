class LetterBitMapTrie {
  constructor() {
    this.map = Object.create(null)
    this.letters = 'abcdefghijklmnopqrstuvwxyz'
    this.addAll('')
    this.removePrefix = this.remove.bind(this, 0)
    this.removeSuffix = this.remove.bind(this, 1)
  }

  prepend() {
    let prepend = Object.create(null)
    prepend.add = this.add.bind(this, 0)
    prepend.get = this.get.bind(this, 0)
    return prepend
  }

  append() { 
    let append = Object.create(null)
    append.add = this.add.bind(this, 1)
    append.get = this.get.bind(this, 1)
    return append
  }

  remove(view, key, value) {
    this.map[key][view] &= ~(1 << (value.charCodeAt(0) - 97))
  }

  hasExtensions(key) {
    if (!this.map[key]) {
      return false
    }
    return (this.map[key][0] != 0) || (this.map[key][1] != 0)
  }

  // value is lowercase letter
  add(view, key, value) {
    if (!this.map[key]) {
      this.map[key] = [0, 0]
    }
    this.map[key][view] |= (1 << (value.charCodeAt(0) - 97))
  }

  get(view, key) {
    let arr = []
    if (!this.map[key]) {
      return arr
    }
    for (let i = 0; i < 26; i++) {
      if (this.map[key][view] & 1 << i) {
        arr.push(this.letters[i])
      }
    }
    return arr
  }
  
  addAll(key) {
    this.map[key] = [(1 << 26) - 1, (1 << 26) - 1]
  }
}

export default LetterBitMapTrie;
