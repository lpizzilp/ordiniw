// import connection
import db from "../config/database.js";

// prendi il nuovo book_id
export const PrendiId = (result) => {
    db.query("SELECT book_id FROM bookstatus ORDER BY book_id DESC LIMIT 0, 1", (err,results)=> {
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
    db.query("INSERT INTO bookstatus SET ?",data, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};

export const insertDettaglio = (data,result) => {
    db.query("INSERT INTO bookdetails SET ?",data, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};

export const checkfood = (result) => {
    db.query("SELECT food_id, sum(item_qty) from bookdetails group by food_id ", (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }
        else{
            result(null,results[0]);
        }
    });
};



// get all prenotazioni per data > parametro 
export const getPrenotGtId = (id,result) => {
    db.query("SELECT bs.*, bd.item_qty, f.food_id, f.food_name FROM bookstatus bs, bookdetails bd, food f " +   
            " WHERE bs.book_id > ? " + 
            " and bs.book_id = bd.book_id " +
            " and f.food_id = bd.food_id " 

            ,id, (err,results)=> {

        if (err){
            console.log(err);
            result(err,null);
        }
        else{
            result(null,results);
        }
    });
};

export const getPrenDetails = (id,result) => {
    db.query("SELECT b2.book_id, b2.food_id, b2.item_qty, f.food_name FROM bookdetails b2, food f WHERE b2.book_id = ? AND f.food_id = b2.food_id" ,id, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};