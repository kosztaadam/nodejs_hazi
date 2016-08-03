/**
 * Created by Koszta Ádám on 2016. 03. 28..
 */

var requireOption = require('../generic/dependency').requireOption;

/**
 * Felhasznaloi fiok id alapjan torlese
 */
module.exports = function (objectRepository) {

    var userModel = requireOption(objectRepository, 'userModel');

    return function (req, res, next) {

        if (typeof res.tpl.user === 'undefined') {
            return next();
        }

        var user = res.tpl.user;

        user.remove(function(err) {
            if (err) {
                return next(err);
            }

            return res.redirect('/admin/');
        });
    };

};