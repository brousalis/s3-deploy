#! /usr/bin/env node

var deploy = require('../src/index');
var chalk = require('chalk');
var log = require('../src/util').log;

if (!process.env.AWS_ACCESS_KEY_ID
  || !process.env.AWS_BUCKET
  || !process.env.AWS_SECRET) {
  log(chalk.red('Failed!'), 'You seem to missing the AWS bucket config in your .env.');
  return false;
}

deploy();
