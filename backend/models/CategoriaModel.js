import db from "../config/database.js";

export const allCategorie = (idsagra,result) => {
    if (idsagra != null) {
        db.query("SELECT DISTINCT r.* FROM reparti r INNER JOIN food f ON r.idReparto = f.food_category WHERE r.id_sagra = ? AND f.id_sagra = r.id_sagra ORDER BY r.peso ASC;", idsagra, (err, results) => {
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