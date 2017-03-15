#! /usr/bin/env node

const deploy = require('../src/index');
const chalk = require('chalk');
const log = require('../src/util').log;

if (!process.env.AWS_KEY || !process.env.AWS_BUCKET || !process.env.AWS_SECRET) {
  log(chalk.red('Failed!'), 'You seem to missing the AWS bucket config in your .env.');
  return false;
}

deploy();
