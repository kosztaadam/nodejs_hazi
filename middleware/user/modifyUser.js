/**
 * Created by Koszta Ádám on 2016. 03. 28..
 */

var requireOption = require('../generic/dependency').requireOption;

/**
 * Felhasznalo penzosszegenek modositasa
 */
module.exports = function (objectRepository) {

    var userModel = requireOption(objectRepository, 'userModel');

    return function (req, res, next) {

        var user = res.tpl.user;

        if (typeof res.tpl.user === 'undefined') {
            return next();
        }

        if (typeof req.params.addbank !== 'undefined') {
            res.tpl.user.bank += parseInt(req.params.addbank);
        }

        //console.log(res.tpl.userbetguess);

        if (typeof res.tpl.userbetguess !== 'undefined') {
            res.tpl.user.bank -= 1000;
        }

        user.save(function (err, result) {
            if (err) {
                return next(err);
            }
        });

        //console.log(res.tpl.user.bank);

        return next();
    };

};