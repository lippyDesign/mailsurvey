// figure out what set of credentials to return

// if Node env is production
if (process.env.NODE_ENV === 'production') {
  // import and then immidiately export prod keys
  module.exports = require('./prod');
} else { // if Node env is not production, we are in development mode
  // import and then immidiately export dev keys
  module.exports = require('./dev');
}