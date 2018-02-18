import * as types from '@babel/types'

import { getASTFromCode, getModuleIdentifier } from '../src/utils/ast'

describe('get AST from code', () => {
  test('should return a file type', () => {
    const code = `
    import crates from 'crates'
    import { format } from 'strman'
    `
    const ast = getASTFromCode(code, { sourceType: 'module' })
    expect(types.isFile(ast)).toBeTruthy()
  })
})

describe('get module identifiers', () => {
  test('using import declaration', async () => {
    const code = `
    import crates from 'crates'
    import { format } from 'strman'
    `
    const ast = getASTFromCode(code, { sourceType: 'module' })
    expect(await getModuleIdentifier(ast, 'crates')).toEqual('crates')
  })
  test('using import declaration and replacing name', async () => {
    const code = `
    import _ from 'crates'
    `
    const ast = getASTFromCode(code, { sourceType: 'module' })
    expect(await getModuleIdentifier(ast, 'crates')).toEqual('_')
  })
  test('using require declaration', async () => {
    const code = `
    const crates = require('crates')
    `
    const ast = getASTFromCode(code, { sourceType: 'module' })
    expect(await getModuleIdentifier(ast, 'crates')).toEqual('crates')
  })
  test('using require declaration and replacing name', async () => {
    const code = `
    const _ = require('crates')
    `
    const ast = getASTFromCode(code, { sourceType: 'module' })
    expect(await getModuleIdentifier(ast, 'crates')).toEqual('_')
  })
})
