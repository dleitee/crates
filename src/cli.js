#!/usr/bin/env node
const prog = require('caporal')
// eslint-disable-next-line import/no-extraneous-dependencies
const glob = require('glob')

const generator = require('./generator').default

prog
  .version('0.0.2')
  .help('A tool to generate your locale files compatible with i18n.')
  .command('create', 'Create translations files.')
  .option(
    '-g, --glob <pattern>',
    'Search pattern to create the translations files.',
    null,
    '**/*.js'
  )
  .option('-l, --lang <languages>', 'Languages to translate.', prog.LIST)
  .option(
    '-e, --exclude <pattern>',
    'Exclude files with pattern',
    prog.LIST,
    '**/node_modules/**,**/.git/**'
  )
  .action(async (args, options, logger) => {
    try {
      await glob(options.glob, { dot: true, ignore: options.exclude }, async (err, files) => {
        if (err) {
          logger.info(err)
          return
        }
        await generator(files, options.lang)
      })
    } catch (error) {
      console.error('CLI:', error)
    }
  })

prog.parse(process.argv)
