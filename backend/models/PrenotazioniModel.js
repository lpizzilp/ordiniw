// import connection
import db from "../config/database.js";

// prendi il nuovo book_id
export const PrendiId = (result) => {
    db.query("SELECT book_id FROM prenotazioni ORDER BY bill_id DESC LIMIT 0, 1", (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }
        else{
            result(null,results[0]);
        }
    });
};


// inserisci prenotazione
export const insertPrenotazione = (data,result) => {
    db.query("INSERT INTO prenotazioni SET ?",data, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};

export const insertDettaglio = (data,result) => {
    db.query("INSERT INTO dettaglioprenotazioni SET ?",data, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};
