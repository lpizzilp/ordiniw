// import axios from "axios";
// import { token, chat_id } from "../config/TelegramData.js";

// export const MsgSender = async (data, result) => {
//     const message = data.msg;
//     const silent = data.silent === true; // true/false

//     if (!message) {
//         return result({ error: "Messaggio mancante" }, null);
//     }

//     const url = `https://api.telegram.org/bot${token}/sendMessage`;

//     try {
//         const response = await axios.get(url, {
//             params: {
//                 chat_id,
//                 text: message,
//                 disable_notification: silent
//             }
//         });
//         result(null, response.data);
//     } catch (error) {
//         result(error.response?.data || error.message, null);
//     }
// };


import https from 'https';
import { token, chat_id } from '../config/TelegramData.js';
import { URL } from 'url';

export const MsgSender = async (idsagra, data, result) => {
    const message = data.msg;
    const silent = data.silent === true;

    if (!message) {
        return result({ error: "Messaggio mancante" }, null);
    }

    const params = new URLSearchParams({
        chat_id,
        text: 'Sagra: ' + idsagra + '-\n' + message,
        disable_notification: silent
    });

    const url = new URL(`https://api.telegram.org/bot${token}/sendMessage?${params.toString()}`);

    https.get(url, res => {
        let body = '';

        res.on('data', chunk => {
            body += chunk;
        });

        res.on('end', () => {
            try {
                const json = JSON.parse(body);
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    result(null, json);
                } else {
                    result(json, null);
                }
            } catch (e) {
                result({ error: 'Errore nella decodifica della risposta' }, null);
            }
        });
    }).on('error', err => {
        result({ error: err.message }, null);
    });
};
