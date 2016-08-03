/**
 * Created by Koszta Ádám on 2016. 03. 28..
 */

/**
 * Ha a felhasznalo nincs bejelentkezve, atiranyitjuk /
 */
module.exports = function (objectRepository) {

    return function (req, res, next) {
        if (typeof req.session.userid === 'undefined') {
            return res.redirect('/');
        }

        res.tpl.userid = req.session.userid;

        return next();
    };

};