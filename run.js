#!/usr/bin/env node

const program = require('commander');
const execute = require('./index');

program
  .version(require('./package.json').version)
  .option(
    '-t, ---treatment <treatment>',
    ''
  )
  .option(
    '-r, ---trials <trials>',
    'Comma separated list of trials'
  )
  .option(
    '-m, ---milliseconds <milliseconds>',
    'Milliseconds to timeout between requests, defaults to 5000'
  )
  .parse(process.argv);

execute(program);