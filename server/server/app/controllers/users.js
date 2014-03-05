/**
 * Module dependencies
 */
var coBody = require('co-body')
    , cU = require('../../assets/lib/common-utilities')
    , mongoose = require('mongoose')
    , msg = require('../../config/messages')
    , Promise = require('bluebird')
    , _ = require('underscore');

/**
 * Models
 */
var User = mongoose.model('User');

/**
 * Mongo projection paramater; includes or excludes fields
 */
var projection = { _id: 0, __v: 0, hash: 0, salt: 0};

module.exports = {
    findOne: function *(next) {
        this.user = yield Promise.promisify(User.findOne, User)({ slug: this.params.username });
        yield next;
        delete this.user;
    },
    /**
     * Index
     * GET /api/users
     */
    index: function *(next) {
        this.body = yield Promise.promisify(User.find, User)({}, projection);
    },

    /**
     * Show
     * GET /api/users/:username
     */
    show: function *(next) {
        if (!this.user) return yield next; // 404 Not Found
        this.body = yield cU.censor(this.user, ['_id', '__v', 'hash', 'salt', 'path']);
    },

    /**
     * Create
     * POST /api/users
     */
    create: function *(next) {
        var info = yield coBody(this);
        var user = new User(info);
        yield Promise.promisify(user.save, user)();
        this.session.user = user;
        this.status = 201; // 201 Created
        this.body = yield cU.created('user', user, user.username);
    },

    /**
     * Update
     * PUT /api/users/:username
     */
    update: function *(next) {
        if (!this.user) return yield next; // 404 Not Found
        this.user = _.extend(this.user, yield coBody(this));
        yield Promise.promisify(this.user.save, this.user)();
        this.body = yield cU.updated('user', this.user, this.user.username);
    }
};
