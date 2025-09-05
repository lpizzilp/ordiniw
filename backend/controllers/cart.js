// import functions from User model

import {
    getAllItems,
    getAItem,
    insertToCart,
    updateCartItemQty,
    deleteItemInCart,
    deleteAllItemsByUser,
    deleteAllItems,
    batchUpdateCart
} from "../models/CartModel.js";

// get all Items
export const allItems=(req,res)=>{ 
    const idsagra = req.headers['id-sagra']
    getAllItems(idsagra,req.params.id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// get a Item
export const getItem=(req,res)=>{
    const user_id = req.params.user_id;
    const food_id = req.params.food_id;
    getAItem(user_id,food_id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// add to cart
export const addItems=(req,res)=>{
    const data = req.body;
    insertToCart(data,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};


// update Item
export const updateItem=(req,res)=>{
    const data = req.body;
    updateCartItemQty(data,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};


// delete a item in cart
export const deleteItem=(req,res)=>{
    const user_id = req.params.user_id;
    const food_id = req.params.food_id;
    deleteItemInCart(user_id,food_id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// delete all items by user in cart
export const deleteItems=(req,res)=>{
    deleteAllItemsByUser(req.params.id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// delete all items in cart
export const deleteAll=(req, res)=>{
    deleteAllItems((err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

//aggiornamento ineshot 
export const addMultiItems = (req, res) => {
    const { user_id, items } = req.body;
    
    // Validazione input
    if (!user_id || !Array.isArray(items)) {
        return res.status(400).json({ 
            error: "user_id e items (array) sono obbligatori" 
        });
    }

    // Validazione items
    for (let item of items) {
        if (!item.food_id || !item.item_qty || item.item_qty <= 0) {
            return res.status(400).json({ 
                error: "Ogni item deve avere food_id e item_qty > 0" 
            });
        }
    }

    batchUpdateCart({ user_id, items }, (err, results) => {
        if (err) {
            console.error('Errore batch update carrello:', err);
            res.status(500).json({ 
                error: "Errore durante l'aggiornamento del carrello",
                details: err.message 
            });
        } else {
            res.json({ 
                success: true, 
                message: "Carrello aggiornato con successo",
                affected_rows: results.affectedRows
            });
        }
    });
};


export const controllerbatchUpsert = async (req, res) => {
  try {
    const { items } = req.body;
    const userId = req.user.id;

    // Validazione di base
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ 
        error: 'Items array is required and cannot be empty' 
      });
    }

    console.log(`Inizio batch upsert per user ${userId} con ${items.length} items`);
    
    // IMPORTANTE: await garantisce che l'operazione sia completamente terminata
    // incluso il commit della transazione prima di procedere
    const result = await batchUpsert(items, userId);
    
    console.log(`Batch upsert completato per user ${userId}:`, result);
    
    // La risposta viene inviata solo DOPO che il commit è stato effettuato
    res.json({ 
      success: true, 
      message: 'Carrello aggiornato con successo',
      affectedRows: result.affectedRows || items.length
    });
    
  } catch (error) {
    console.error('Errore durante batch upsert:', error);
    res.status(500).json({ 
      error: 'Errore nell\'aggiornamento del carrello',
      details: error.message
    });
  }
};

