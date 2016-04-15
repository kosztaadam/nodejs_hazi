/**
 * Created by Koszta Ádám on 2016. 03. 28..
 */

var autMW = require('../middleware/generic/auth');
var getAllBetsMW = require('../middleware/bets/getAllBets');
var getBetMW = require('../middleware/bets/getBet');
var newUserBetMW = require('../middleware/user-bet/newUserBet');
var modifyUserMW = require('../middleware/user/modifyUser');

// bejelentkezes ellenorzese
// osszes fogadasi lehetoseg listazasa
// uj fogadas
// profil frissitese (a penz levonasa)

module.exports = function (app) {

    /**
     * Fogadasi esemenyek listazasa
     */

    app.use('/bets',
        autMW(objectrepository),
        getAllBetsMW(objectrepository),
        renderMW(objectrepository,'bets')
    );

    /**
     * Uj fogadas felulete
     */

    app.use('/bets/new/:itemid/',
        autMW(objectrepository),
        getBetMW(objectrepository),
        renderMW(objectrepository,'newbet')
    );


    /**
     * Uj fogadas
     */

    app.use('/user-bet/new/:guess',
        autMW(objectrepository),
        getBetMW(objectrepository),
        newUserBetMW(objectrepository),
        modifyUserMW(objectrepository),
        function (req, res, next) {
            return res.redirect('/profile');
        }
    );

};