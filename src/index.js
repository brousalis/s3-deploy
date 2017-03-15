const s3 = require('s3');
const log = require('./util').log;

const env = process.env.NODE_ENV;

require('dotenv').config({
  path: '.env' + (env === 'development' ? '' : '.' + env),
  silent: true
});

const deploy = function() {
  log('Deploying', chalk.blue(env), 'to', chalk.blue(process.env.AWS_BUCKET));

  const client = s3.createClient({
    s3Options: {
      accessKeyId: process.env.AWS_KEY,
      secretAccessKey: process.env.AWS_SECRET,
    },
  });

  const uploader = client.uploadDir({
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
    log('  Uploading', chalk.yellow(localFilePath));
  });

  uploader.on('end', function() {
    log('🍺  Upload complete!');
  });
}

module.exports = deploy;
