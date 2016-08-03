/**
 * Created by Koszta Ádám on 2016. 03. 28..
 */

var requireOption = require('../generic/dependency').requireOption;

/**
 * Regisztracios felulet, e-mail ellenorzessel
 */

module.exports = function (objectRepository) {

    var UserModel = requireOption(objectRepository, 'userModel');

    return function (req, res, next) {

        //console.log(req.params);

        // parameterek ellenorzese
        if ((typeof req.body === 'undefined') || (typeof req.body.email === 'undefined') ||
            (typeof req.body.password === 'undefined')) {
            return next();
        }

        // felhasznaloi fiok ellenorzese
        UserModel.findOne({
            email: req.body.email
        }, function (err, result) {

            if ((err) || (result)) {
                res.tpl.error.push('Your email address is already registered!');
                return next();
            }

            //create user
            var newUser = new UserModel();
            newUser.email = req.body.email;
            newUser.password = req.body.password;
            newUser.type = "user";
            //console.log(newUser);
            newUser.save(function (err) {
                //redirect to /login
                return res.redirect('/login');
            });
        });
    };
};