// import connection
import db from "../config/database.js";

// recupera sagra con sigla
export const getSagrabySig = (sig,result) => {
    db.query("select descrizione from catalogo_sagre where sigla = ?",[sig], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};