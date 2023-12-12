// import connection
import db from "../config/database.js";
import nodemailer from 'nodemailer'

// get all user
export const getAllUser = (result) => {
    db.query("SELECT * FROM user", (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results[0]);
        }
    });
};


// get single user
export const getUserByEmail = (data, result) => {
    db.query("SELECT user_id, user_email, user_password FROM user WHERE user_name = ?", [data], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results[0]);
        }
    });
};

// insert User
export const insertUser = (data, result) => {
    db.query("INSERT INTO user SET ?", data, (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results[0]);
        }
    });
};


export const Emailsender = (data, result) => {
    console.log('passo')
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'giulio.pizzinato@gmail.com',
            pass: 'cqjl dyeg vzlo rxgc'
        },
    });

    const emailText = `
        <p style="text-align:left; font-size:16px;">Buongiorno gentile cliente,<br>
        Questa è l' email inviata da ordini.esagra.it alle ` + data.ord_data + ` riqurdo il tuo ordine online,<br>volevamo ricordarti che il codice per il pagamento del tuo ordine è:</p><br><h2 style="text-align:center; font-size:70px; color:#27ae60; ma">` + data.user_id + `</h2>
        <p style="text-align:left; font-size:16px;">La ringraziamo per aver uttilizzato il nostro servizio online.</p>
        <hr style="border: 2px dotted #999933; margin-bottom:10px;">
        <hr>
        <hr style="border: 2px dotted #999933; margin-top:10px;">
        <p style="text-align:left; font-size:16px;">In caso di qualsiasi problematica qui sotto riportiamo gli articoli che hai ordinato:</p>
        `;

    const mailOptions = {
        from: 'giulio.pizzinato@gmail.com',
        to: data.user_email,
        subject: "Il tuo codice dell' Ordine web",
        html: emailText,
    };

    console.log(transporter)

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('passerr')
            console.log('Errore durante l\'invio dell\'email:', error);
            result(error, null);
        } else {
            console.log('inv')
            console.log('Email inviata:', info.response);
            result(null, result[0]);
        }
    });

};


