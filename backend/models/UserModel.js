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
        <div style=" whidth: 90%; padding-left:4px; padding-right:4px; background-color: #f5f5f5; padding-top: 5px; padding-botton: 5px; border-radius: 10px">
            <p style="text-align:center; font-family: 'Satisfy', cursive; font-size:25px; color:#27ae60;">Grazie</p>
            <p style="text-align: center; font-size:16px;">Buon giorno gentile cliente.<br>Il tuo numero ordine è:</p>
            <h2 style="text-align:center; font-size:60px; padding-top: 5px; padding-botton: 5px; color:#27ae60; whidth:100%; background-color: #fff;">N.`  + data.ord_id + `</h2>
            <p style="text-align: left; font-size:16px;">Questa email inviata da ordini.esagra.it per l'ordine inserito alle ore ` + data.ord_data + `<br>La ringraziamo per aver uttilizzato il nostro servizio online.</p>
            <hr style="border: 2px dashed #27ae60;">
        </div>
        <div style=" whidth: 90%; padding-left:4px; padding-right:4px; background-color: #fff; padding-top: 8px; padding-botton: 8px; border-left: 2px dashed #27ae60; border-right:  2px dashed #27ae60;">
            <p style="text-align:center; font-family: 'Satisfy', cursive; font-size:25px; color:#27ae60; padding-bottom: 2px;">Hai dei ripensamenti</p>
            <p style="text-align: center; font-size:16px;">Se ti sei accorto che nel tuo ordine manca qualcosa?<br>puoi sempre modificarlo cliccando sul bottone qui sotto </p>
            <p style="margin-top:5px;">ㅤ</p>
            <a href="` + data.user_data + `" style="padding: 10px 5px; item-aling: center; font-size: 16px; color: #fff; background: #27ae60; border-radius: 10px;">Clicca per modificare l'ordine</a>
            <p style="margin-top:5px;">ㅤ</p>
        </div>
        <div style=" whidth: 90%; padding-left:4px; padding-right:4px; background-color: #f5f5f5; padding-botton: 8px; border-radius: 10px">
            <hr style="border: 2px dashed #27ae60;">
            <p style="text-align:center; font-family: 'Satisfy', cursive; font-size:25px; color:#27ae60; padding-bottom: 2px;">Articoli Ordinati</p>
            <p style="text-align:center; font-size:16px;">Riportiamo gli articoli che hai ordinato:</p>
            <br>
            <table  width="100%" border="solid" align="center" margin-bottom="20px"><tr style="background-color: #ffffff;"><td style="background-color: #ffffff; padding-left:10px; padding-top:10px; padding-bottom:10px; font-size:16px;">Articoli</td><td style="background-color: #ffffff; padding-left:10px; padding-top:10px; padding-bottom:10px; font-size:16px; text-align: center;">Quantità` + data.ord_item + `</td></tr></table>
        </div>`;

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

