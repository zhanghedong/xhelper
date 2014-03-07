
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
    },
    /**
     * Index
     * GET /api/users
     */
    index: function *(next) {
    },

    /**
     * Show
     * GET /api/users/:username
     */
    show: function *(next) {
    },

    /**
     * Create
     * POST /api/users
     */
    create: function *(next) {
    },

    /**
     * Update
     * PUT /api/users/:username
     */
    update: function *(next) {
    }
};
