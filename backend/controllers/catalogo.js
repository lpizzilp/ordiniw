import { 
    getSagrabySig,
    deleteSagra,
    insertSagra,
    updateSagraCodaeInfoByID,
    getAllSagre,
    updateContrOrdini,
    getContrOrdini,
    Wakeup
} from "../models/CatalogoModel.js";


export const getSagraSig=(req,res)=>{
    getSagrabySig(req.params.sigla,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// recupera tutte le sagre
export const allSagre=(req,res)=>{
    getAllSagre(req.params.ordine,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

//------------------------------------------------
// crea il record per il catalogo sagre 
//-------------------------------------------------
export const createSagra=(req,res)=>{
    const data = req.body;
    //Cancellazione preventiva del  record prima della immissione 
    deleteSagra(data[0].id_sagra,(err,results)=> {
        if (err) {
            res.send(err);
            return;

        }else {
            res.json(results);
        }
    });
    //INSERISCI il record sagra ex-novo 
    insertSagra(data[0],(err,results)=> {

        if (err) {
            res.send(err);
            return; 

        }else {
            res.json(results);
        }
    });
};


//-------------------------------------------------------
//UPDATE delle informazioni numcoda E info 
//-------------------------------------------------------

export const updateSagraCodaeInfo=(req,res)=>{
    const data = req.body;
    const id = req.params.id;
    updateSagraCodaeInfoByID(data[0],id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};


export const updateControlOrdini=(req,res)=>{
    const data = req.body
    updateContrOrdini(data,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

export const GetControlOrdini=(req,res)=>{
    const id = req.params.id;
    getContrOrdini(id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};


export const KeepAlive=(req,res)=>{
    Wakeup((err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};