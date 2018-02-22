import fs from 'fs'
import path from 'path'

import rimraf from 'rimraf'

import generator from '../src/generator'

describe('run generator through the files', () => {
  let firstFile = null
  let secondFile = null

  beforeAll(() => {
    firstFile = path.resolve(__dirname, 'examples', 'jsx.js')
    secondFile = path.resolve(__dirname, 'examples', 'vanilla.module.js')
  })

  test('should generate three files', async () => {
    const dir = '.tmp'
    await generator([firstFile, secondFile, secondFile], ['en', 'pt', 'es'], {
      path: dir,
      moduleName: '../../',
    })

    const trueDir = path.resolve(process.cwd(), dir)
    const filesOnDir = fs.readdirSync(trueDir)
    expect(filesOnDir).toEqual([
      'translation.en.json',
      'translation.es.json',
      'translation.pt.json',
    ])
    rimraf(trueDir, () => {})
  })
})
