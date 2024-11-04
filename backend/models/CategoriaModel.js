import db from "../config/database.js";

export const allCategorie = (idsagra,result) => {
    if (idsagra != null) {
        db.query("SELECT DISTINCT c.* FROM categorie c INNER JOIN food f ON c.idCategoria = f.food_category WHERE c.id_sagra = ? AND f.id_sagra = c.id_sagra ORDER BY c.peso ASC;", idsagra, (err, results) => {
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