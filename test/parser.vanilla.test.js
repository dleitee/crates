import fs from 'fs'
import path from 'path'

import { base64decode } from 'strman'

import parser from '../src/parser'

describe('run parser on vanilla-module file', () => {
  let file = null

  beforeAll(() => {
    file = fs.readFileSync(path.resolve(__dirname, 'examples', 'vanilla.module.js'), {
      encoding: 'UTF-8',
    })
  })

  test('to test, the translations must have 1 or more elements', async () => {
    const translations = await parser(file, { moduleName: '../../' })
    expect(translations.size).toBeGreaterThan(1)
  })

  test('parser function should return a map with strings to translate', async () => {
    const translations = await parser(file, { moduleName: '../../' })
    expect(translations).toBeInstanceOf(Map)
  })

  test("the map's keys must be a base64 of value", async () => {
    const translations = await parser(file, { moduleName: '../../' })
    translations.forEach((value, key) => {
      expect(base64decode(key)).toEqual(value)
    })
  })
})
