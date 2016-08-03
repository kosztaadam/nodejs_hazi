/**
 * Created by Koszta Ádám on 2016. 05. 08..
 */

/**
 * Created by Koszta Ádám on 2016. 03. 28..
 */

var requireOption = require('../generic/dependency').requireOption;

/**
 * Felhasznalo penzosszegenek modositasa admin altal
 */
module.exports = function (objectRepository) {

    var userModel = requireOption(objectRepository, 'userModel');

    return function (req, res, next) {


        var user = undefined;
        var bet = res.tpl.bet;
        var userbet = res.tpl.userbet;
        var score = req.params.score;

        // parameterek ellenorzese
        if (typeof bet === 'undefined' || typeof userbet == 'undefined' || typeof score == 'undefined') {
            return next();
        }

        for(var i = 0; i < userbet.length; i++) {
            if (userbet[i].guess == score) {

                // felhasznalo megkeresese
                userModel.findOne({_id: userbet[i]._user}, function (err, result) {
                    if (err) {
                        return next(err);
                    }
                    user = result;

                    if(score == "1") {
                        user.bank += parseInt(bet.home * 1000);
                    }
                    else if(score == "X") {
                        user.bank += parseInt(bet.draw * 1000);
                    }
                    else if(score == "2") {
                        user.bank += parseInt(bet.away * 1000);
                    }
                    user.save(function (err, result) {
                        if (err) {
                            return next(err);
                        }
                    });

                });

            }
        }

        return next();
    }

};
