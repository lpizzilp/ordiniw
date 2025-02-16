// import connection
import db from "../config/database.js";

// get newest Bill Status
export const getNewestId = (idsagra,result) => {
    db.query("SELECT bill_id FROM billstatus WHERE id_sagra = ? ORDER BY bill_id DESC LIMIT 0, 1", idsagra, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }
        else{
            result(null,results[0]);
        }
    });
};

// insert Bill Status
export const insertBillStatus = (data,result) => {
    db.query("INSERT INTO billstatus SET ?",data, (err,results)=> {
        if (err){
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

// get all Bills Status
export const getBillsByUser = (idsagra,id,result) => {
    db.query("SELECT * FROM billstatus WHERE id_sagra = ? AND user_id = ?",[idsagra,id], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }
        else{
            result(null,results);
        }
    });
};


// get all Bills Status
export const getBillsByBill = (idsagra,id,result) => {
    db.query("SELECT * FROM billstatus WHERE id_sagra = ? AND bill_id = ?",[idsagra,id], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }
        else{
            result(null,results);
        }
    });
};

// get all Bills Status
export const getAll = (idsagra,result) => {
    db.query("SELECT * FROM billstatus WHERE id_sagra = ? order by case WHEN bill_status = 1 THEN 1 WHEN bill_status = 2 THEN 2 WHEN bill_status = 3 THEN 3 ELSE 4 end, bill_id desc, bill_when desc", [idsagra], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }
        else{
            result(null,results);
        }
    });
};


export const updateStatus = (idsagra,id,result) => {
    db.query("UPDATE billstatus SET bill_status = bill_status + 1  WHERE id_sagra = ? AND bill_id = ?",[idsagra,id], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

export const updatePaid = (idsagra,id,result) => {
    db.query("UPDATE billstatus SET bill_paid = 'true' WHERE id_sagra = ? AND bill_id = ?",[idsagra,id], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

export const cancelStatus = (idsagra,id,result) => {
    db.query(
        "UPDATE billstatus SET bill_status = 0, bill_paid = 0 WHERE id_sagra = ? AND bill_id = ?", 
        [idsagra, id], 
        (err, results) => { 
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        }
    );    
};


export const deleteBillById = (idsagra,id,result) => {
    db.query("DELETE FROM billstatus WHERE id_sagra = ? AND bill_id = ?",[idsagra,id], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

// get all bills  per data > parametro 
export const getBillsGtId = (idsagra,id,result) => {
    db.query("SELECT * FROM billstatus  " +   
            " WHERE id_sagra = ? AND bill_id > ? "  
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
export const deleteAllBills = (idsagra,result) => {
    db.query("DELETE FROM billstatus WHERE id_sagra = ? ",[idsagra], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};
