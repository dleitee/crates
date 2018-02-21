import { getModuleIdentifier, getASTFromCode, getTranslationsMap } from './utils/ast'

const parser = async (code, options = {}) => {
  const defaultOptions = {
    sourceType: 'module',
    moduleName: 'crates',
    plugins: [],
    ...options,
  }
  const ast = getASTFromCode(code, {
    sourceType: defaultOptions.sourceType,
    plugins: ['jsx', 'flow', 'flowComments', 'typescript', ...defaultOptions.plugins],
  })
  try {
    const moduleIdentifier = await getModuleIdentifier(ast, defaultOptions.moduleName)
    return getTranslationsMap(ast, moduleIdentifier)
  } catch (error) {
    console.error('Parser:', error)
    return new Map()
  }
}

export default parser
