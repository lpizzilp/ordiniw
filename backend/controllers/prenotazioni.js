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
    getsum,
    getqtaperordine,
    deleteBookstatusById,
    deleteBookdetailsById
} from "../models/PrenotazioniModel.js";


// Prendi nuovo id
export const PredinuovoId=(req,res)=>{
    const idsagra = req.params.idsagra
    PrendiId(idsagra,(err,results)=> {
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
    insertDettaglio(idsagra,data,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// controllo quantità
export const checkquantita=(req,res)=>{
    const idsagra = req.params.idsagra
    checkfood(idsagra,(err,results)=> {
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
    const idsagra = req.params.idsagra
    getPrenotGtId(idsagra,req.params.id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};


export const deleteAllBook=(req,res)=>{
    const idsagra = req.params.idsagra
    const id = req.params.id;
    deleteAllBooks(idsagra,id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

      

export const getPrenDetailsById=(req,res)=>{
    const idsagra = req.params.idsagra
    getPrenDetails(idsagra,req.params.id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// prendi tutte le prenotazoni
export const getAllPrenot=(req,res)=>{
    const idsagra = req.params.idsagra
    getAll(idsagra,req.params.id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

export const PutAction=(req,res)=>{
    const idsagra = req.params.idsagra
    const data = req.body;
    Updatestatus(idsagra,data,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

export const Totsum=(req,res)=>{
    const idsagra = req.params.idsagra
    getsum(idsagra,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

export const SumPerOrdine=(req,res)=>{
    const idsagra = req.params.idsagra
    getqtaperordine(idsagra,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

export const cancelBookstatus=(req,res)=>{
    const idsagra = req.params.idsagra
    deleteBookstatusById(idsagra,req.params.id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

export const cancelBookdetails=(req,res)=>{
    const idsagra = req.params.idsagra
    deleteBookdetailsById(idsagra,req.params.id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};


