import { getAllErr, insertErrore } from "../models/ErroreModel.js";

export const InserisciErrore=(req,res)=>{
    const idsagra = req.params.idsagra
    const data = req.body;
    insertErrore(idsagra,data,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

export const allErrori=(req,res)=>{
    const idsagra = req.params.idsagra
    getAllErr(idsagra,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};