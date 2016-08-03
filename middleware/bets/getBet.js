/**
 * Created by Koszta Ádám on 2016. 03. 28..
 */

var requireOption = require('../generic/dependency').requireOption;

/**
 * Egy fogadasi esemeny lekerdezese (osszes lehetseges kimenettel)
 */
module.exports = function (objectRepository) {

    var betModel = requireOption(objectRepository, 'betModel');

    return function (req, res, next) {

        // parameterek ellenorzese
        if ((typeof req.params.betid === 'undefined') || (req.params.betid === 'null')) {
            return next();
        }

        // fogadasi esemeny megkeresese
        betModel.findOne({_id: req.params.betid}, function (err, result) {
            if (err) {
                return next(err);
            }

            res.tpl.bet = result;

            return next();
        });

    };

};