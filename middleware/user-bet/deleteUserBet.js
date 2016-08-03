/**
 * Created by Koszta Ádám on 2016. 03. 28..
 */

/**
 * Egy adott felhasznalo fogadasanak torlese
 */
module.exports = function (objectRepository) {

    return function (req, res, next) {
        if (typeof res.tpl.userbet === 'undefined') {
            return next();
        }

        var userbet = res.tpl.userbet;

        userbet.remove(function (err) {
            if (err) {
                return next(err);
            }

            return next();
        });
    };

};