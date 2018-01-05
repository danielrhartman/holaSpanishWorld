var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var config = require('../config');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name:       {
        type:   String,
        required: true
    },
    email:      {
        type:   String,
        required: true,
        unique: true
    },
    credits:    Number,
    type:       String,
    hash:       String,
    salt:       String
});

userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 1);

    return jwt.sign({
        _id:    this._id,
        name:   this.name,
        exp:    parseInt(expiry.getTime() / 1000),
    }, config.secret);

};
module.exports = mongoose.model('User', userSchema);
