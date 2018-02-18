import fs from 'fs'
import path from 'path'

import parser, { getModuleIdentifier } from '../src/parser'

describe('run parser on vanilla-module file', () => {
  let file = null

  beforeAll(() => {
    file = fs.readFileSync(path.resolve(__dirname, 'examples', 'vanilla.module.js'), {
      encoding: 'UTF-8',
    })
  })

  test('a', async () => {
    const ast = await parser(file, { moduleName: '../../' })
  })
})
