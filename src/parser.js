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

const parser = async (file, options = {}) => {
  const defaultOptions = {
    sourceType: 'module',
    moduleName: 'crates',
    ...options,
  }
  const ast = parse(file, {
    sourceType: defaultOptions.sourceType,
  })
  const moduleIdentifier = await getModuleIdentifier(ast, defaultOptions.moduleName)
}

export default parser
