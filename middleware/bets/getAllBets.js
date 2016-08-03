/**
 * Created by Koszta Ádám on 2016. 03. 28..
 */

var requireOption = require('../generic/dependency').requireOption;

/**
 * Osszes fogadasi esemeny lekerdezese
 */
module.exports = function (objectRepository) {

    var betModel = requireOption(objectRepository, 'betModel');

    return function (req, res, next) {
        // osszes fogadasi esemeny lekerdezese
        betModel.find({}, function (err, results) {
            if (err) {
                return next(err);
            }

            res.tpl.bet = results;

            return next();
        });

    };

};