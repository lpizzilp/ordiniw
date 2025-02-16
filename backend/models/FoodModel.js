// import connection
import db from "../config/database.js";

// get all Foods
export const getFoods = (idsagra, result) => {
    if (idsagra != null) {
        var datacorrente = new Date().toISOString().slice(0, 10).replace(/-/g, "");
        let sql1 = "SELECT f.*, e.QtaDisponibile, r.peso, f.IdReparto AS Reparto FROM food f LEFT JOIN esauriti e ON f.food_id = e.food_id LEFT JOIN reparti r on r.idReparto = f.IdReparto WHERE f.id_sagra = ? AND r.id_sagra = f.id_sagra AND f.food_name != 'ZZ' "
        let sql11 = sql1 + " AND f.FlgValidita = 0 "
        let sql2 = " UNION "
        // let sql3 = sql1 + " AND f.FlgValidita != 0 AND " + datacorrente.toString() + " >= f.DataInizioValidita AND " + datacorrente.toString() + " <= f.DataFineValidita ORDER BY peso asc, Reparto desc, food_name asc"
        // let sql = sql11 + sql2 + sql3
        // db.query(sql,[idsagra],(err, results) => {
        let sql3 = sql1 + " AND f.FlgValidita != 0 AND ? >= f.DataInizioValidita AND ? <= f.DataFineValidita ORDER BY peso asc, Reparto desc, food_name asc";
        let sql = sql11 + sql2 + sql3;
        db.query(sql, [idsagra, datacorrente.toString(), datacorrente.toString()], (err, results) => {            
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

// get single Foods
export const getFoodById = (idsagra, id, result) => {
    db.query("SELECT * FROM food WHERE id_sagra = ? AND food_id = ?", [idsagra,id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results.length > 0 ? results[0] : null)
        }
    });
};

// insert Food
export const insertFood = (data, result) => {
    db.query("INSERT INTO food SET ? ", data, (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};


// update Food
export const updateFoodById = (data, id, result) => {
    db.query("UPDATE food SET food_name = ?, food_price = ? WHERE food_id = ?", [data.food_name, data.food_price, id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else if (results.affectedRows === 0) {
            result("Nessun record aggiornato", null);
        } else {
            result(null, results);
        }
    });
};

// delete Food
export const deleteFoodById = (idsagra, id, result) => {
    db.query("DELETE FROM food WHERE id_sagra = ? AND food_id = ?", [idsagra, id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else if (results.affectedRows === 0) {
            result("Nessun record eliminato", null);
        } else {
            result(null, results);
        }
    });
};