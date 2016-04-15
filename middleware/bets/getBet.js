/**
 * Created by Koszta Ádám on 2016. 03. 28..
 */

/**
 * Egy fogadasi esemeny lekerdezese (osszes lehetseges kimenettel)
 */
module.exports = function (objectrepository) {

    return function (req, res, next) {
        /** fogadas megkeresese
         * ha nincs ilyen fogadas: vissza a fogadasokhoz
         * ha van ilyen, akkor visszaadjuk
         */

        return next();
    };

};