import { getModuleIdentifier, getASTFromCode, getTranslationsMap } from './utils/ast'

const parser = async (code, options = {}) => {
  const defaultOptions = {
    sourceType: 'module',
    moduleName: 'crates',
    plugins: [],
    ...options,
  }
  try {
    const ast = getASTFromCode(code, {
      sourceType: defaultOptions.sourceType,
      plugins: [
        'doExpressions',
        'objectRestSpread',
        'decorators',
        'decorators2',
        'classProperties',
        'exportDefaultFrom',
        'exportNamespaceFrom',
        'asyncGenerators',
        'dynamicImport',
        'jsx',
        'flow',
        'flowComments',
        'typescript',
        ...defaultOptions.plugins,
      ],
    })
    const moduleIdentifier = await getModuleIdentifier(ast, defaultOptions.moduleName)
    return getTranslationsMap(ast, moduleIdentifier)
  } catch (error) {
    console.error('Parser:', error)
    return new Map()
  }
}

export default parser
