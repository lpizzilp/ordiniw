import { getSagrabySig } from "../models/catalogoModel.js";


export const getSagraSig=(req,res)=>{
    getSagrabySig(req.params.sigla,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};