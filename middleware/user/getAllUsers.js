/**
 * Created by Koszta Ádám on 2016. 03. 28..
 */

var requireOption = require('../generic/dependency').requireOption;

/**
 * Osszes felhasznalo betoltese
 */
module.exports = function (objectRepository) {

    var userModel = requireOption(objectRepository, 'userModel');

    return function (req, res, next) {

        // osszes felhasznalo lekerdezese
        userModel.find({}, function (err, results) {
            if (err) {
                return next(err);
            }

            res.tpl.users = results;

            return next();
        });

    };

};