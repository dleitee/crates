import format from 'strman.format'

const crates = (phrase = '', ...variables) =>
  phrase ? format.call(null, phrase.toString(), variables) : ''

export default crates
