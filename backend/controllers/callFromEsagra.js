//CHIAMATE DA SISTEMA CENTRALE 
import {
    insertAnagrafica,
    deleteAnagrafica,
    insertEsauriti,
    deleteEsauriti
} from "../models/CallFromEsagraModel.js";

//----------------------------------------
// Iserimento anagrafiche da sistema remoto 
//----------------------------------------
export const importAnagrafica = async (req, res) => {
    try {
        const idsagra = req.params.idsagra
        const data = req.body;

        // Cancella la tabella anagrafica
        await deleteAnagrafica();

        // Inserisci i nuovi record
        for (const element of data) {
            await insertAnagrafica(idsagra,element);
        }

        res.json({ message: 'Importazione completata con successo' });
    } catch (error) {
        console.error('Errore durante l\'importazione:', error);
        res.status(500).json({ error: 'Si è verificato un errore durante l\'importazione' });
    }
};

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
//-------------------------------------------
// Iserimento Esauriti da sistema remoto 
//-------------------------------------------
export const importEsauriti = async (req, res) => {
    try {
        const idsagra = req.params.idsagra
        const data = req.body;

        // Cancella tutta la tabella esauriti
        await deleteEsauriti(); 

        // INSERISCI BLOB ESAURITI 
        for (const element of data) {
            await insertEsauriti(idsagra,element);
        }

        // Rispondi solo una volta dopo l'inserimento completato
        res.json({ message: 'Inserimento completato con successo' });
    } catch (error) {
        console.error("Errore nell'importazione degli esauriti:", error);
        res.status(500).json({ error: "Si è verificato un errore nell'importazione degli esauriti" });
    }
};

export const deleteAllEsauriti=(req,res)=>{
    const idsagra = req.params.idsagra
    const data = req.body;
    //Cancella tutta la tabella esauriti
    deleteEsauriti(idsagra,data,(err,results)=> {
        if (err) {
            res.send(err);
            return;

        }else {
            res.json(results);
        }
    });

};

