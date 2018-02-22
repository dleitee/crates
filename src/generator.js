import fs from 'fs'
import path from 'path'

import { parse } from 'babylon'
import generateCode from '@babel/generator'
import _get from 'lodash.get'

import parser from './parser'

const readFile = filename => fs.readFileSync(filename, { encoding: 'UTF-8' })

const createFolder = pathname => !fs.existsSync(pathname) && fs.mkdirSync(pathname)

const writeFile = (filename, data) => {
  if (fs.existsSync(filename)) {
    fs.unlinkSync(filename)
  }
  fs.writeFileSync(filename, data)
}

const getCurrentJSON = (generatedFileName, options = {}) => {
  const filename = path.resolve(process.cwd(), options.path, generatedFileName)
  if (fs.existsSync(filename)) {
    // eslint-disable-next-line
    return require(filename)
  }
  return {}
}

const mergeMaps = filesMapped =>
  filesMapped.reduce((previous, current) => new Map([...previous, ...current]), new Map())

const generateCodeToLanguage = (translationMap, language, options = {}) => {
  const generatedFileName = `translation.${language}.js`
  const json = getCurrentJSON(generatedFileName, options)
  let object = {}
  translationMap.forEach((value, key) => {
    const item = {
      [key]: {
        phrase: value,
        translation: _get(json, `${key}.translation`, ''),
      },
    }
    object = { ...object, ...item }
  })
  const code = `module.exports = ${JSON.stringify(object)}`
  const ast = parse(code, { sourceType: 'module' })
  writeFile(path.resolve(options.path, generatedFileName), generateCode(ast).code)
}

const generator = async (files = [], languages = [], options = {}) => {
  const defaultOptions = {
    path: './translations',
    ...options,
  }
  try {
    const filesMapped = await Promise.all(
      files.map(async file => {
        console.info('compiling file:', file, options)
        console.info('\x1Bc')
        return parser(readFile(file), options)
      })
    )
    const allTranslations = mergeMaps(filesMapped)
    createFolder(defaultOptions.path)
    languages.forEach(value => generateCodeToLanguage(allTranslations, value, defaultOptions))
  } catch (error) {
    console.error('Generator:', error)
  }
}

export default generator
