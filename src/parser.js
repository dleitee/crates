import { getASTFromCode, getTranslationsMap } from './utils/ast'

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
      plugins: ['classProperties', 'jsx', ...defaultOptions.plugins],
    })
    return getTranslationsMap(ast, '__')
  } catch (error) {
    console.error('Parser:', error)
    return new Map()
  }
}

export default parser
