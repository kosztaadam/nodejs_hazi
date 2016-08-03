/**
 * Created by Koszta Ádám on 2016. 05. 08..
 */

/**
 * Felhasznaloi fogadasok torlese
 */
module.exports = function (objectRepository) {

    return function (req, res, next) {
        if (typeof res.tpl.userbet === 'undefined') {
            return next();
        }

        var userbet = res.tpl.userbet;
        var bet = res.tpl.bet;

        //console.log(userbet);
        //console.log(bet);

        for(var i = 0; i < userbet.length; i++) {

            if(userbet[i]._bet == bet.id) {

                userbet[i].remove(function (err) {
                    if (err) {
                        return next(err);
                    }

                });
            }

        }

        return next();
    };

};