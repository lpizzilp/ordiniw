//CHIAMATE DA SISTEMA CENTRALE 
import {
    insertReparti,
    deleteReparti,
    insertAnagrafica,
    deleteAnagrafica,
    insertEsauriti,
    deleteEsauriti
} from "../models/CallFromEsagraModel.js";

//----------------------------------------
// Inserimento reparti da sistema remoto 
//----------------------------------------
export const importReparti = async (req, res) => {
    try {
        const idsagra = req.headers['id-sagra']
        //console.log("=>>>>>>>>>>>>>>: ",idsagra)
        const data = req.body;

        // Cancella la tabella anagrafica
        await deleteReparti(idsagra);

        // Inserisci i nuovi record
        for (const element of data) {
            await insertReparti(element);
        }

        res.json({ message: 'Importazione completata con successo' });
    } catch (error) {
        console.error('Errore durante l\'importazione:', error);
        res.status(500).json({ error: 'Si è verificato un errore durante l\'importazione' });
    }
};

//----------------------------------------
// Iserimento anagrafiche da sistema remoto 
//----------------------------------------
export const importAnagrafica = async (req, res) => {
    
    try {
        const idsagra = req.headers['id-sagra']
        const data = req.body;

        // Cancella la tabella anagrafica
        await deleteAnagrafica(idsagra);

        // Inserisci i nuovi record
        for (const element of data) {
            await insertAnagrafica(element);
        }

        res.json({ message: 'Importazione completata con successo' });
    } catch (error) {
        console.error('Errore durante l\'importazione:', error);
        res.status(500).json({ error: 'Si è verificato un errore durante l\'importazione' });
    }
};

//-------------------------------------------
// Iserimento Esauriti da sistema remoto 
//-------------------------------------------
export const importEsauriti = async (req, res) => {
    try {
        const idsagra = req.headers['id-sagra']
        const data = req.body;

        // Cancella tutta la tabella esauriti
        await deleteEsauriti(idsagra); 

        // INSERISCI BLOB ESAURITI 
        for (const element of data) {
            await insertEsauriti(element);
        }

        // Rispondi solo una volta dopo l'inserimento completato
        res.json({ message: 'Inserimento completato con successo' });
    } catch (error) {
        console.error("Errore nell'importazione degli esauriti:", error);
        res.status(500).json({ error: "Si è verificato un errore nell'importazione degli esauriti" });
    }
};

export const deleteAllEsauriti = async (req, res) => {
    try {
        const idsagra = req.headers['id-sagra']
        const data = req.body;

        // Cancella tutta la tabella esauriti
        await deleteEsauriti(idsagra); 

        // Rispondi solo una volta dopo l'inserimento completato
        res.json({ message: 'Inserimento completato con successo' });
    } catch (error) {
        console.error("Errore nella cancellazione esauriti:", error);
        res.status(500).json({ error: "Si è verificato un errore nella cancellazione  degli esauriti" });
    }
};



//------------------------------------------------
// DA CANCELLAREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE //
//------------------------------------------------
// export const deleteAllEsauriti=(req,res)=>{
//     const data = req.body;
//     //Cancella tutta la tabella esauriti
//     deleteEsauriti(data,(err,results)=> {
//         if (err) {
//             res.send(err);
//             return;

//         }else {
//             res.json(results);
//         }
//     });

// };

// export const importAnagrafica=(req,res)=>{
//     const data = req.body;

//     //Cancella tutta la tabella anagrafica
//     deleteAnagrafica((err,res)=> {
//         if (err) {
//             res.send(err);
//             return;
//         }
//     });

//     // Inserisci i nuovi dati dopo aver cancellato l'anagrafica
//     insertMultipleAnagrafiche(data, (insertErr, insertResults) => {
//         if (insertErr) {
//             res.send(err);
//             return; 
//         }
//         //res.json(insertResults);
//         res.status(200).json({ message: "Anagrafiche inserite con successo", insertResults });

//     });

// };

// // Inserisci multiple anagrafiche
// const insertMultipleAnagrafiche = (data, result) => {
//     const insertions = [];
//     data.forEach(element => {
//         insertAnagrafica(element, (err, insertResult) => {
//             if (err) {
//                 result(err, null);
//                 return;
//             }
//             insertions.push(insertResult);
//             if (insertions.length === data.length) {
//                 result(null, insertions);
//             }
//         });
//     });
// };
