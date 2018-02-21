import crates from '../src'

describe('crates function behavior', () => {
  test('should return Hello World!!!', () => {
    const result = 'Hello World!!!'
    expect(crates('Hello World!!!')).toEqual(result)
    expect(crates('Hello {0}!!!', 'World')).toEqual(result)
    expect(crates('{1} {0}!!!', 'World', 'Hello')).toEqual(result)
    expect(crates('{0} {1}!!!', 'Hello', 'World')).toEqual(result)
  })

  test('should return the initial phrase', () => {
    expect(crates('{}')).toEqual('{}')
    expect(crates('{0}')).toEqual('{0}')
    expect(crates(1)).toEqual('1')
    expect(crates(1, 2)).toEqual('1')
    expect(crates(1.1)).toEqual('1.1')
  })

  test('should return an empty string', () => {
    expect(crates()).toEqual('')
    expect(crates(NaN)).toEqual('')
    expect(crates(undefined)).toEqual('')
    expect(crates(null)).toEqual('')
  })
})
