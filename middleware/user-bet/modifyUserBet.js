/**
 * Created by Koszta Ádám on 2016. 03. 28..
 */

var requireOption = require('../generic/dependency').requireOption;

/**
 * Egy adott felhasznalo fogadasanak modositasa
 */
module.exports = function (objectRepository) {

    var userBetModel = requireOption(objectRepository, 'userBetModel');

    return function (req, res, next) {

        var userbet = undefined;

        if (typeof res.tpl.userbet === 'undefined') {
            return next();
        }

        userbet = res.tpl.userbet;

        userbet.guess = req.body.guess;

        user.save(function (err, result) {
            if (err) {
                return next(err);
            }

            return res.redirect('/profile/');
        });

    };
};