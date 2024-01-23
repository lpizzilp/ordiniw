import {
    PrendiId,
    checkfood,
    insertDettaglio,
    insertPrenotazione,
    getPrenotGtId,
    deleteAllBooks,
    getPrenDetails,
    getAll,
    Updatestatus,
    getsum
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

// get tutte le prenotazioni inserite maggiori un determinato id 
// ...Se l'id non viene passato  vengono fornite tutte  
export const getAllPrenotGtId=(req,res)=>{
    getPrenotGtId(req.params.id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};


export const deleteAllBook=(req,res)=>{
    const id = req.params.id;
    deleteAllBooks (id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

      

export const getPrenDetailsById=(req,res)=>{
    getPrenDetails(req.params.id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// prendi tutte le prenotazoni
export const getAllPrenot=(req,res)=>{
    getAll(req.params.id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

export const PutAction=(req,res)=>{
    const data = req.body;
    Updatestatus(data,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

export const Totsum=(req,res)=>{
    getsum((err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};


