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


//------------------------------------------
// insert catalogo sagra 
export const insertSagra = (data,result) => {
    db.query("INSERT INTO catalogo_sagre SET ?",data, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};

// delete catalogo sagra x id 
export const deleteSagra = (id,result) => {
    db.query("DELETE FROM catalogo_sagre WHERE id_sagra = ?",[id], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};


//-------------------------------------------------------
//UPDATE delle informazioni numcoda E info 
//-------------------------------------------------------
export const updateSagraCodaeInfoByID = (data,id,result) => {
    db.query("UPDATE catalogo_sagre SET flgEliminacode = ? , flgInfo = ? , numcoda  = ?, info = ? WHERE id_sagra = ?",[data.flgEliminacode, data.flgInfo, data.numcoda, data.info, id], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};




