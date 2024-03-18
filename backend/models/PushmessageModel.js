// Funzione per inviare una notifica push
export async function inviaNotifica (data, result){
    const admin = require("firebase-admin");

    // Inizializza l'app Firebase con le tue credenziali di servizio
    const serviceAccount = require("../config/firebase-adminsdk.js");
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    const message = {
        token: data.token,
        notification: {
            title: data.titolo.tostring(),
            body: data.corpo.tostring()
        }
    };

    try {
        const response = await admin.messaging().send(message);
        result(null, response);
        console.log("Notifica inviata con successo:", response);
    } catch (error) {
        result(error, null);
        console.error("Errore nell'invio della notifica:", error);
    }
}