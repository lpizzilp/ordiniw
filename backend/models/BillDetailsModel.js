// import connection
import db from "../config/database.js";

// insert Bill Details
export const insertBillDetails = (data,result) => {
    db.query("INSERT INTO billdetails SET ?",data, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};


// get Bill Details
export const getBillDetails = (id,result) => {
    db.query("SELECT bill_id, b.food_id, item_qty, food_name, f.food_price" + 
        "  FROM billdetails b, food f " + 
        " WHERE bill_id = ? "  +
        "   AND f.food_id = b.food_id " +
        " ORDER BY f.food_category desc, f.food_name asc"     ,id, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

//delete Bill Details
export const deleteBill = (id,result) => {
    db.query("DELETE FROM billdetails WHERE bill_id = ?",[id], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};