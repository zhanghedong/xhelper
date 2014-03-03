
/** LOCALIZE CONFIGURATION AND RENAME TO 'config.js' */

/**
 * Module dependencies.
 */
var path = require('path')
  , port = process.env.PORT || 3010
  , rootPath = path.normalize(__dirname + '/../..');

module.exports = {
  development: {
    env: 'development',
    mongo: {
      host: 'localhost',
      db: 'db_dev1'
    },
    path: {
      root: rootPath
    },
    port: port,
    secrets: ['secretString']
  },
  production: {
    env: 'production',
    mongo: {
      host: 'localhost',
      db: 'db_prod'
    },
    path: {
      root: rootPath
    },
    port: port,
    secrets: ['secretString']
  }
};
