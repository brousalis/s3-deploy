module.exports.log = function(msg) {
  console.log();
  console.log.apply(console, arguments);
  console.log();
}
