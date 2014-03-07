
/**
 * Module dependencies
 */
var coBody = require('co-body')
    , cU = require('../../assets/lib/common-utilities')
    , mongoose = require('mongoose')
    , msg = require('../../config/messages')
    , Promise = require('bluebird')
    , _ = require('underscore')
    ,OAuth2 = require('simple-oauth2');

/**
 * Models
 */
var User = mongoose.model('User');


/**
 * Mongo projection paramater; includes or excludes fields
 */
var projection = { _id: 0, __v: 0, hash: 0, salt: 0};
var oAuth = null;
module.exports = {
    findOne: function *(next) {
    },
    /**
     * Index
     * GET /api/users
     */
    index: function *(next) {
//        this.body = yield Promise.promisify(User.find, User)({}, projection);

    },
    /**
     * Create
     * get /api/oauth
     */
    create: function *(next) {

//        var info = yield coBody(this);
//        console.log(info);
        //测试
         oAuth = OAuth2({
            clientID: 101032455,
            clientSecret: '46ac011c5fe9e61df04e0c19a6782e07',
            site: 'https://graph.qq.com/oauth2.0',
            tokenPath: '/token'
        });
// Authorization uri definition
        var authorization_uri = oAuth.AuthCode.authorizeURL({
            redirect_uri: 'http://quickdial.czmin.com/api/oauth/callback',
            scope: 'get_user_info',
            state: '3(#0/!~'
        });
        console.log(authorization_uri);
        this.response.redirect(authorization_uri);

    },

    /**
     * callback
     * get /api/oauth/callback
     */
    callback: function *(next) {
////        var info = yield coBody(this);
//        console.log(this.request.query);
////        console.log(info);
//        this.body = this.request.query;
        var code = this.request.query.code;
        console.log('/callback');
        oAuth.AuthCode.getToken({
            code: code,
            redirect_uri: 'http://quickdial.czmin.com/api/oauth/callback'
        }, saveToken);

        function saveToken(error, result) {
            if (error) { console.log('Access Token Error', error.message); }
            console.log(result);
            token = oAuth.AccessToken.create(result);
            console.log(token)
        }
    }
};
