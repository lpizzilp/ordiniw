//CHIAMATE DA SISTEMA CENTRALE 
//
// import connection
import db from "../config/database.js";

// insert anagrafica articoli 
export const insertAnagrafica = (data,result) => {
    db.query("INSERT INTO food SET ?",data, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};