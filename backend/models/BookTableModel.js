// import connection
import db from "../config/database.js";

// insert Booking
export const getSlotbyId = (idsagra,result) => {
    db.query("Select * from dayslot where id_sagra = ?",[idsagra], (err,results)=> {
        if (err){
            console.error("Errore in getSlotbyId:", err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

export const getTimebyId = (idsagra,result) => {
    db.query("SELECT t.id_sagra, t.id, t.periodo, t.ora, COALESCE(t.capacita - SUM(b2.book_posti), t.capacita) AS capacita FROM timeslot t LEFT JOIN booktable b2 ON t.id = b2.book_periodo GROUP BY t.id",[idsagra], (err,results)=> {
        if (err){
            console.error("Errore in getSlotbyId:", err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};