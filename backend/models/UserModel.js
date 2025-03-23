
// import connection
import db from "../config/database.js";

// get all users
export const getAllUser = (idsagra,result) => {
    db.query("SELECT * FROM `user` WHERE id_sagra = ? ", [idsagra],(err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};

// get single user
export const getUserByEmail = (idsagra, email, result) => {
    db.query("SELECT * FROM `user` WHERE id_sagra = ? AND user_email = ?", [idsagra, email], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results[0]); // Restituisce solo il primo risultato
        }
    });
};

// insert User
export const insertUser = (data, result) => {
    db.query("INSERT INTO `user` SET ?", data, (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};

// update authlevel
export const updateauthlevel  = (data, result) => {
    db.query(
        "UPDATE `user` SET authlevel = ? WHERE id_sagra = ? AND user_email = ?",
        [data.authlevel, data.id_sagra, data.user_email],
        (err, results) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else if (results.affectedRows === 0) {
                result("Nessun utente aggiornato, verifica i parametri", null);
            } else {
                result(null, results);
            }
        }
    );
};

// delete user by email
export const deleteuserbyemail   = (idsagra, email, result) => {
    db.query("DELETE FROM `user` WHERE id_sagra = ? AND user_email = ?", [idsagra,email], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};

// Segnalazione errore
export const insertError = (data, result) => {
    db.query("INSERT INTO errors SET ?", data, (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};
