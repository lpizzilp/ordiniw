// import functions from Food model

import {
    getFoods,
    getFoodById,
    insertFood,
    deleteFoodById,
    updateFoodById,

} from "../models/FoodModel.js";

// get all Foods
export const showFoods=(req,res)=>{
    const idsagra = req.headers['id-sagra']
    getFoods(idsagra,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};


// get single Food
export const showFoodById=(req,res)=>{
    const idsagra = req.headers['id-sagra']
    getFoodById(idsagra,req.params.id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// create Food
export const createFood=(req,res)=>{
    const data = req.body;
    insertFood(data,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// update Food
export const updateFood=(req,res)=>{
    const data = req.body;
    const id = req.params.id;
    const idsagra = req.headers['id-sagra']
    updateFoodById(idsagra,data,id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};


// delete Food
export const deleteFood=(req,res)=>{
    const id = req.params.id;
    const idsagra = req.headers['id-sagra']
    deleteFoodById(idsagra,id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};