var mainRedirectMW = require('../middleware/generic/mainRedirect');
var inverseAuthMW = require('../middleware/generic/inverseAuth');
var checkUserLoginMW = require('../middleware/user/checkUserLogin');
var checkUserRegistrationMW = require('../middleware/user/checkUserRegistration');
var logoutMW = require('../middleware/generic/logout');
var renderMW = require('../middleware/generic/render');

var userModel = require('../models/user');


module.exports = function (app) {

    var objectRepository = {
        userModel: userModel
    };

    /**
     * Kezdolap
     */
    app.get('/',
        mainRedirectMW(objectRepository)
    );

    /**
     * Bejelentkezes
     */
    app.use('/login',
        inverseAuthMW(objectRepository),
        checkUserLoginMW(objectRepository),
        renderMW(objectRepository, 'login')
    );

    /**
     * Kijelentkezes - kezdolap
     */
    app.get('/logout',
        logoutMW(objectRepository),
        function(req, res, next){
            res.redirect('/');
        }
    );

    /**
     * Regisztracio
     */
    app.use('/register',
        inverseAuthMW(objectRepository),
        checkUserRegistrationMW(objectRepository),
        renderMW(objectRepository, 'register')
    );

}