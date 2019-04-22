import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import * as types from '@babel/types'
import _get from 'lodash.get'

const getTranslationValueFromIdentifier = path => {
  const init = _get(path, 'node.init')
  if (!init) {
    return null
  }
  if (types.isStringLiteral(init)) {
    return init.value
  }
  if (types.isIdentifier(init)) {
    const { name } = init
    return getTranslationValueFromIdentifier(_get(path, `scope.bindings.${name}.path`))
  }
  return null
}

export const getTranslationsMap = (ast, identifier) => {
  const translations = new Map()
  traverse(ast, {
    CallExpression(path) {
      if (_get(path, 'node.callee.name') !== identifier) {
        return
      }
      const argument = _get(path, 'node.arguments[0]')
      if (types.isStringLiteral(argument)) {
        translations.set(argument.value, argument.value)
        return
      }
      const translation = getTranslationValueFromIdentifier(
        _get(path, `scope.bindings.${argument.name}.path`)
      )
      if (translation) {
        translations.set(translation, translation)
      }
    },
  })
  return translations
}

export const getASTFromCode = (file, options = {}) => parse(file, options)
