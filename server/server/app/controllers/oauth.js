/**
 * Module dependencies
 */
var coBody = require('co-body')
    , cU = require('../../assets/lib/common-utilities')
    , mongoose = require('mongoose')
    , msg = require('../../config/messages')
    , Promise = require('bluebird')
    , _ = require('underscore')
    , OAuth2 = require('simple-oauth2')
    , qs = require('querystring');

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
            tokenPath: '/token',
            authSource: 'qq'
        });
// Authorization uri definition
        var authorization_uri = oAuth.AuthCode.authorizeURL({
            redirect_uri: 'http://quickdial.czmin.com/api/oauth/callback',
            scope: 'get_user_info',
            state: '3(#0/!~'
        });
        this.response.redirect(authorization_uri);
    },

    /**
     * callback
     * get /api/oauth/callback
     */
    callback: function *(next) {
        var code = this.request.query.code;
        oAuth.AuthCode.getToken({
            code: code,
            redirect_uri: 'http://quickdial.czmin.com/api/oauth/callback'
        }, saveToken);


        function saveToken(error, result) {
            if (error) {
                console.log('Access Token Error', error.message);
            }
            result = qs.parse(result);
            var token = oAuth.AccessToken.create(result);
            oAuth.AuthCode.getOpenID({access_token: token.token.access_token}, saveOpenID);
        }

        function saveOpenID(error, result) {
            if (error) {
                console.log('Access Token Error', error.message);
            }
            result = result.split('( ')[1].split(' )')[0];
            result = JSON.parse(result);
            var params = {
                access_token: oAuth.AccessToken.token.access_token,
                oauth_consumer_key: 101032455,
                openid: result.openid
            };
            var openId = oAuth.OpenId.create(result);

            params = qs.stringify(params);
            oAuth.AuthCode.getOAuthApi('https://graph.qq.com/user/get_user_info', params, saveUserInfo);
        }

        function saveUserInfo(error, result) {
            console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
            if (error) {
                console.log('Access Token Error', error.message);
            }
            var user =yield Promise.promisify(User.findOne, User)({ $and: [
                { open_id: oAuth.OpenId.open_id },
                { auth_source: 'qq'}
            ]});
            console.log('user====',user);
            var auth = {
                auth_key: 'abcdefg',
                access_token: oAuth.AccessToken.token.access_token,
                expires_in: oAuth.AccessToken.token.expires_in,
                refresh_token: oAuth.AccessToken.token.refresh_token,
                ip: '127.0.0.1'
            };
            if (!user) {
                var tUser = {
                    nickname: result.nickname,
                    password: '',
                    email: '',
                    auth_source: oAuth.authSource,
                    open_id: oAuth.open_id,
                    auth: []
                };
                tUser.auth.push(auth);
//                console.log(tUser);
                var userModule = new User(info);
//                console.log(userModule);
               Promise.promisify(userModule.save, userModule)();
            }

//            var user = yield Promise.promisify(User.findOne, User)({ $or: [ { open_id: body.username }, { email: body.username } ] });

//            var user = yield Promise.promisify(User.findOne, User)({ $or: [ { open_id: body.username }, { email: body.username } ] });
//            var body = yield coBody(this);
        }

        this.response.redirect('chrome-extension://hllbdbijccgeammmmdakojjlphjegnci/index.html');
    }
};
