import {
    insertBooking
} from "../models/BookTableModel.js";

// create Booking
export const createBooking=(req,res)=>{
    const idsagra = req.params.idsagra
    const data = req.body;
    insertBooking(idsagra,data,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};