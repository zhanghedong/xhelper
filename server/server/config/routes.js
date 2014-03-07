/**
 * Middleware
 */
var requires = require('../app/middleware/auth').requires;

/**
 * Controllers
 */
var users = require('../app/controllers/users')
    ,oauth = require('../app/controllers/oauth');

module.exports = function (app) {

    // temporary test route
    app.get('/test-api/test.json', function *() {
        this.body = {
            name: 'brewGet',
            description: 'a node/koa app that facilitates the trading of beer'
        }
    });

    console.log(oauth);
    // users
    app.get('/api/users', users.index);
    app.post('/api/users', users.create);
    //oauth
    app.get('/api/oauth', oauth.create);
    app.get('/api/oauth/callback', oauth.callback);
    //app.post('/api/sync', logins.findOne,sync.create);
//  app.get('/api/users/:username', users.findOne, users.show);
//  app.put('/api/users/:username', users.findOne, requires.self, users.update);
//  app.delete('/api/users/:username', users.findOne, requires.self, users.destroy);
//  app.post('/api/users/:username/images', users.findOne, requires.self, users.images.create);
//  app.delete('/api/users/:username/images', users.findOne, requires.self, users.images.destroy);

    // redirect all remaining GET method routes to angular router
//  app.get('*', function* () {
//    this.redirect('/#!' + this.url);
//  });
}
