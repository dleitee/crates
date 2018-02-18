import { getModuleIdentifier, getASTFromCode } from './utils/ast'

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
}

export default parser
