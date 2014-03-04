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
 * User schema
 */
var UserSchema = new Schema({
    email: {
        type: String,
        validate: [
            { validator: validate.notNull, msg: msg.email.isNull }
        ]
    },
    password: String,
    username: {
        type: String,
        validate: [
            { validator: validate.notNull, msg: msg.username.isNull }
        ]
    }
});
mongoose.model('User', UserSchema);
