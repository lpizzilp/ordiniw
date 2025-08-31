import { allReparti } from "../models/RepartiModel.js";



export const getAllReparti=(req,res)=>{
    const idsagra = req.headers['id-sagra']
    allReparti(idsagra,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};