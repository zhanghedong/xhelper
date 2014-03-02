
/** LOCALIZE CONFIGURATION AND RENAME TO 'config.js' */

/**
 * Module dependencies.
 */
var path = require('path')
  , port = process.env.PORT || 3010
  , rootPath = path.normalize(__dirname + '/../..')
module.exports = {
  development: {
    env: 'development',
    mongo: {
      host: 'localhost',
      db: 'db_dial_dev'
    },
    path: {
      root: rootPath,
      tmp: rootPath + '/server/assets/tmp'
    },
    port: port,
    secrets: ['secretString']
  },
  test: {
    env: 'test',
    mongo: {
      host: 'localhost',
      db: 'db_test'
    },
    path: {
      root: rootPath,
      tmp: rootPath + '/server/assets/tmp'
    },
    port: port,
    secrets: ['secretString']
  },
  production: {
    env: 'production',
    mongo: {
      host: 'localhost',
      db: 'db_dial'
    },
    path: {
      root: rootPath,
      tmp: rootPath + '/server/assets/tmp'
    },
    port: port,
    secrets: ['secretString']
  }
};
