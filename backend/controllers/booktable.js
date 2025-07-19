import {
    getSlotbyId,
    getTimebyId
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
