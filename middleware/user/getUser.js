/**
 * Created by Koszta Ádám on 2016. 03. 28..
 */

var requireOption = require('../generic/dependency').requireOption;

/**
 * Felhasznaloi fiok id alapjan betoltese
 */
module.exports = function (objectRepository) {

    var userModel = requireOption(objectRepository, 'userModel');

    return function (req, res, next) {

        // parameterek ellenorzese
        if ((typeof res.tpl.userid === 'undefined') || (res.tpl.userid === 'null')) {
            return next();
        }

        // felhasznalo megkeresese
        userModel.findOne({_id: res.tpl.userid}, function (err, result) {
            if (err) {
                return next(err);
            }

            res.tpl.user = result;

            return next();
        });

    };

};
