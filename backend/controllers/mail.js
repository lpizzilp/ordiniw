// import functions from User model

import {
    EmailConf,
    Emailregistrazione,
    Emailsegnalazione,
    Emailsender,
} from "../models/MailModel.js";

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


export const SendCoferma =(req,res)=>{
    let Uemail = req.body;
    EmailConf(Uemail,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

export const Sendsegnalazione =(req,res)=>{
    let Uemail = req.body;
    Emailsegnalazione(Uemail,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};




