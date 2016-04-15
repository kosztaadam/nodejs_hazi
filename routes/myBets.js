/**
 * Created by Koszta Ádám on 2016. 03. 28..
 */

var autMW = require('../middleware/generic/auth');
var getBet = require('../middleware/bets/getBet');
var getUser = require('../middleware/generic/getUser');
var updateBank = require('../middleware/bank/updateBank');

// bejelentkezes ell.
// A felhasznalohoz tartozo fogadasok listazasa
// adott fogadas modositasa
// adott fogadas torlese
// bankhoz penz hozzaadasa