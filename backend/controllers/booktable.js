import {
    getAllCapacita,
    getSlotbyId,
    getTimebyId,
    insertBookTable
} from "../models/BookTableModel.js";

// create Booking
export const getSlotId=(req,res)=>{
    const IdSagra = req.headers['id-sagra'];
    getSlotbyId(IdSagra,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

export const getTimeId=(req,res)=>{
    const IdSagra = req.headers['id-sagra'];
    getTimebyId(IdSagra,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

export const getCapacita=(req,res)=>{
    const IdSagra = req.headers['id-sagra'];
    getAllCapacita(IdSagra,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// create Booktable
export const createBooktable=(req,res)=>{
    const data = req.body;
    insertBookTable(data,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
            //res.status(500).send("errmessage");
        }
    });
};
