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
    db.query("SELECT t.id_sagra, t.id, t.periodo, t.ora, t.capacita FROM timeslot t LEFT JOIN booktable b2 ON t.id = b2.book_periodo GROUP BY t.id",[idsagra], (err,results)=> {
        if (err){
            console.error("Errore in getSlotbyId:", err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

export const getAllCapacita = (idsagra,result) => {
    db.query("SELECT b2.book_day, t.id, t.ora, COALESCE(SUM(b2.book_posti), 0) AS riservati FROM timeslot t INNER JOIN booktable b2 ON t.id = b2.book_periodo GROUP BY b2.book_day, t.id, t.ora ORDER BY b2.book_day",[idsagra], (err,results)=> {
        if (err){
            console.error("Errore in getSlotbyId:", err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

export const insertBookTable = (data,result) => {
    db.query("INSERT INTO booktable SET ?",data, (err,results)=> {
        if (err){
            result(err,null);
        }else{
            result(null,results);
        }
    });
};