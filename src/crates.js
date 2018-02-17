import { format } from 'strman'

const crates = (phrase = '', ...variables) =>
  phrase ? format.call(null, phrase.toString(), variables) : ''

export default crates
