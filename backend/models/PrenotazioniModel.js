// import connection
import db from "../config/database.js";

// prendi il nuovo book_id
export const PrendiId = (result) => {
    db.query("SELECT book_id FROM prenotazioni ORDER BY book_id DESC LIMIT 0, 1", (err,results)=> {
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

export const checkfood = (result) => {
    db.query("SELECT food_id, sum(item_qty) from dettaglioprenotazioni group by food_id ", (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }
        else{
            result(null,results[0]);
        }
    });
};
