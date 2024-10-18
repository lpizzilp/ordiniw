import { 
    getSagrabySig,
    deleteSagra,
    insertSagra,
    updateSagraCodaeInfoByID,
    getAllSagre,
    updateContrOrdini,
    getContrOrdini,
    Wakeup,
    getContrVisibilita,
    getContrObbligo,
    updateContrVisibilita,
    updateContrObbligo
} from "../models/CatalogoModel.js";


export const getSagraSig=(req,res)=>{
    const idsagra = req.params.idsagra
    getSagrabySig(idsagra,req.params.sigla,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// recupera tutte le sagre
export const allSagre=(req,res)=>{
    const idsagra = req.params.idsagra
    getAllSagre(idsagra,req.params.ordine,(err,results)=> {
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
export const createSagra = async (req, res) => {
    try {
        const idsagra = req.params.idsagra
        const data = req.body;
        
        // Cancellazione preventiva del record prima dell'inserimento 
        await deleteSagra(idsagra,data[0].id_sagra);

        // Inserimento del nuovo record sagra 
        const insertedSagra = await insertSagra(idsagra,data[0]);
        
        res.json(insertedSagra);
    } catch (error) {
        res.status(500).json({ error: "Errore durante la creazione della sagra", details: error.message });
    }
};


//-------------------------------------------------------
//UPDATE delle informazioni numcoda E info 
//-------------------------------------------------------

export const updateSagraCodaeInfo=(req,res)=>{
    const idsagra = req.params.idsagra
    const data = req.body;
    const id = req.params.id;
    updateSagraCodaeInfoByID(idsagra,data[0],id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};


export const updateControlOrdini=(req,res)=>{
    const idsagra = req.params.idsagra
    const data = req.body
    updateContrOrdini(idsagra,data,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

export const updateControlVisibilita=(req,res)=>{
    const idsagra = req.params.idsagra
    const data = req.body
    updateContrVisibilita(idsagra,data,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

export const updateControlObbligo=(req,res)=>{
    const idsagra = req.params.idsagra
    const data = req.body
    updateContrObbligo(idsagra,data,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

export const GetControlOrdini=(req,res)=>{
    const idsagra = req.params.idsagra
    const id = req.params.id;
    getContrOrdini(idsagra,id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

export const GetControlVisibilita=(req,res)=>{
    const id = req.params.id;
    const idsagra = req.params.idsagra
    getContrVisibilita(idsagra,id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

export const GetControlObbligo=(req,res)=>{
    const idsagra = req.params.idsagra
    const id = req.params.id;
    getContrObbligo(idsagra,id,(err,results)=> {
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