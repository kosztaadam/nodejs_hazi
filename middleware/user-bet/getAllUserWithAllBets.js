/**
 * Created by Koszta Ádám on 2016. 03. 28..
 */

var requireOption = require('../generic/dependency').requireOption;

/**
 * Osszes felhasznalo osszes fogadasanak lekerdezese
 */
module.exports = function (objectRepository) {

    var userBetModel = requireOption(objectRepository, 'userBetModel');

    return function (req, res, next) {
        // osszes fogadasi tipp lekerdezese
        userBetModel.find({}, function (err, results) {
            if (err) {
                return next(err);
            }

            res.tpl.userbet = results;

            return next();
        });

    };

};