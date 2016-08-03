/**
 * Created by Koszta Ádám on 2016. 03. 28..
 */

/**
 * Ha a felhasznalo megnyitja az kezdolapot, akkor:
 * /login ha nincs bejelentkezve
 * /betslist ha be van
 */
module.exports = function (objectrepository) {

    return function (req, res, next) {

        if (typeof req.session.userid === 'undefined') {
            return res.redirect('/login');
        } else {
            return res.redirect('/bets');
        }
    };

};