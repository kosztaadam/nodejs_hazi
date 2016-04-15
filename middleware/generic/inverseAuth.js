/**
 * Created by Koszta Ádám on 2016. 03. 28..
 */


/**
 * Ha a felhasznalo be van jelentkezve, atiranyitjuk /
 */
module.exports = function (objectrepository) {

    return function (req, res, next) {
        return next();
    };

};