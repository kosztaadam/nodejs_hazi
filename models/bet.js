/**
 * Created by Koszta Ádám on 2016. 04. 23..
 */

/**
 * Comment model (mock)
 * @constructor
 */
    /*
var Bet = function () {
};
*/
/**
 * An instance
 */
    /*
var BetMock = {
    id: 1,
    name: "Bayern - Hertha",
    home: 2.5,
    draw: 3,
    away: 1.5
};
*/
/**
 * Find one element with the criteria
 * @param criteria
 * @param cb error first callback
 * @returns {*}
 */
/*
Bet.findOne = function (criteria, cb) {

    //returns 1 mocked item
    return cb(null, BetMock);
};
/*
/**
 * Find all elements with the criteria
 * @param criteria
 * @param cb error first callback
 * @returns {*}
 */
/*
Bet.find = function (criteria, cb) {

    //returns 3 mocked item
    return cb(null, [BetMock, BetMock, BetMock]);
};
*/
/**
 * Save the item to the db
 * @param cb error first callback
 * @returns {*}
 */
/*
Bet.prototype.save = function (cb) {
    return cb(null, this);
};
*/

/**
 * Delete an object
 * @param cb
 * @returns {*}
 */
/*
Bet.prototype.remove = function (cb) {
    return cb(null);
};
*/

var Schema = require('mongoose').Schema;
var db = require('../config/db');

var Bet = db.model('Bet', {
    name: String,
    home: Number,
    draw: Number,
    away: Number
});

module.exports = Bet;
