import {
    PrendiId,
    checkfood,
    insertDettaglio,
    insertPrenotazione
} from "../models/PrenotazioniModel.js";


// Prendi nuovo id
export const PredinuovoId=(req,res)=>{
    PrendiId((err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// crea nuova Prenotazione
export const createPrenotazione=(req,res)=>{
    const data = req.body;
    insertPrenotazione(data,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// crea dettaglio
export const createDettaglio=(req,res)=>{
    const data = req.body;
    insertDettaglio(data,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// controllo quantità
export const checkquantita=(req,res)=>{
    checkfood((err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};
