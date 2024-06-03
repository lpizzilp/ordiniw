// import functions from User model

import {
    deleteuserbyemail,
    getAllUser,
    getUserByEmail,
    insertError,
    insertUser,
    updateauthlevel
} from "../models/UserModel.js";


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
    getUserByEmail(req.params.id,req.params.email,(err,results)=> {
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
    deleteuserbyemail(req.params.email,req.params.sagra,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// insert error
export const Errors=(req,res)=>{
    const data = req.body;
    insertError(data,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};