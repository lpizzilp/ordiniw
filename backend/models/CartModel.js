// import connection
import db from "../config/database.js";

// get all items by user id
export const getAllItems = (idsagra,id,result) => {
    db.query("SELECT DISTINCT  c.*, f.food_name, f.IdReparto, r.peso \
        FROM cart c JOIN food f ON f.id_sagra = ? AND f.food_id = c.food_id \
            LEFT JOIN reparti r ON r.id_sagra = f.id_sagra AND r.idReparto = f.IdReparto \
        WHERE f.food_name != 'ZZ' AND c.user_id = ? \
        ORDER BY r.peso ASC, f.IdReparto DESC, f.food_name ASC ",[ idsagra,id], (err,results)=> {


        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

// get a items by user id, food id
export const getAItem = (user,food,result) => {
    db.query("SELECT * FROM cart WHERE user_id = ? AND food_id = ?",[user, food], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

// insert new item to cart
export const insertToCart = (data,result) => {
    db.query("INSERT INTO cart SET ?",data, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

// update qty of a cart item
export const updateCartItemQty = (data,result) => {
    db.query("UPDATE cart SET item_qty = ? WHERE user_id = ? AND food_id = ?",[data.item_qty, data.user_id, data.food_id], (err,results)=> {
        if (err){
            console.error("Errore in updateCartItemQty:", err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};


// delete cart item
export const deleteItemInCart = (user,food,result) => {
    db.query("DELETE FROM cart WHERE user_id = ? AND food_id = ?",[user,food], (err,results)=> {
        if (err){
            console.error(`Errore in deleteItemInCart (user_id=${user}, food_id=${food}):`, err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

// delete all Items by user
export const deleteAllItemsByUser = (id,result) => {
    db.query("DELETE FROM cart WHERE user_id = ?",[id], (err,results)=> {
        if (err){
            console.error(`Errore in deleteAllItemsByUser (user_id=${id}):`, err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

// delete all Items
export const deleteAllItems = (result) => {
    db.query("DELETE FROM cart", (err,results)=> {
        if (err){
            console.error(`Errore in deleteAllItems:`, err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

//aggiornamento carrello multiple
export const batchUpdateCart = (data, result) => {
    const { user_id, items } = data;

    // Inizia transazione
    db.beginTransaction((err) => {
        if (err) {
            console.log('Errore inizio transazione:', err);
            return result(err, null);
        }

        // Step 1: Cancella tutti gli articoli del carrello per questo utente
        const deleteQuery = "DELETE FROM cart WHERE user_id = ?";
        
        db.query(deleteQuery, [user_id], (err, deleteResults) => {
            if (err) {
                console.log('Errore cancellazione carrello:', err);
                return db.rollback(() => {
                    result(err, null);
                });
            }

            // Step 2: Se non ci sono articoli da inserire, concludi qui
            if (items.length === 0) {
                return db.commit((err) => {
                    if (err) {
                        console.log('Errore commit (carrello vuoto):', err);
                        return db.rollback(() => {
                            result(err, null);
                        });
                    }
                    result(null, { affectedRows: deleteResults.affectedRows });
                });
            }

            // Step 3: Prepara i dati per l'inserimento multiplo
            const insertQuery = "INSERT INTO cart (user_id, food_id, item_qty) VALUES ?";
            const values = items.map(item => [
                user_id,
                item.food_id,
                parseInt(item.item_qty)
            ]);

            // Step 4: Inserimento multiplo
            db.query(insertQuery, [values], (err, insertResults) => {
                if (err) {
                    console.log('Errore inserimento multiplo:', err);
                    return db.rollback(() => {
                        result(err, null);
                    });
                }

                // Step 5: Commit transazione
                db.commit((err) => {
                    if (err) {
                        console.log('Errore commit:', err);
                        return db.rollback(() => {
                            result(err, null);
                        });
                    }

                    // Successo!
                    result(null, {
                        affectedRows: insertResults.affectedRows,
                        insertId: insertResults.insertId,
                        deletedRows: deleteResults.affectedRows
                    });
                });
            });
        });
    });
};

