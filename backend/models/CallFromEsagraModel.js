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
            result(null,results); //was results[0]
        }
    });
};

// delete anagrafica articoli 
export const deleteAnagrafica = (data,result) => {
    db.query("DELETE FROM food",'' , (err,results)=> {        
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results); //was results[0]
        }
    });
};

//------------------------------------------
// insert esauriti 
export const insertEsauriti = (data,result) => {
    db.query("INSERT INTO esauriti SET ?",data, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results); //was results[0]
        }
    });
};

// delete  esauriti
export const deleteEsauriti = (data,result) => {
    db.query("DELETE FROM esauriti",'' , (err,results)=> {        
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results); //was results[0]
        }
    });
};