/**
 * Created by Koszta Ádám on 2016. 03. 28..
 */

var autMW = require('../middleware/generic/auth');
var getAllBetsMW = require('../middleware/bets/getAllBets');
var getBetMW = require('../middleware/bets/getBet');
var newUserBetMW = require('../middleware/user-bet/newUserBet');
var modifyUserMW = require('../middleware/user/modifyUser');
var getUserMW = require('../middleware/user/getUser');
var renderMW = require('../middleware/generic/render');

var betModel = require('../models/bet');
var userModel = require('../models/user');
var userBetModel = require('../models/userbet');

module.exports = function (app) {

    var objectRepository = {
        betModel: betModel,
        userModel: userModel,
        userBetModel: userBetModel
    }

    /**
     * Fogadasi esemenyek listazasa
     */

    app.use('/bets',
        autMW(objectRepository),
        getAllBetsMW(objectRepository),
        renderMW(objectRepository,'bets')
    );

    /**
     * Uj fogadas felulete
     */

    app.get('/userbet/new/:betid/:betguess',
        function(req, res, next) {
            res.tpl.userbetguess = req.params.betguess;
            return next();
        },
        autMW(objectRepository),
        getBetMW(objectRepository),
        renderMW(objectRepository,'newbet')
    );

    /**
     * Uj fogadas
     */

    app.post('/userbet/new/:betid/:betguess',
        function(req, res, next) {
            res.tpl.userbetguess = req.params.betguess;
            return next();
        },
        autMW(objectRepository),
        getBetMW(objectRepository),
        getUserMW(objectRepository),
        newUserBetMW(objectRepository),
        modifyUserMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/profile');
        }
    );

};