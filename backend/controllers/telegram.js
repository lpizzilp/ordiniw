// Importa funzione dal modello
import { MsgSender } from "../models/TelegramModel.js";


// Controller per invio messaggio Telegram
export const sendMsg = (req, res) => {
    let Umsg = req.body;
    const idsagra = req.headers['id-sagra']
    //console.log(idsagra);
    MsgSender(idsagra, Umsg, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};

