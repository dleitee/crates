const crates = require('../../')

console.info(crates('Hello ', 'World!!!'))

const test = 'hello {0}'
const test1 = test

console.info(crates(test1, 'world!!!'))
