/**
 * Created by Koszta Ádám on 2016. 04. 24..
 */

var Schema = require('mongoose').Schema;
var db = require('../config/db');


var UserBet = db.model('UserBet', {
    guess: String,
    name: String,
    user: String,
    _user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    _bet: {
        type: Schema.Types.ObjectId,
        ref: 'Bet'
    }
});

module.exports = UserBet;