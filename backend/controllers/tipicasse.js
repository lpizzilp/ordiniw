import { allCasse } from "../models/TipiCasse.js";



export const getAllCasse=(req,res)=>{
    const idsagra = req.headers['id-sagra']
    allCasse(idsagra,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};