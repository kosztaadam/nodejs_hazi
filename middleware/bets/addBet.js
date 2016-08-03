/**
 * Created by Koszta Ádám on 2016. 03. 28..
 */

var requireOption = require('../generic/dependency').requireOption;

/**
 * Uj fogadasi esemeny hozzaadasa
 */
module.exports = function (objectRepository) {

    var betModel = requireOption(objectRepository, 'betModel');
   // var userModel = requireOption(objectRepository, 'userModel');



    return function (req, res, next) {

        //console.log(req.body.event);
        //console.log(req.body.home);
        //console.log(req.body.draw);
        //console.log(req.body.away);

        if ((typeof req.body.event === 'undefined') || (typeof req.body.home === 'undefined') ||
            (typeof req.body.draw === 'undefined') || (typeof req.body.away === 'undefined')) {
                return next();
        }

        if ((req.body.event == 'null') || (req.body.home == 'null') ||
            (req.body.draw == 'null') || (req.body.away == 'null')) {
                return next();
        }

        var bet = undefined;
        bet = new betModel();
        bet.name = req.body.event;
        bet.home = req.body.home;
        bet.draw = req.body.draw;
        bet.away = req.body.away;

        bet.save(function (err) {
            if (err) {
                return next(err);
            }
            //redirect to /admin
            return res.redirect('/admin');
        });
    };

};