/**
 * Created by Koszta Ádám on 2016. 03. 28..
 */

var requireOption = require('../generic/dependency').requireOption;
var ObjectId = require('mongoose').Schema.Types.ObjectId;

/**
 * Felhasznalo adott esemenyre fogadhat
 */
module.exports = function (objectRepository) {

    var betModel = requireOption(objectRepository, 'betModel');
    var userModel = requireOption(objectRepository, 'userModel');
    var userBetModel = requireOption(objectRepository, 'userBetModel');

    return function (req, res, next) {

        if (typeof res.tpl.bet === 'undefined') {
            return next();
        }

        var newuserbet = undefined;
        newuserbet = new userBetModel();
        newuserbet.guess = res.tpl.userbetguess;
        newuserbet.name = res.tpl.bet.name;
        newuserbet._bet = res.tpl.bet.id;
        newuserbet._user = res.tpl.user.id;
        newuserbet.user = res.tpl.user.email;

       /* userModel.findById(req.session.userid, function (err, me) {
            newuserbet._user = me;
        });*/

        newuserbet.save(function (err) {
            if (err) {
                return next(err);
            }

            return next();
        });
    };

};