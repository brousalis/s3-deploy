var request = require('request');
var fs = require('fs');

module.exports.log = function(msg) {
  console.log();
  console.log.apply(console, arguments);
  console.log();
}

module.exports.slack = function(msg) {
  if (process.env.SLACK_WEBHOOK_URL === undefined ||
      process.env.SLACK_WEBHOOK_URL === '') {
    return;
  }

  var body = {
    attachments: [
      {
        color: '#e04c2c',
        mrkdwn_in: ['text', 'pretext'],
        text: msg,
        fallback: msg,
      }
    ]
  }

  request.post({
    json: true,
    url: process.env.SLACK_WEBHOOK_URL,
    body: body
  });
}

function walk(dir, action, done) {
  fs.readdir(dir, function(error, list) {
    if (error) { return done(error); }

    var i = 0;

    (function next() {
      var file = list[i++];

      if (!file) { return done(null); }

      file = dir + '/' + file;

      fs.stat(file, function(error, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(error) {
            next();
          });
        } else {
          action(file);
          // console.log(file);
          next();
        }
      });
    })();
  });
}

module.exports.walk = walk;
