import { insertErrore } from "../models/ErroreModel.js";

export const InserisciErrore=(req,res)=>{
    const data = req.body;
    insertErrore(data,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};