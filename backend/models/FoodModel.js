// import connection
import db from "../config/database.js";

// get all Foods
export const getFoods = (idsagra, result) => {
    if (idsagra != null) {
        var datacorrente = new Date().toISOString().slice(0, 10).replace(/-/g, "");
        let sql1 = "SELECT f.*, e.QtaDisponibile, c.peso  FROM food f LEFT JOIN esauriti e ON f.food_id = e.food_id LEFT JOIN categorie c on c.idCategoria = f.food_category WHERE f.id_sagra = ? AND c.id_sagra = f.id_sagra AND f.food_name != 'ZZ' "
        let sql11 = sql1 + " AND f.FlgValidita = 0 "
        let sql2 = " UNION "
        let sql3 = sql1 + " AND f.FlgValidita != 0 AND " + datacorrente.toString() + " >= f.DataInizioValidita AND " + datacorrente.toString() + " <= f.DataFineValidita ORDER BY peso asc, food_category desc, food_name asc"
        let sql = sql11 + sql2 + sql3
        db.query(sql,[idsagra, idsagra],(err, results) => {
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
    db.query("SELECT * FROM food WHERE id_sagra ? AND food_id = ?", [idsagra,id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results[0]);
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
            result(null, results[0]);
        }
    });
};

// update Food
export const updateFoodById = (data, id, result) => {
    db.query("UPDATE food SET food_name = ?, food_price = ? WHERE food_id = ?", [data.food_name, data.food_price, id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};


// delete Food
export const deleteFoodById = (idsagra,id, result) => {
    db.query("DELETE FROM food WHERE id_sagra = ? AND food_id = ?", [idsagra,id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};