import { 
    getSagrabyId,
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


<<<<<<< HEAD
export const getSagraId=(req,res)=>{
    const idsagra = req.params.idsagra
    getSagrabyId(idsagra,(err,results)=> {
=======
export const getSagraSig=(req,res)=>{
    //const IdSagra = req.headers['id-sagra'];
    //console.log( IdSagra);

    getSagrabySig(req.params.sigla,(err,results)=> {
>>>>>>> origin/main
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// recupera tutte le sagre
export const allSagre=(req,res)=>{
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
        const data = req.body;
        
        // Cancellazione preventiva del record prima dell'inserimento 
        await deleteSagra(data[0].id_sagra);

        // Inserimento del nuovo record sagra 
        const insertedSagra = await insertSagra(data[0]);
        
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
    updateSagraCodaeInfoByID(data[0],idsagra,(err,results)=> {
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
    getContrOrdini(idsagra,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

export const GetControlVisibilita=(req,res)=>{
    const idsagra = req.params.idsagra
    getContrVisibilita(idsagra,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

export const GetControlObbligo=(req,res)=>{
    const idsagra = req.params.idsagra
    getContrObbligo(idsagra,(err,results)=> {
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