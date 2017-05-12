class LetterBitMapTrie {
  constructor() {
    this.map = Object.create(null)
    this.letters = 'abcdefghijklmnopqrstuvwxyz'
  }

  // value is lowercase letter
  add(key, value) {
    if (!this.map[key]) {
      this.map[key] = 0
    }
    this.map[key] |= (1 << (value.charCodeAt(0) - 97))
  }

  get(key) {
    let arr = []
    if (!this.map[key]) {
      return arr
    }
    for (let i = 0; i < 26; i++) {
      if (this.map[key] & 1 << i) {
        arr.push(this.letters[i])
      }
    }
    return arr
  }
  
  addAll(key) {
    this.map[key] = (1 << 26) - 1
  }
}

export default LetterBitMapTrie;
