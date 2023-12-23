//CHIAMATE DA SISTEMA CENTRALE 
import {
    insertAnagrafica
} from "../models/CallFromEsagraModel.js";

// Iserimento anagrafiche da sistema remoto 
export const importAnagrafica=(req,res)=>{
    const data = req.body;
    data.forEach(element => {
        
        insertAnagrafica(element,(err,results)=> {
            if (err) {
                res.send(err);
            }else {
                res.json(results);
            }
        });
});

};