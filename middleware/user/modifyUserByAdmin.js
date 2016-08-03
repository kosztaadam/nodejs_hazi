/**
 * Created by Koszta Ádám on 2016. 05. 08..
 */

/**
 * Created by Koszta Ádám on 2016. 03. 28..
 */

var requireOption = require('../generic/dependency').requireOption;

/**
 * Felhasznalo penzosszegenek modositasa admin altal
 */
module.exports = function (objectRepository) {

    var userModel = requireOption(objectRepository, 'userModel');

    return function (req, res, next) {

        // parameterek ellenorzese
        if ((typeof req.body === 'undefined') || (typeof req.body.bank === 'undefined')) {
            return next();
        }

        var user = res.tpl.user;

        if (typeof res.tpl.user === 'undefined') {
            return next();
        }

        if (typeof req.body.bank !== 'undefined') {
            res.tpl.user.bank = parseInt(req.body.bank);
        }

        user.save(function (err, result) {
            if (err) {
                return next(err);
            }
        });

        return res.redirect('/admin');
    };

};