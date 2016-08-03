/**
 * Created by Koszta Ádám on 2016. 03. 28..
 */

var requireOption = require('../generic/dependency').requireOption;

/**
 * Osszes fogadas lekerdezese (sajat tippel)
 */
module.exports = function (objectRepository) {

    var userBetModel = requireOption(objectRepository, 'userBetModel');

    return function (req, res, next) {

        if(res.tpl.userid == null)
            return next();

        // osszes fogadasi tipp lekerdezese egy felhasznalonak
        userBetModel.find({_user: res.tpl.userid}, function (err, results) {
            if (err) {
                return next(err);
            }

            res.tpl.userbet = results;
            return next();

        });

    };

};