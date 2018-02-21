#!/usr/bin/env node
const prog = require('caporal')
// eslint-disable-next-line import/no-extraneous-dependencies
const glob = require('glob')

const generator = require('./generator').default

prog
  .version('0.0.2')
  .help('A dynamic library to internationalize your things.')
  .command('create', 'Create translations files.')
  .option(
    '-g, --glob <pattern>',
    'Search pattern to create the translations files.',
    null,
    '**/*.js'
  )
  .option('-l, --lang <languages>', 'Languages to translate.', prog.LIST)
  .action(async (args, options, logger) => {
    await glob(options.glob, {}, async (err, files) => {
      if (err) {
        logger.info(err)
        return
      }
      await generator(files, options.lang)
    })
  })

prog.parse(process.argv)
