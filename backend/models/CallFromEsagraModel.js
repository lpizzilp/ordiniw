//CHIAMATE DA SISTEMA CENTRALE 
//
// import connection
import db from "../config/database.js";

//-------------------------------
//-------------------------------
export const insertAnagrafica = (data) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO food SET ?", data, (err, results) => {
            if (err) {
                console.error('Errore durante l\'inserimento:', err);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

export const deleteAnagrafica = () => {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM food", (err, results) => {
            if (err) {
                console.error('Errore durante la cancellazione:', err);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};






// // insert anagrafica articoli 
// export const insertAnagrafica = (data,result) => {
//     db.query("INSERT INTO food SET ?",data, (err,results)=> {
//         if (err){
//             console.log(err);
//             result(err,null);
//         }else{
//             result(null,results);
//         }
//     });
// };

// // Cancella tutta l'anagrafica
// export const deleteAnagrafica = (result) => {
//     db.query("DELETE FROM food", '', (err, results) => {
//         if (err) {
//             console.log(err);
//             result(err, null);
//         } else {
//             result(null, results); // Invia null come primo argomento
//         }
//     });
// };

//------------------------------------------
//------------------------------------------
// insert esauriti 
export const insertEsauriti = (data) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO esauriti SET ?", data, (err, results) => {
            if (err) {
                console.error("Errore durante l'inserimento di esauriti:", err);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

// delete esauriti
export const deleteEsauriti = (idsagra) => {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM esauriti WHERE id_sagra = ?", idsagra, (err, results) => {
            if (err) {
                console.error("Errore durante la cancellazione degli esauriti:", err);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};
//------------------------------------------