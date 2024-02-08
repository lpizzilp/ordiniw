// import connection
import { emaildata } from "../config/emaildata.js";
import { mailOptions } from "../config/emaildata.js";

export const Emailsender = (data, result) => {
    const transporter = emaildata

    var emailText = ""
    if (data.prenotazione != 'PRE') {
        emailText = `<div style=" whidth: 90%; padding-left:4px; padding-right:4px; background-color: #f5f5f5; padding-top: 5px; padding-botton: 5px; border-radius: 10px">
            <p style="text-align:center; font-family: 'Satisfy', cursive; font-size:25px; color:#27ae60;">Grazie</p>
            <p style="text-align: center; font-size:16px;">Buongiorno gentile cliente.<br>Il tuo numero ordine è:</p>
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
            <table  width="100%" border="solid" align="center" margin-bottom="20px"><tr style="background-color: #ffffff;"><td style="background-color: #ffffff; padding-left:10px; padding-top:10px; padding-bottom:10px; font-size:16px;">Articoli</td><td style="background-color: #ffffff; padding-left:10px; padding-top:10px; padding-bottom:10px; font-size:16px; text-align: center;">Quantità` + data.ord_item.join('') + `</td></tr></table><br>
            <p style="text-align: left; font-size:16px;">Questa email inviata da <a href="` + data.sagra_link + `">ordini.esagra.it</a> per l'ordine inserito alle ore ` + data.ord_data + `<br><br>La ringraziamo per aver utilizzato il nostro servizio online.</p>
        </div>`;

        mailOptions.subject = "Il tuo codice dell' Ordine web"
    } else {
        emailText = `<div style=" whidth: 90%; padding-left:4px; padding-right:4px; background-color: #f5f5f5; padding-top: 5px; padding-botton: 5px; border-radius: 10px">
            <p style="text-align:center; font-family: 'Satisfy', cursive; font-size:25px; color:#27ae60;">Grazie</p>
            <p style="text-align: center; font-size:16px;">Buongiorno gentile cliente.<br>Il tuo codice prenotazione è:</p>
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
            <p style="text-align:center; font-family: 'Satisfy', cursive; font-size:25px; color:#27ae60; padding-bottom: 2px;">Articolo Prenotato</p>
            <p style="text-align:center; font-size:16px;">Riportiamo l'articolo che hai prenotato:</p>
            <br>
            <table  width="100%" border="solid" align="center" margin-bottom="20px"><tr style="background-color: #ffffff;"><td style="background-color: #ffffff; padding-left:10px; padding-top:10px; padding-bottom:10px; font-size:16px;">Articoli</td><td style="background-color: #ffffff; padding-left:10px; padding-top:10px; padding-bottom:10px; font-size:16px; text-align: center;">Quantità` + data.ord_item.join('') + `</td></tr></table><br>
            <p style="text-align: left; font-size:16px;">Questa email inviata da <a href="` + data.sagra_link + `">ordini.esagra.it</a> per l'ordine inserito alle ore ` + data.ord_data + `<br><br>La ringraziamo per aver utilizzato il nostro servizio online.</p>
        </div>`;

        mailOptions.subject = "La tua prenotazione Web"
    }

    mailOptions.to = data.user_email
    mailOptions.html = emailText

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Errore durante l\'invio dell\'email:', error);
            result(error, null);
        } else {
            console.log('Email inviata:', info.response);
            result(null, result[0]);
        }
    });

};


// registrazione
export const Emailregistrazione = (data, result) => {
    const transporter = emaildata

    var emailText = ""
    emailText = `<div style=" whidth: 90%; padding-left:4px; padding-right:4px; background-color: #f5f5f5; padding-top: 5px; padding-botton: 5px; border-radius: 10px">
            <p style="text-align:center; font-family: 'Satisfy', cursive; font-size:25px; color:#27ae60;">Info registrazione</p>
            <p style="text-align: left; font-size:16px;">Buongiorno nuovo amministratore,<br>Ti abbiamo inviato questa email per informarti che l'utente da te creato non è ancora attivo e per essere utilizzato dovrà essere confermato da noi.<br><br>Ti preghiamo di attendere un ulteriore email dove ti informeremo che il tuo utente è stato attivato.</p>
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
            <p style="text-align: left; font-size:16px;">Questa email inviata da <a href="` + data.sagra_link + `">ordini.esagra.it</a> per la registrazione avvenuta alle ore ` + data.reg_ora + `<br><br>La ringraziamo per aver utilizzato il nostro servizio online.</p>
        </div>`;

    mailOptions.to = data.admin_email
    mailOptions.subject = "Info utente per ordini.esagra.it"
    mailOptions.html = emailText

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Errore durante l\'invio dell\'email:', error);
            result(error, null);
        } else {
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
            <p style="text-align: left; font-size:16px;">Questa email inviata da <a href="` + data.sagra_link + `">ordini.esagra.it</a> per la registrazione avvenuta alle ore ` + data.reg_ora + `<br><br>La ringraziamo per aver utilizzato il nostro servizio online.</p>
        </div>`;

    mailOptions.subject = "Rischiesta accesso come amministratore"
    mailOptions.html = emailText

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Errore durante l\'invio dell\'email:', error);
            result(error, null);
        } else {
            console.log('Email inviata:', info.response);
            result(null, result[0]);
        }
    });

};

//Conferma registrazione
export const EmailConf = (data, result) => {
    const transporter = emaildata

    var emailText = ""
    if (data.conferma == true) {
        emailText = `<div style=" whidth: 90%; padding-left:4px; padding-right:4px; background-color: #f5f5f5; padding-top: 5px; padding-botton: 5px; border-radius: 10px">
        <p style="text-align:center; font-family: 'Satisfy', cursive; font-size:25px; color:#27ae60;">Benvenuto</p>
        <p style="text-align: left; font-size:16px;">Buongiorno nuovo amministratore,<br>Ti abbiamo inviato questa email per informarti che il tuo utente è appena stato confermato, quindi potrai cominciare ad utilizzarlo andando alla pagina<a href=` + data.admin_link + `> ordini.esagra.it/login</a>.</p>
        <hr style="border: 2px dashed #27ae60;">
        </div>
        <div style=" whidth: 90%; padding-left:4px; padding-right:4px; background-color: #fff; padding-top: 8px; padding-botton: 8px; border-left: 2px dashed #27ae60; border-right:  2px dashed #27ae60;">
            <p style="text-align:center; font-family: 'Satisfy', cursive; font-size:25px; color:#27ae60; padding-bottom: 2px;">Dati di accesso</p>
            <p style="text-align: center; font-size:16px;">Ecco i dati con cui potrai accedere:</p>
            <ul style="padding: 10px; list-style-type: none;">
                <li style="padding: 5px 10px; list-style-type: square; color: black; font-size:16px;">Utente: `+ data.admin_email + `<li>
                <li style="padding: 5px 10px; list-style-type: square; color: black; font-size:16px;">Password: `+ data.admin_password + `<li>
            </ul>
    </div>
    <div style=" whidth: 90%; padding-left:4px; padding-right:4px; background-color: #f5f5f5; padding-botton: 8px; border-radius: 10px">
        <hr style="border: 2px dashed #27ae60;">
        <p style="text-align: left; font-size:16px;">Questa email inviata da <a href="` + data.sagra_link + `">ordini.esagra.it</a><br><br>La ringraziamo per aver utilizzato il nostro servizio online.</p>
    </div>`;
    } else {
        emailText = `<div style=" whidth: 90%; padding-left:4px; padding-right:4px; background-color: #f5f5f5; padding-top: 5px; padding-botton: 5px; border-radius: 10px">
            <p style="text-align:center; font-family: 'Satisfy', cursive; font-size:25px; color:#27ae60;">Ci dispiace</p>
            <p style="text-align: left; font-size:16px;">Buongiorno gentile utente,<br>la tua registrazione come amministratore non è stata accettata, di conseguenza non potra accedere all'area di amministrazione</p>
            <hr style="border: 2px dashed #27ae60;">
            <p style="text-align: left; font-size:16px;">Questa email inviata da <a href="` + data.sagra_link + `">ordini.esagra.it</a><br><br>Se credi sia stato un errore prova a effettuare nuovamente la registrazione.</p>
        </div>`;
    }

    mailOptions.to = data.admin_email
    mailOptions.subject = "Info amministratore ordini.esagra.it"
    mailOptions.html = emailText

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Errore durante l\'invio dell\'email:', error);
            result(error, null);
        } else {
            console.log('Email inviata:', info.response);
            result(null, result[0]);
        }
    });

};

// registrazione
export const Emailsegnalazione = (data, result) => {
    const transporter = emaildata

    var emailText = ""
    emailText = `<div style=" whidth: 90%; padding-left:4px; padding-right:4px; background-color: #f5f5f5; padding-top: 5px; padding-botton: 5px; border-radius: 10px">
            <p style="text-align:center; font-family: 'Satisfy', cursive; font-size:25px; color:#f32009e3">Segnalazione Errore</p>
            <p style="text-align: left; font-size:16px;">Un utente ha riscontrato un problema mentre uttilizzava l'app.<br>I dettagli sono stati elencati qui sotto:</p>
            <form style="text-align: center; background-color: white; border-radius: 10px; whidth: 100%" novalidate autocomplete="off">
                <div style="text-align: center; margin-top: 10px; whidth: 50%">
                    <label style="text-align: left; font-size:16px;">Tipo errorre:
                    </label>
                    <select readonly style="margin: 0.7rem 0; border-radius: 0.5rem; padding: 2px 15px; font-size: 18px; color: #130f40; text-transform: none; background: #f7f7f7; border: 2px inset black;">
                        <option dropdown disabled selected>` + data.tipoerr + `</option>
                    </select>
                </div>

                <div style="text-align: center; margin-top: 10px;">
                    <label style="text-align: left; font-size:16px;">Descrizione:
                    </label>
                    <textarea readonly style="margin: 0.7rem 0; border-radius: 0.5rem; padding: 2px 15px; font-size: 18px; color: #130f40; text-transform: none; background: #f7f7f7; border: 2px inset black;" name="text" rows="20" cols="30" maxlength="500">` + data.descrizione + `</textarea>
                </div>
            </form>
            <hr style="border: 2px dashed #27ae60;">
            </div>
            <div style=" whidth: 90%; padding-left:4px; padding-right:4px; background-color: #fff; padding-top: 8px; padding-botton: 8px; border-left: 2px dashed #27ae60; border-right:  2px dashed #27ae60;">
                <p style="text-align:center; font-family: 'Satisfy', cursive; font-size:25px; color:#f32009e3; padding-bottom: 2px;">Specifiche dispositivo</p>
                <p style="text-align: center; font-size:16px;">Sono elencate le specifiche del dispositivo uttilizzato:</p>
                <ul style="padding: 10px; list-style-type: none;">
                    <li style="padding: 5px 10px; list-style-type: square; color: black; font-size:16px;">Telefono: `+ data.telefono + `<li>
                    <li style="padding: 5px 10px; list-style-type: square; color: black; font-size:16px;">Modello: ` + data.modello + `<li>
                    <li style="padding: 5px 10px; list-style-type: square; color: black; font-size:16px;">Os: `+ data.os+ `<li>
                    <li style="padding: 5px 10px; list-style-type: square; color: black; font-size:16px;">Versione os: `+ data.versioneos+ `<li>
                    <li style="padding: 5px 10px; list-style-type: square; color: black; font-size:16px;">Browser: `+ data.browser + `<li>
                    <li style="padding: 5px 10px; list-style-type: square; color: black; font-size:16px;">Versione browser: `+ data.versionebr + `<li>
                    <li style="padding: 5px 10px; list-style-type: square; color: black; font-size:16px;">WebKit: `+ data.Webkit + `<li>
                    <li style="padding: 5px 10px; list-style-type: square; color: black; font-size:16px;">Verisone webkit: `+ data.versionewk + `<li>
                </ul>
        </div>
        <div style=" whidth: 90%; padding-left:4px; padding-right:4px; background-color: #f5f5f5; padding-botton: 8px; border-radius: 10px">
            <hr style="border: 2px dashed #27ae60;">
            <p style="text-align: left; font-size:16px;">Questa email inviata il giorno ` + data.err_ora + `.<br>Valutare al situazione e correggere l'erorre.</p>
        </div>`;

    mailOptions.subject = "Segnalazione Errore"
    mailOptions.html = emailText

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {

            console.log('Errore durante l\'invio dell\'email:', error);
            result(error, null);
        } else {
            console.log('Email inviata:', info.response);
            result(null, result[0]);
        }
    });

};



