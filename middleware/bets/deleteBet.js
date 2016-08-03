/**
 * Created by Koszta Ádám on 2016. 03. 28..
 */

/**
 * Adott fogadasi esemeny torlese
 */
module.exports = function (objectRepository) {

    return function (req, res, next) {
        if (typeof res.tpl.bet === 'undefined') {
            return next();
        }

        var bet = res.tpl.bet;

        bet.remove(function (err) {
            if (err) {
                return next(err);
            }

            return next();
        });
    };

};