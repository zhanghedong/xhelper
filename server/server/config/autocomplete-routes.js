
/**
 * Middleware
 */
var Router = require('koa-router')
  , routes = new Router();

/**
 * Controllers
 */
var users = require('../app/controllers/users');

/**
 * Autocomplete router; separate from primary router to avoid session queries
 */
routes.get('/api/autocomplete/users/:user', users.autocomplete);

module.exports = routes;
