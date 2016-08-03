/**
 * Created by Koszta Ádám on 2016. 03. 28..
 */

var requireOption = require('../generic/dependency').requireOption;

/**
 * A felhasznalo bejelentkezesenek ellenorzese
 * Ha helyes, akkor belepes
 * Ha helytelen, akkor hiba
 */
module.exports = function (objectRepository) {

    var userModel = requireOption(objectRepository, 'userModel');

    return function (req, res, next) {

        // parameterek ellenorzese
        if ((typeof req.body === 'undefined') || (typeof req.body.email === 'undefined') ||
            (typeof req.body.password === 'undefined')) {
            return next();
        }

        // felhasznalo keresese
        userModel.findOne({
            email: req.body.email
        }, function (err, result) {
            if ((err) || (!result)) {
                res.tpl.error.push('Your email address is not registered!');
                return next();
            }

            //check password
            if (result.password !== req.body.password) {
                res.tpl.error.push('Wrong password!');
                return next();
            }

            //login is ok, save id to session
            req.session.userid = result._id;

            //redirect to / so the app can decide where to go next
            return res.redirect('/');
        });
    };

};