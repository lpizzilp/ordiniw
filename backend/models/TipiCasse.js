import db from "../config/database.js";

export const allCasse = (idsagra,result) => {
    if (idsagra != null) {
        db.query("SELECT * FROM tipicassa WHERE id_sagra = ?", idsagra, (err, results) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        });
    } else {
        result(null, null)
    }
};