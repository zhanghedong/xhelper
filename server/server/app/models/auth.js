/**
 * Module dependencies
 */
var crypto = require('crypto')
    , cU = require('../../assets/lib/common-utilities')
    , mongoose = require('mongoose')
    , msg = require('../../config/messages')
    , Promise = require('bluebird')
    , sanitize = require('../../assets/lib/sanitizer-extended')
    , Schema = mongoose.Schema
    , uid = require('uid2')
    , validate = require('../../assets/lib/validator-extended');

/**
 * Auth schema
 */
var AuthSchema = new Schema({
    auth_key:String,
    access_token:String,
    expires_in:String,
    refresh_token:String,
    ip:String,
    create_at: { type : Date, default: Date.now }
});

/**
 * Pre-save hook
 */
mongoose.model('Auth', AuthSchema);
