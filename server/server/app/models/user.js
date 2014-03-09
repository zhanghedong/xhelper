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
 * Schema dependencies; subdocuments
 */
var AuthSchema = mongoose.model('Auth').schema;
//  , Location = mongoose.model('Location')
//  , LocationSchema = require('../../config/schemas').location;

/**
 * User schema
 */
var UserSchema = new Schema({
    nickname: {
        type: String,
        validate: [
            { validator: validate.notNull, msg: msg.username.isNull }
        ]
    },
    slug: {
        type: String,
        index: { unique: true }
    },
    email: {
        type: String,
        validate: [
            { validator: validate.isEmail, msg: msg.email.notEmail },
            { validator: validate.notNull, msg: msg.email.isNull }
        ]
    },
    password: String,
    auth_source:String,
    open_id:String,
    auth:[AuthSchema],
    create_at: { type : Date, default: Date.now }
});

/**
 * Pre-save hook
 */
UserSchema.pre('save', function (next) {
    this.slug = cU.slug(this.nickname, true);
    next();
});
mongoose.model('User', UserSchema);
