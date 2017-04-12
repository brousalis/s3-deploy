var s3 = require('s3');
var chalk = require('chalk');
var log = require('./util').log;
var slack = require('./util').slack;

var env = process.env.NODE_ENV;

require('dotenv').config({
  path: '.env' + (env === 'development' ? '' : '.' + env),
  silent: true
});

var deploy = function() {
  log('Deploying', chalk.blue(env), 'to', chalk.blue(process.env.AWS_BUCKET));

  var client = s3.createClient({
    s3Options: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  var uploader = client.uploadDir({
    localDir: 'build',
    deleteRemoved: true,
    s3Params: {
      Bucket: process.env.AWS_BUCKET
    },
  });

  uploader.on('error', function(err) {
    log(chalk.red('Failed!'), 'Unable to sync:', err.stack);
  });

  uploader.on('fileUploadStart', function(localFilePath, s3Key) {
    console.log('  Uploading', chalk.yellow(localFilePath));
  });

  uploader.on('end', function() {
    log('🍺  Upload complete!');

    slack(`Deployed *${process.env.NODE_ENV}* build to S3 bucket ${process.env.AWS_BUCKET}`);
  });
}

module.exports = deploy;
