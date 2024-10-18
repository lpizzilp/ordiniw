// import connection
import db from "../config/database.js";

// get all user
export const getAllUser = (result) => {
    db.query("SELECT * FROM user", (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};


// get single user
export const getUserByEmail = (id,email, result) => {
    db.query("SELECT * FROM user WHERE id_sagra = ? and user_email = ?", [id, email], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results[0]);
        }
    });
};

// insert User
export const insertUser = (data, result) => {
    db.query("INSERT INTO user SET ?", data, (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null,results); //was results[0]
        }
    });
};


// update authlevel
export const updateauthlevel = (idsagra,data, result) => {
    db.query("UPDATE user SET authlevel = ? where id_sagra = ? and user_email = ?",[data.authlevel, idsagra, data.user_email], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

//delete user
export const deleteuserbyemail = (idsagra, email, result) => {
    db.query("Delete from `user`  where user_email = ? and id_sagra = ?",[email, idsagra], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

//Segnalazioneerrore
export const insertError = (data, result) => {
    db.query("INSERT INTO errors SET ?", data, (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null,results); //was results[0]
        }
    });
};