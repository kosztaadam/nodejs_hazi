/**
 * Created by Koszta Ádám on 2016. 03. 28..
 */

var autMW = require('../middleware/generic/auth');
var renderMW = require('../middleware/generic/render');

var getAllUserWithAllBetsMW = require('../middleware/user-bet/getAllUserWithAllBets');
var getAllUsersMW = require('../middleware/generic/getAllUser');
var getUserBetMW = require('../middleware/user-bet/getUserBet');
var deleteUserBetMW = require('../middleware/user-bet/deleteUserBet');
var getUserMW = require('../middleware/user/getUser');;
var addBetMW = require('../middleware/bets/addBet');
var getBetMW = require('../middleware/bets/getBet');
var deleteBetMW = require('../middleware/bets/deleteBet');

// bejelentkezes ell.
// A felhasznalokhoz tartozo fogadasok listazasa
// adott fogadas-felhasznalo kapcsolat torlese
// adott felhasznaloi fiok bankosszegenek modositasa
// adott fiok torlese
// uj fogadasi esemeny hozzaadasa
// fogadas lezarasa (torlese es egyenleg jovairasa)

module.exports = function (app) {

    /**
     * Az egyes felhasznalokhoz tartozo fogadasok listazasa
     * Az egyes felhasznaloi fiokok listazasa
     * Az osszes fogadasi esemeny listazasa
     */

    app.use('/admin',
        autMW(objectrepository),
        getAllUserWithAllBetsMW(objectrepository),
        getAllUsersMW(objectrepository),
        getAllBetsMW(objectrepository),
        renderMW(objectrepository,'admin')
    );

    /**
     * Egy fogadasi tipp torlese
     */

    app.use('userbets/:itemid/delete',
        autMW(objectrepository),
        getUserBetMW(objectrepository),
        deleteUserBetMW(objectrepository),
        function (req, res, next) {
            return res.redirect('/admin');
        }
    );


    /*
    app.use('/admin/users',
        autMW(objectrepository),
        getAllUsersMW(objectrepository),
        renderMW(objectrepository,'users')
    );
    */

    /**
     * Egy felhasznalo modositasa
     */

    app.use('/user/:itemid/modify',
        autMW(objectrepository),
        getUserMW(objectrepository),
        renderMW(objectrepository,'modifyaccount')
    );

    /**
     * Egy felhasznalo penzenek modositasa
     */

    app.use('/modify_account/:itemid',
        autMW(objectrepository),
        getUserMW(objectrepository),
        modifyUserMW(objectrepository),
        function (req, res, next) {
            return res.redirect('/admin');
        }
    );

    /**
     * Egy felhasznalo torlese
     */

    app.use('/user/:itemid/delete',
        autMW(objectrepository),
        getUserMW(objectrepository),
        deleteUserBetMW(objectrepository),
        function (req, res, next) {
            return res.redirect('/admin');
        }
    );

    /**
     * Egy fogadasi esemeny hozzaadasa
     */

    app.use('/bets/new',
        autMW(objectrepository),
        addBetMW(objectrepository),
        function (req, res, next) {
            return res.redirect('/bets');
        }
    );


    /*
    app.use('/admin/bets',
        autMW(objectrepository),
        getAllBetsMW(objectrepository),
        renderMW(objectrepository,'adminbets')
    );
    */

    /**
     * Egy fogadasi esemeny lezarasa,
     * nyeremeny jovairasa,
     * es esemeny torlese
     */

    app.use('/bets/:betid/close',
        autMW(objectrepository),
        getBetMW(objectrepository),
        modifyUserMW(objectrepository),
        deleteBetMW(objectrepository),
        function (req, res, next) {
            return res.redirect('/admin');
        }
    );

};