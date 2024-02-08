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

//cancella tutti gli orini
export const deleteAllBooks = (data,result) => {
    db.query("DELETE FROM bookstatus ",data, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

//recupera dettaglio
  export const getPrenDetails = (id,result) => {
    db.query("SELECT b2.book_id, b2.food_id, b2.item_qty, f.food_name, f.food_price FROM bookdetails b2, food f WHERE b2.book_id = ? AND f.food_id = b2.food_id" ,id, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};


// recupera tutte le prenotazioni
export const getAll = (id,result) => {
    db.query("select b.*, b2.item_qty, f.food_name  from bookstatus b, bookdetails b2, food f where f.food_id = ? and b2.book_id = b.book_id and b2.food_id = f.food_id order by f.food_name desc, case WHEN book_status = 1 THEN 1 WHEN book_status = 2 THEN 2 ELSE 3 end desc, b.book_when asc",id, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }
        else{
            result(null,results);
        }
    });
};

export const Updatestatus = (data, result) => {
    db.query("UPDATE bookstatus SET book_status = ? WHERE book_id = ?",[data.action, data.id], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

export const getsum = (result) => {
    db.query("SELECT f.food_id, f.food_name, SUM(bd.item_qty) AS somma_qty FROM food AS f JOIN bookdetails bd ON f.food_id = bd.food_id JOIN bookstatus bs ON bd.book_id = bs.book_id WHERE bs.book_status <> 0  GROUP BY f.food_name ORDER BY f.food_name asc", (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }
        else{
            result(null,results);
        }
    });
};

export const getqtaperordine = (result) => {
    db.query("SELECT f.*, IFNULL(SUM(bd.item_qty), 0) AS somma_qty FROM food f LEFT JOIN bookdetails bd ON f.food_id = bd.food_id WHERE f.FlgPrenotabile != 0 GROUP BY f.food_name ORDER BY f.food_name asc", (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }
        else{
            result(null,results);
        }
    });
};

export const deleteBookstatusById = (id,result) => {
    db.query("DELETE FROM bookstatus WHERE book_id = ?",[id], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

export const deleteBookdetailsById = (id,result) => {
    db.query("DELETE FROM bookdetails WHERE book_id = ?",[id], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};