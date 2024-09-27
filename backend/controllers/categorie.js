import { allCategorie } from "../models/CategoriaModel.js";



export const getAllCategorie=(req,res)=>{
    allCategorie((err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};