//CHIAMATE DA SISTEMA CENTRALE 
import {
    insertAnagrafica,
    deleteAnagrafica,
    insertEsauriti,
    deleteEsauriti
} from "../models/CallFromEsagraModel.js";

// Iserimento anagrafiche da sistema remoto 
export const importAnagrafica=(req,res)=>{
    const data = req.body;

    //Cancella tutta la tabella anagrafica
    deleteAnagrafica(data,(err,results)=> {
        if (err) {
            res.send(err);
            return;

        }else {
            res.json(results);
        }
    });
    //INSERISCI BLOB ANAGRAFICHE 
    data.forEach(element => {
        
        insertAnagrafica(element,(err,results)=> {
            if (err) {
                res.send(err);
                return; 

            }else {
                res.json(results);
            }
        });
    });

};
//-------------------------------------------------
// Iserimento Esauriti da sistema remoto 
export const importEsauriti=(req,res)=>{
    const data = req.body;

    //Cancella tutta la tabella esauriti
    deleteEsauriti(data,(err,results)=> {
        if (err) {
            res.send(err);
            return;

        }else {
            res.json(results);
        }
    });
    //INSERISCI BLOB ESAURITI 
    data.forEach(element => {
        
        insertEsauriti(element,(err,results)=> {
            if (err) {
                res.send(err);
                return; 

            }else {
                res.json(results);
            }
        });
    });

};

export const deleteAllEsauriti=(req,res)=>{
    const data = req.body;
    //Cancella tutta la tabella esauriti
    deleteEsauriti(data,(err,results)=> {
        if (err) {
            res.send(err);
            return;

        }else {
            res.json(results);
        }
    });

};