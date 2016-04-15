/**
 * Created by Koszta Ádám on 2016. 03. 28..
 */

var autMW = require('../middleware/generic/auth');
var getUserAllBetsMW = require('../middleware/user-bet/getUserAllBets');

var getUserMW = require('../middleware/generic/getUser');
var modifyUserBetMW = require('../middleware/user-bet/modifyUserBet');
var getUserBetMW = require('../middleware/user-bet/getUserBet');
var deleteUserBetMW = require('../middleware/user-bet/deleteUserBet');

// bejelentkezes ell.
// A felhasznalohoz tartozo fogadasok listazasa
// adott fogadas modositasa
// adott fogadas torlese
// bankhoz penz hozzaadasa

module.exports = function (app) {

    /**
     * Sajat fogadasok listazasa
     */

    app.use('/profile',
        autMW(objectrepository),
        getUserAllBetsMW(objectrepository),
        renderMW(objectrepository,'userbets')
    );

    /**
     * Fogadas modositasa
     */

    app.use('/userbets/:userid/:betid/modify',
        autMW(objectrepository),
        getUserMW(objectrepository),
        getUserBetMW(objectrepository),
        modifyUserBetMW(objectrepository),
        renderMW(objectrepository,'newbet')
    );

    /**
     * Fogadas torlese
     */

    app.use('/userbets/:userid/:betid/delete',
        autMW(objectrepository),
        getUserMW(objectrepository),
        getUserBetMW(objectrepository),
        deleteUserBetMW(objectrepository),
        function (req, res, next) {
            return res.redirect('/profile');
        }
    );

    /**
     * Egyenleg modositasa
     */

    app.use('/:userid/:bank',
        autMW(objectrepository),
        getUserMW(objectrepository),
        modifyUserBetMW(objectrepository),
        function (req, res, next) {
            return res.redirect('/profile');
        }
    );

};