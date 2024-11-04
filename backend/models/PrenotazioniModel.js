// import connection
import db from "../config/database.js";

// prendi il nuovo book_id
export const PrendiId = (idsagra,result) => {
    db.query("SELECT book_id FROM bookstatus WHERE id_sagra = ? ORDER BY book_id DESC LIMIT 0, 1", idsagra, (err,results)=> {
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
            result(null,results); //was results[0]
        }
    });
};

export const insertDettaglio = (data,result) => {
    db.query("INSERT INTO bookdetails SET ?",data, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results); //was results[0]
        }
    });
};

export const checkfood = (idsagra, result) => {
    db.query("SELECT food_id, sum(item_qty) from bookdetails WHERE id_sagra = ? group by food_id ", idsagra, (err,results)=> {
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
export const getPrenotGtId = (idsagra,id,result) => {
    db.query("SELECT bs.*, bd.item_qty, f.food_id, f.food_name FROM bookstatus bs, bookdetails bd, food f " +   
            " WHERE id_sagra = ? and bs.book_id > ? " + 
            " and bs.book_id = bd.book_id " +
            " and f.food_id = bd.food_id " 

            ,[idsagra,id], (err,results)=> {

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
export const deleteAllBooks = (idsagra,data,result) => {
    db.query("DELETE FROM bookstatus WHERE id_sagra = ?",[idsagra,data], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

//recupera dettaglio
  export const getPrenDetails = (idsagra,id,result) => {
    db.query("SELECT b2.book_id, b2.food_id, b2.item_qty, f.food_name, f.food_price FROM bookdetails b2, food f WHERE b2.id_sagra = ? AND f.id_sagra = b2.id_sagra AND b2.book_id = ? AND f.food_id = b2.food_id" ,[idsagra,id], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};


// recupera tutte le prenotazioni
export const getAll = (idsagra,id,result) => {
    db.query("Select b.*, b2.item_qty, f.food_name, f.food_id, f.DataFinePRT  FROM bookstatus b, bookdetails b2, food f WHERE f.id_sagra = ? AND b2.id_sagra = f.id_sagra AND f.food_id = ? AND b2.book_id = b.book_id AND b2.food_id = f.food_id order by f.food_name desc, case WHEN book_status = 0 THEN 1 WHEN book_status = 1 THEN 2 WHEN book_status = 2 THEN 3 ELSE 4 end desc, b.book_when asc",[idsagra,id], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }
        else{
            result(null,results);
        }
    });
};

export const Updatestatus = (idsagra,data, result) => {
    db.query("UPDATE bookstatus SET book_status = ? WHERE id_sagra = ? AND book_id = ?",[idsagra,data.action, data.id], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

export const getsum = (idsagra,result) => {
    db.query("SELECT f.food_id, f.food_name, f.FlgVariante, SUM(bd.item_qty) AS somma_qty FROM food AS f JOIN bookdetails bd ON f.id_sagra = bd.id_sagra AND f.food_id = bd.food_id JOIN bookstatus bs ON bd.id_sagra= bs.id_sagra AND bd.book_id = bs.book_id AND bs.book_status != 3 WHERE f.id_sagra = ? GROUP BY f.food_name ORDER BY f.food_name asc", idsagra, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }
        else{
            result(null,results);
        }
    });
};

export const getqtaperordine = (idsagra,result) => {
    db.query("SELECT f.*, IFNULL(SUM(bd.item_qty), 0) AS somma_qty FROM food f LEFT JOIN bookdetails bd ON f.id_sagra = bd.id_sagra AND f.food_id = bd.food_id WHERE f.id_sagra = ? f.FlgPrenotabile != 0 GROUP BY f.food_name ORDER BY f.food_name asc", idsagra, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }
        else{
            result(null,results);
        }
    });
};

export const deleteBookstatusById = (idsagra,id,result) => {
    db.query("DELETE FROM bookstatus WHERE id_sagra = ? AND book_id = ?",[idsagra,id], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

export const deleteBookdetailsById = (idsagra,id,result) => {
    db.query("DELETE FROM bookdetails WHERE id_sagra = ?, book_id = ?",[idsagra,id], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};