import {
    insertBillDetails,
    getBillDetails,
    deleteBill
} from "../models/BillDetailsModel.js";

// create BillDetails
export const createBillDetails=(req,res)=>{
    const data = req.body;
    insertBillDetails(data,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// get BillDetails
export const getBillDetailsById=(req,res)=>{
    const idsagra = req.params.idsagra
    getBillDetails(idsagra,req.params.id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// delete BillDetails
export const deleteBillById=(req,res)=>{
    const idsagra = req.params.idsagra
    deleteBill(idsagra,req.params.id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};