import { allCategorie } from "../models/CategoriaModel.js";



export const getAllCategorie=(req,res)=>{
    const idsagra = req.params.idsagra
    allCategorie(idsagra,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};