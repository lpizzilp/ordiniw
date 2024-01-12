// import connection
import db from "../config/database.js";


// prendi nuovo id
export const NuovoId = (result) => {
    db.query("SELECT user_id FROM user ORDER BY user_id DESC LIMIT 0, 1", (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        }
        else {
            result(null, results[0]);
        }
    });
};

// get all user
export const getAllUser = (result) => {
    db.query("SELECT * FROM user", (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results[0]);
        }
    });
};


// get single user
export const getUserByEmail = (data, result) => {
    db.query("SELECT * FROM user WHERE user_email = ?", [data], (err, results) => {
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
            result(null, results[0]);
        }
    });
};

export const updateauthlevel = (data, result) => {
    db.query("UPDATE user SET authlevel = ?, id_sagra = ? where user_email = ?",[data.authlevel, data.id_sagra, data.user_email], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};
