// import connection
import db from "../config/database.js";
import { emaildata } from "../config/emaildata.js";
import { mailOptions } from "../config/emaildata.js";


// prendi nuovo id
export const NuovoId = (result) => {
    db.query("SELECT user_id FROM user ORDER BY user_id DESC LIMIT 0, 1", (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        }
        else {
            result(null, results[0]);
        }
    });
};

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
    db.query("SELECT * FROM user WHERE user_email = ?", [data], (err, results) => {
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
    const transporter = emaildata

    var emailText = ""
    if (data.prenotazione != 'PRE') {
        emailText = `<div style=" whidth: 90%; padding-left:4px; padding-right:4px; background-color: #f5f5f5; padding-top: 5px; padding-botton: 5px; border-radius: 10px">
            <p style="text-align:center; font-family: 'Satisfy', cursive; font-size:25px; color:#27ae60;">Grazie</p>
            <p style="text-align: center; font-size:16px;">Buon giorno gentile cliente.<br>Il tuo numero ordine è:</p>
            <h2 style="text-align:center; font-size:60px; padding-top: 5px; padding-botton: 5px; color:#27ae60; whidth:100%; background-color: #fff;">N.`  + data.ord_id + `</h2>
            <hr style="border: 2px dashed #27ae60;">
        </div>
        <div style=" whidth: 90%; padding-left:4px; padding-right:4px; background-color: #fff; padding-top: 8px; padding-botton: 8px; border-left: 2px dashed #27ae60; border-right:  2px dashed #27ae60;">
                <p style="text-align:center; font-family: 'Satisfy', cursive; font-size:25px; color:#27ae60; padding-bottom: 2px;">Hai dei ripensamenti?</p>
                <p style="text-align: center; font-size:16px;">Se ti sei accorto che nel tuo ordine manca qualcosa,<br>puoi sempre modificarlo cliccando sul bottone qui sotto </p>
                <p style="margin-top:5px;">ㅤ</p>
                <a href="` + data.user_data + `" style="padding: 10px 5px; item-aling: center; font-size: 16px; color: #fff; background: #27ae60; border-radius: 10px;">Clicca e modifica l'ordine</a>
                <p style="margin-top:5px;">ㅤ</p>
        </div>
        <div style=" whidth: 90%; padding-left:4px; padding-right:4px; background-color: #f5f5f5; padding-botton: 8px; border-radius: 10px">
            <hr style="border: 2px dashed #27ae60;">
            <p style="text-align:center; font-family: 'Satisfy', cursive; font-size:25px; color:#27ae60; padding-bottom: 2px;">Articoli Ordinati</p>
            <p style="text-align:center; font-size:16px;">Riportiamo gli articoli che hai ordinato:</p>
            <br>
            <table  width="100%" border="solid" align="center" margin-bottom="20px"><tr style="background-color: #ffffff;"><td style="background-color: #ffffff; padding-left:10px; padding-top:10px; padding-bottom:10px; font-size:16px;">Articoli</td><td style="background-color: #ffffff; padding-left:10px; padding-top:10px; padding-bottom:10px; font-size:16px; text-align: center;">Quantità` + data.ord_item + `</td></tr></table><br>
            <p style="text-align: left; font-size:16px;">Questa email inviata da <a href="` + data.sagra_link + `">ordini.esagra.it</a> per l'ordine inserito alle ore ` + data.ord_data + `<br><br>La ringraziamo per aver uttilizzato il nostro servizio online.</p>
        </div>`;
    } else {
        emailText = `<div style=" whidth: 90%; padding-left:4px; padding-right:4px; background-color: #f5f5f5; padding-top: 5px; padding-botton: 5px; border-radius: 10px">
            <p style="text-align:center; font-family: 'Satisfy', cursive; font-size:25px; color:#27ae60;">Grazie</p>
            <p style="text-align: center; font-size:16px;">Buon giorno gentile cliente.<br>Il tuo numero ordine è:</p>
            <h2 style="text-align:center; font-size:60px; padding-top: 5px; padding-botton: 5px; color:#27ae60; whidth:100%; background-color: #fff;">N.`  + data.ord_id + `</h2>
            <hr style="border: 2px dashed #27ae60;">
        </div>
        <div style=" whidth: 90%; padding-left:4px; padding-right:4px; background-color: #f5f5f5; padding-botton: 8px; border-radius: 10px">
            <hr style="border: 2px dashed #27ae60;">
            <p style="text-align:center; font-family: 'Satisfy', cursive; font-size:25px; color:#27ae60; padding-bottom: 2px;">Articoli Ordinati</p>
            <p style="text-align:center; font-size:16px;">Riportiamo gli articoli che hai ordinato:</p>
            <br>
            <table  width="100%" border="solid" align="center" margin-bottom="20px"><tr style="background-color: #ffffff;"><td style="background-color: #ffffff; padding-left:10px; padding-top:10px; padding-bottom:10px; font-size:16px;">Articoli</td><td style="background-color: #ffffff; padding-left:10px; padding-top:10px; padding-bottom:10px; font-size:16px; text-align: center;">Quantità` + data.ord_item + `</td></tr></table><br>
            <p style="text-align: left; font-size:16px;">Questa email inviata da <a href="` + data.sagra_link + `">ordini.esagra.it</a> per l'ordine inserito alle ore ` + data.ord_data + `<br><br>La ringraziamo per aver uttilizzato il nostro servizio online.</p>
        </div>`;
    }


    mailOptions.to = data.user_email
    mailOptions.html = emailText

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('errore')
            console.log('Errore durante l\'invio dell\'email:', error);
            result(error, null);
        } else {
            console.log('invio')
            console.log('Email inviata:', info.response);
            result(null, result[0]);
        }
    });

};


export const Emailregistrazione = (data, result) => {
    const transporter = emaildata

    var emailText = ""
    emailText = `<div style=" whidth: 90%; padding-left:4px; padding-right:4px; background-color: #f5f5f5; padding-top: 5px; padding-botton: 5px; border-radius: 10px">
            <p style="text-align:center; font-family: 'Satisfy', cursive; font-size:25px; color:#27ae60;">Info registrazione</p>
            <p style="text-align: left; font-size:16px;">Buon giorno nuovo amministratore,<br>Ti abbiamo inviato questa email per informarti che l'utente da te creato non è ancora attivo e per essere uttilizzado dovrà essere confermato da noi.<br><br>Ti preghiamo di attendere un ulteriore email dove ti informeremo che il tuo utente è stato attivato.</p>
            <hr style="border: 2px dashed #27ae60;">
            </div>
            <div style=" whidth: 90%; padding-left:4px; padding-right:4px; background-color: #fff; padding-top: 8px; padding-botton: 8px; border-left: 2px dashed #27ae60; border-right:  2px dashed #27ae60;">
                <p style="text-align:center; font-family: 'Satisfy', cursive; font-size:25px; color:#27ae60; padding-bottom: 2px;">Dati inseriti</p>
                <p style="text-align: center; font-size:16px;">Ti presentiamo la lista dei dati che hai inserito:</p>
                <ul style="padding: 10px; list-style-type: none;">
                    <li style="padding: 5px 10px; list-style-type: square; color: black; font-size:16px;">Nome: `+ data.admin_name + `<li>
                    <li style="padding: 5px 10px; list-style-type: square; color: black; font-size:16px;">Email: `+ data.admin_email + `<li>
                    <li style="padding: 5px 10px; list-style-type: square; color: black; font-size:16px;">Password: `+ data.admin_password + `<li>
                    <li style="padding: 5px 10px; list-style-type: square; color: black; font-size:16px;">Sagra: `+ data.admin_sagra + `<li>
                </ul>
        </div>
        <div style=" whidth: 90%; padding-left:4px; padding-right:4px; background-color: #f5f5f5; padding-botton: 8px; border-radius: 10px">
            <hr style="border: 2px dashed #27ae60;">
            <p style="text-align: left; font-size:16px;">Questa email inviata da <a href="` + data.sagra_link + `">ordini.esagra.it</a> per l'ordine inserito alle ore ` + data.reg_ora + `<br><br>La ringraziamo per aver uttilizzato il nostro servizio online.</p>
        </div>`;

    mailOptions.to = data.admin_email
    mailOptions.html = emailText

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('errore')
            console.log('Errore durante l\'invio dell\'email:', error);
            result(error, null);
        } else {
            console.log('invio')
            console.log('Email inviata:', info.response);
            result(null, result[0]);
        }
    });

    emailText = `<div style=" whidth: 90%; padding-left:4px; padding-right:4px; background-color: #f5f5f5; padding-top: 5px; padding-botton: 5px; border-radius: 10px">
            <p style="text-align:center; font-family: 'Satisfy', cursive; font-size:25px; color:#27ae60;">Richiesta registrazione</p>
            <p style="text-align: center; font-size:16px;">Un nuovo utente ha richiesto l'accesso come amministratore.<br>Controlla le informazioni e conferma l'utente</p>
            <hr style="border: 2px dashed #27ae60;">
        </div>
        <div style=" whidth: 90%; padding-left:4px; padding-right:4px; background-color: #fff; padding-top: 8px; padding-botton: 8px; border-left: 2px dashed #27ae60; border-right:  2px dashed #27ae60;">
                <p style="text-align:center; font-family: 'Satisfy', cursive; font-size:25px; color:#27ae60; padding-bottom: 2px;">Info utente</p>
                <p style="text-align: center; font-size:16px;">Ecco i dati inseriti dall'utente:</p>
                <ul style="padding: 10px; list-style-type: none;">
                    <li style="padding: 5px 10px; list-style-type: square; color: black; font-size:16px;">Nome: `+ data.admin_name + `<li>
                    <li style="padding: 5px 10px; list-style-type: square; color: black; font-size:16px;">Email: `+ data.admin_email + `<li>
                    <li style="padding: 5px 10px; list-style-type: square; color: black; font-size:16px;">Password: `+ data.admin_password + `<li>
                    <li style="padding: 5px 10px; list-style-type: square; color: black; font-size:16px;">Sagra: `+ data.admin_sagra + `<li>
                </ul>
                <p style="margin-top:5px;">ㅤ</p>
                <a href="` + data.confirm_link + `" style="padding: 10px 5px; item-aling: center; font-size: 16px; color: #fff; background: #27ae60; border-radius: 10px;">Conferma l'utente</a>
                <p style="margin-top:5px;">ㅤ</p>
        </div>
        <div style=" whidth: 90%; padding-left:4px; padding-right:4px; background-color: #f5f5f5; padding-botton: 8px; border-radius: 10px">
            <hr style="border: 2px dashed #27ae60;">
            <p style="text-align: left; font-size:16px;">Questa email inviata da <a href="` + data.sagra_link + `">ordini.esagra.it</a> per l'ordine inserito alle ore ` + data.reg_ora + `<br><br>La ringraziamo per aver uttilizzato il nostro servizio online.</p>
        </div>`;


    mailOptions.to = "giulio.pizzinato@gmail.com"
    mailOptions.html = emailText

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('errore')
            console.log('Errore durante l\'invio dell\'email:', error);
            result(error, null);
        } else {
            console.log('invio')
            console.log('Email inviata:', info.response);
            result(null, result[0]);
        }
    });

};

