const request = require('request');

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

  const body = {
    attachments: [
      {
         color: '#e04c2c',
         mrkdwn_in: ['text', 'pretext'],
         text: msg
        'fallback': msg,
        'pretext': msg
      }
    ]
  }

  request.post({
    json: true,
    url: process.env.SLACK_WEBHOOK_URL,
    body: body
  });
}
