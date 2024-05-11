// import connection
import db from "../config/database.js";

// get all Foods
export const getFoods = (result) => {
    var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var datacorrente = now.getFullYear() + month + day
    let sql1 = "SELECT f.*, e.QtaDisponibile  FROM food f LEFT JOIN esauriti e ON f.food_id = e.food_id "
    let sql11 = sql1 + " WHERE f.FlgValidita = 0 "
    let sql2 = " UNION "
    let sql3 = sql1 + " WHERE f.FlgValidita != 0 AND " + datacorrente.toString() + " >= f.DataInizioValidita AND " + datacorrente.toString() + " <= f.DataFineValidita ORDER BY food_category desc, food_name asc"
    let sql = sql11 + sql2 + sql3
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};

// get single Foods
export const getFoodById = (id, result) => {
    db.query("SELECT * FROM food WHERE food_id = ?", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null,results); //was results[0]
        }
    });
};

// insert Food
export const insertFood = (data, result) => {
    db.query("INSERT INTO food SET ?", data, (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null,results); //was results[0]
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
export const deleteFoodById = (id, result) => {
    db.query("DELETE FROM food WHERE food_id = ?", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};