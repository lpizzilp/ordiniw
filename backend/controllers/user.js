// import functions from User model

import {
    NuovoId,
    deleteuserbyemail,
    getAllUser,
    getUserByEmail,
    insertUser,
    updateauthlevel
} from "../models/UserModel.js";


// Prendi nuovo id
export const getId=(req,res)=>{
    NuovoId((err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// get all Users
export const allUsers=(req,res)=>{
    getAllUser((err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};


// get single user
export const showAUser = (req,res)=>{
    getUserByEmail(req.params.name,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// create user
export const createAccount=(req,res)=>{
    const data = req.body;
    insertUser(data,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};


// update user
export const updateUserauthlevel=(req,res)=>{
    const data = req.body;
    updateauthlevel(data, (err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// delete user
export const Userdelete = (req,res)=>{
    deleteuserbyemail(req.params.email,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};