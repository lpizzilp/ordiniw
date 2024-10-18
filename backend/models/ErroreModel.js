// import connection
import db from "../config/database.js";

// insert catalogo sagra 
export const insertErrore = (data,result) => {
    db.query("INSERT INTO errors SET ?",data, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results); //was results[0]
        }
    });
};

//Select tutto
export const getAllErr = (idsagra,result) => {
    db.query("SELECT * from errors WHERE id_sagra = ?", idsagra, (err, results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};