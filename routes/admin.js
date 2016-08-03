/**
 * Created by Koszta Ádám on 2016. 03. 28..
 */

var autMW = require('../middleware/generic/auth');
var renderMW = require('../middleware/generic/render');

var getAllUserWithAllBetsMW = require('../middleware/user-bet/getAllUserWithAllBets');
var getAllUsersMW = require('../middleware/user/getAllUsers');
var getUserBetMW = require('../middleware/user-bet/getUserBet');
var deleteUserBetMW = require('../middleware/user-bet/deleteUserBet');
var deleteUserBetsMW = require('../middleware/user-bet/deleteUserBets');
var deleteUserMW = require('../middleware/user/deleteUser');
var getUserMW = require('../middleware/user/getUser');
var modifyUserByAdminMW = require('../middleware/user/modifyUserByAdmin');
var modifyUserByBetMW = require('../middleware/user/modifyUserByBet');
var addBetMW = require('../middleware/bets/addBet');
var getBetMW = require('../middleware/bets/getBet');
var getAllBetsMW = require('../middleware/bets/getAllBets');
var deleteBetMW = require('../middleware/bets/deleteBet');

var betModel = require('../models/bet');
var userModel = require('../models/user');
var userBetModel = require('../models/userbet');

module.exports = function (app) {

    var objectRepository = {
        betModel: betModel,
        userModel: userModel,
        userBetModel: userBetModel
    };

    /**
     * Az egyes felhasznalokhoz tartozo fogadasok listazasa
     * Az egyes felhasznaloi fiokok listazasa
     * Az osszes fogadasi esemeny listazasa
     */

    app.get('/admin',
        autMW(objectRepository),
        getAllUserWithAllBetsMW(objectRepository),
        getAllUsersMW(objectRepository),
        getAllBetsMW(objectRepository),
        renderMW(objectRepository,'admin')
    );

    /**
     * Egy fogadasi tipp torlese
     */

    app.get('/userbet/:userbetid/delete',
        autMW(objectRepository),
        getUserMW(objectRepository),
        getUserBetMW(objectRepository),
        deleteUserBetMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/admin');
        }
    );

    /**
     * Egy felhasznalo modositasa
     */

    app.get('/user/:userid/modify',
        autMW(objectRepository),
        function (req, res, next) {
            res.tpl.userid = req.params.userid;
            return next();
        },
        getUserMW(objectRepository),
        renderMW(objectRepository,'modify_account')
    );

    app.post('/user/:userid/modify',
        autMW(objectRepository),
        function (req, res, next) {
            res.tpl.userid = req.params.userid;
            return next();
        },
        getUserMW(objectRepository),
        modifyUserByAdminMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/admin');
        }
    );

    /**
     * Egy felhasznalo torlese
     */

    app.use('/user/:userid/delete',
        autMW(objectRepository),
        function (req, res, next) {
            res.tpl.userid = req.params.userid;
            return next();
        },
        getUserMW(objectRepository),
        deleteUserMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/admin');
        }
    );

    /**
     * Egy fogadasi esemeny hozzaadasa
     */

    app.post('/admin',
        autMW(objectRepository),
        addBetMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/admin');
        }
    );

    /**
     * Egy fogadasi esemeny lezarasa,
     * nyeremeny jovairasa,
     * es esemeny torlese
     */

    app.use('/bet/:betid/close/:score',
        autMW(objectRepository),
        getBetMW(objectRepository),
        getAllUserWithAllBetsMW(objectRepository),
        modifyUserByBetMW(objectRepository),
        deleteUserBetsMW(objectRepository),
        deleteBetMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/admin');
        }
    );

    app.use('/bet/:betid/delete',
        autMW(objectRepository),
        getBetMW(objectRepository),
        deleteBetMW(objectRepository),
        deleteUserBetsMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/admin');
        }
    );

};