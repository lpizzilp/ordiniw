import db from "../config/database.js";

export const allReparti = (idsagra, result) => {
    if (!idsagra) {
        return result(null, null);
    }

    db.query(
        "SELECT DISTINCT r.* \
             FROM reparti r \
            INNER JOIN food f ON f.id_sagra = r.id_sagra AND r.idReparto = f.IdReparto \
            WHERE r.id_sagra = ? \
            ORDER BY r.peso ASC;",
        [idsagra], 
        (err, results) => {
            if (err) {
                console.error("Errore nella query allReparti:", err);
                return result(err, null);
            }
            result(null, results);
        }
    );
};