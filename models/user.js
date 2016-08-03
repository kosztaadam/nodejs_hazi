/**
 * Created by Koszta Ádám on 2016. 04. 23..
 */

var Schema = require('mongoose').Schema;
var db = require('../config/db');

var User = db.model('User', {
    email: String,
    password: String,
    bank: { type: Number, default: 5000 },
    state: { type: Number, default: 0 }
});

module.exports = User;