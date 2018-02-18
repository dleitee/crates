import { getModuleIdentifier, getASTFromCode, getTranslationsMap } from './utils/ast'

const parser = async (code, options = {}) => {
  const defaultOptions = {
    sourceType: 'module',
    moduleName: 'crates',
    ...options,
  }
  const ast = getASTFromCode(code, {
    sourceType: defaultOptions.sourceType,
  })
  const moduleIdentifier = await getModuleIdentifier(ast, defaultOptions.moduleName)
  return getTranslationsMap(ast, moduleIdentifier)
}

export default parser
