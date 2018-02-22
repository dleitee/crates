import { parse } from 'babylon'
import traverse from '@babel/traverse'
import * as types from '@babel/types'
import _get from 'lodash.get'

const getModuleIdentifierByRequire = (path, moduleName) => {
  const declarations = _get(path, 'node.declarations')
  const identifier = declarations.find(
    declaration =>
      _get(declaration, 'init.callee.name') === 'require' &&
      _get(declaration, 'init.arguments[0].value') === moduleName
  )
  return _get(identifier, 'id.name')
}

const getModuleIdentifierByImport = (path, moduleName) => {
  if (_get(path, 'node.source.value') !== moduleName) {
    return null
  }
  const specifiers = _get(path, 'node.specifiers')
  const identifier = specifiers.find(specifier => types.isImportDefaultSpecifier(specifier))
  return _get(identifier, 'local.name')
}

export const getModuleIdentifier = (ast, moduleName) =>
  new Promise(resolve => {
    traverse(ast, {
      ImportDeclaration(path) {
        const identifier = getModuleIdentifierByImport(path, moduleName)
        if (identifier) {
          resolve(identifier)
        }
      },
      VariableDeclaration(path) {
        const identifier = getModuleIdentifierByRequire(path, moduleName)
        if (identifier) {
          resolve(identifier)
        }
      },
    })
    resolve('')
  })

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
