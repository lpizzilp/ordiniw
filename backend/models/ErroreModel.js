// import connection
import db from "../config/database.js";

// insert catalogo sagra 
export const insertErrore = (data,result) => {
    db.query("INSERT INTO errors SET ?",data, (err,results)=> {
        if (err){
            console.error("Errore in insertErrore:", err);  
            result(err,null);
        }else{
            result(null,results.insertId); //was results[0]
        }
    });
};

//Select tutto

export const getAllErr = (idsagra, result) => {
    if (!idsagra) {
        return result(null, []);
    }

    db.query("SELECT * from errors WHERE id_sagra = ?", [idsagra], (err, results) => {
        if (err) {
            console.error("Errore in getAllErr:", err);
            return result(err, null);
        }
        result(null, results);
    });
};
