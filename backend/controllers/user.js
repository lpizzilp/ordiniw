// import functions from User model

import {
    Emailregistrazione,
    Emailsender,
    NuovoId,
    getAllUser,
    getUserByEmail,
    insertUser
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

//send mail
export const SendMail =(req,res)=>{
    let Uemail = req.body;
    Emailsender(Uemail,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};


export const SendRegistrazione =(req,res)=>{
    let Uemail = req.body;
    Emailregistrazione(Uemail,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};




