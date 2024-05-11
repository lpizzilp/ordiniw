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

// recupera sagre
export const getAllSagre = (ord, result) => {
    db.query("SELECT id_sagra, descrizione  FROM catalogo_sagre ORDER BY CASE WHEN id_sagra = ? THEN 0 ELSE 1 END, id_sagra;",[ord], (err, results)=> {
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
            result(null,results); //was results[0]
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
            result(null,results); //was results[0]
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


//-------------------------------------------------------
//UPDATE inizio e fine sagra
//-------------------------------------------------------

export const updateContrOrdini = (data,result) => {
    db.query("UPDATE catalogo_sagre SET StrOrdini = ? WHERE id_sagra = ?",[data.type, data.id],(err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

export const getContrOrdini = (id,result) => {
    db.query("Select StrOrdini from catalogo_sagre WHERE id_sagra = ?",id,(err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};


// Resta attivo
export const Wakeup = (result) => {
    db.query("Select 1 from catalogo_sagre",(err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            //result = ' ';
            result(null,results);
        }
    });
};




