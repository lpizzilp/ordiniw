// import connection
import db from "../config/database.js";

// get newest Bill Status
export const getNewestId = (result) => {
    db.query("SELECT bill_id FROM billstatus ORDER BY bill_id DESC LIMIT 0, 1", (err,results)=> {
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
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};

// get all Bills Status
export const getBillsByUser = (id,result) => {
    db.query("SELECT * FROM billstatus WHERE user_id = ?",id, (err,results)=> {
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
export const getBillsByBill = (id,result) => {
    db.query("SELECT * FROM billstatus WHERE bill_id = ?",id, (err,results)=> {
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
export const getAll = (result) => {
    db.query("SELECT * FROM billstatus", (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }
        else{
            result(null,results);
        }
    });
};


export const updateStatus = (id,result) => {
    db.query("UPDATE billstatus SET bill_status = bill_status + 1  WHERE bill_id = ?",id, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

export const updatePaid = (id,result) => {
    db.query("UPDATE billstatus SET bill_paid = 'true' WHERE bill_id = ?",id, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

export const cancelStatus = (id,result) => {
    db.query("UPDATE billstatus SET bill_status = 0  WHERE bill_id = ?",id, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
    db.query("UPDATE billstatus SET bill_paid = 'false' WHERE bill_id = ?",id, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }
    });
};


export const deleteBillById = (id,result) => {
    db.query("DELETE FROM billstatus WHERE bill_id = ?",[id], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

// get all bills  per data > parametro 
export const getBillsGtId = (id,result) => {
    db.query("SELECT * FROM billstatus  " +   
            " WHERE bill_id > ? "  
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
export const deleteAllBills = (data,result) => {
    db.query("DELETE FROM billstatus ",data, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};
