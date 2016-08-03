/**
 * Created by Koszta Ádám on 2016. 03. 28..
 */

var requireOption = require('../generic/dependency').requireOption;

/**
 * Egy fogadas lekerdezese (sajat tippel)
 */
module.exports = function (objectRepository) {

    var userBetModel = requireOption(objectRepository, 'userBetModel');

    return function (req, res, next) {

        // parameterek ellenorzese
        if ((typeof req.params.userbetid === 'undefined') || (req.params.userbetid === 'null')) {
            return next();
        }

        // fogadasi esemeny megkeresese
        userBetModel.findOne({_id: req.params.userbetid}, function (err, result) {
            if (err) {
                return next(err);
            }

            res.tpl.userbet = result;
            res.tpl.userbetguess = result.guess;

            return next();
        });

    };

};