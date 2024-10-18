// import connection
import db from "../config/database.js";

// recupera sagra con sigla
export const getSagrabyId = (idsagra,result) => {
    db.query("select * from catalogo_sagre where id_sagra = ?",[idsagra], (err,results)=> {
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
export const insertSagra = async (data) => {
    try {
        const results = await new Promise((resolve, reject) => {
            db.query("INSERT INTO catalogo_sagre SET ?", data, (err, results) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        return results;
    } catch (error) {
        throw error;
    }
};

//------------------------------------------
// Delete catalogo sagra per id 
export const deleteSagra = async (id) => {
    try {
        const results = await new Promise((resolve, reject) => {
            db.query("DELETE FROM catalogo_sagre WHERE id_sagra = ?", [id], (err, results) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        return results;
    } catch (error) {
        throw error;
    }
};


//-------------------------------------------------------
//UPDATE delle informazioni numcoda E info 
//-------------------------------------------------------
export const updateSagraCodaeInfoByID = (data,idsagra,result) => {
    db.query("UPDATE catalogo_sagre SET flgEliminacode = ? , flgInfo = ? , numcoda  = ?, info = ? WHERE id_sagra = ?",[data.flgEliminacode, data.flgInfo, data.numcoda, data.info, idsagra], (err,results)=> {
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

export const updateContrOrdini = (idsagra,data,result) => {
    db.query("UPDATE catalogo_sagre SET StrOrdini = ? WHERE id_sagra = ?",[data.type, idsagra],(err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

export const updateContrVisibilita = (data,result) => {
    db.query("UPDATE catalogo_sagre SET MaskVisibilita = ? WHERE id_sagra = ?",[data.type, data.id],(err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

export const updateContrObbligo = (idsagra,data,result) => {
    db.query("UPDATE catalogo_sagre SET MaskObbligo = ? WHERE id_sagra = ?",[data.type, idsagra],(err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

export const getContrOrdini = (idsagra,result) => {
    db.query("Select StrOrdini from catalogo_sagre WHERE id_sagra = ?",idsagra,(err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

export const getContrVisibilita = (idsagra,result) => {
    db.query("Select MaskVisibilita from catalogo_sagre WHERE id_sagra = ?",idsagra,(err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};
export const getContrObbligo = (idsagra,result) => {
    db.query("Select MaskObbligo from catalogo_sagre WHERE id_sagra = ?",idsagra,(err,results)=> {
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




