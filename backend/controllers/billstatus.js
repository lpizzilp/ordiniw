import {
    getNewestId,
    insertBillStatus,
    getBillsByUser,
    getBillsByBill,
    getAll,
    updateStatus,
    updatePaid,
    cancelStatus,
    deleteBillById,
    getBillsGtId,
    deleteAllBills,

} from "../models/BillStatusModel.js";

// get newest Bill Status
export const showNewestStatusId=(req,res)=>{
    const idsagra = req.headers['id-sagra']
    getNewestId(idsagra,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// create BillStatus
export const createBillStatus=(req,res)=>{
    const data = req.body;
    insertBillStatus(data,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
            //res.status(500).send("errmessage");

        }
    });
};

// get Bills Status
export const getAllBillsByUser=(req,res)=>{
    const idsagra = req.headers['id-sagra']
    getBillsByUser(idsagra,req.params.id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// get Bills Status
export const getAllBillsByBill=(req,res)=>{
    const idsagra = req.headers['id-sagra']
    getBillsByBill(idsagra,req.params.id,(err,results)=> {
    //const IdSagra = req.headers['id-sagra'];
    });
    getBillsByBill(req.params.id,(err,results)=> {

        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// get Bills Status
export const getAllBills=(req,res)=>{
    const idsagra = req.headers['id-sagra']
    getAll(idsagra,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};


// update Status
export const updateBillStatus=(req,res)=>{
    const idsagra = req.headers['id-sagra']
    updateStatus(idsagra,req.params.id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// update Paid
export const updateBillPaid=(req,res)=>{
    const idsagra = req.headers['id-sagra']
    updatePaid(idsagra,req.params.id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// cancel Status
export const cancelBillStatus=(req,res)=>{
    const idsagra = req.headers['id-sagra']
    cancelStatus(idsagra,req.params.id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

export const deleteBill=(req,res)=>{
    const idsagra = req.headers['id-sagra']
    const id = req.params.id;
    deleteBillById(idsagra,id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};


// get tutti gli ordini inserite maggiori un determinato id 
// ...Se l'id non viene passato  vengono fornite tutte  
export const getAllBillsGtId=(req,res)=>{
    const idsagra = req.headers['id-sagra']
    getBillsGtId(idsagra,req.params.id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};


export const deleteAllBill=(req,res)=>{
    const id = req.params.id;
    const idsagra = req.headers['id-sagra']
    deleteAllBills(idsagra,id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};
