import db from "../config/database.js";

export const allCategorie = (result) => {
    let sql = "SELECT DISTINCT c.* FROM categorie c INNER JOIN food f ON c.idCategoria = f.food_category WHERE f.FlgPrenotabile = 0 ORDER BY c.peso asc";
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};