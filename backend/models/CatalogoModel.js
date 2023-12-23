// import connection
import db from "../config/database.js";

// recupera sagra con sigla
export const getSagrabySig = (sig,result) => {
    db.query("select * from catalogo_sagre where id_sagra = ?",[sig], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};