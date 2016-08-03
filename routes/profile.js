/**
 * Created by Koszta Ádám on 2016. 03. 28..
 */

var autMW = require('../middleware/generic/auth');
var getUserAllBetsMW = require('../middleware/user-bet/getUserAllBets');
var getUserMW = require('../middleware/user/getUser');
var modifyUserMW = require('../middleware/user/modifyUser');
var modifyUserBetMW = require('../middleware/user-bet/modifyUserBet');
var getUserBetMW = require('../middleware/user-bet/getUserBet');
var deleteUserBetMW = require('../middleware/user-bet/deleteUserBet');
var getUserMW = require('../middleware/user/getUser');
var getBet = require('../middleware/bets/getBet');
var renderMW = require('../middleware/generic/render');

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
     * Sajat fogadasok listazasa
     */

    app.use('/profile',
        autMW(objectRepository),
        getUserAllBetsMW(objectRepository),
        getUserMW(objectRepository),
        renderMW(objectRepository,'profile')
    );

    /**
     * Egyenleg modositasa
     */

    app.use('/bank/:addbank',
        autMW(objectRepository),
        getUserMW(objectRepository),
        modifyUserMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/profile');
        }
    );

};