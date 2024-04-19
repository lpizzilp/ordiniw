<template>
    <div class="register-container">
        <div class="register-form-container">
            <form id="registerForm" @submit="handleSubmit" novalidate autocomplete="off">
                <h3 style="text-align: center;">{{ page[0] }}</h3>
                <div v-if="page[1] == 0">
                    <button class="btn" @click="ChangePage(1)" style="background-color: #E5C000;">Aiuto</button>
                    <button class="btn" @click="ChangePage(2)" style="background-color: red;">Segnala Errore</button>
                    <button class="btn" @click="ChangePage(3)" style="background-color: orange;">Dacci un
                        Suggerimento</button>
                    <button class="btn" @click="ChangePage(4)" style="background-color: #27ae60;">Vota App</button>
                </div>
                <div v-else-if="page[1] == 1 || page[1] == 5 || page[1] == 6">
                    <button class="btn" id="ordinare" @click="ChangePage(5)"
                        style="background-color: white; border-color: #27ae60; color: #27ae60; text-transform: capitalize;"><i
                            class="fa-solid fa-chevron-down"></i> Come ordinare <i
                            class="fa-solid fa-chevron-down"></i></button>
                    <ul v-if="page[1] == 5" class="info-list">
                        <li style="margin: 20px 5%;">Seleziona i prodotti<br><span>Esplora il nostro menu e seleziona i
                                piatti e le pietanze che desideri ordinare e mettili nel carrello</span></li>
                        <li>Vai al carrello<br><span>Clicca sul carrello in alto a destra, oppure clicca il bottone in
                                fondo all pagina "menu" e procedi alla conferma dell'ordine cliccando "Checkout" nella
                                pagina dell carrello</span></li>
                        <li>Salva il numero ordine<br><span>Fatti inviare il numero del pre-ordine alla casella mail o
                                scrivilo da qualche parte è esenziale visto che ti servirà per il pagamento</span></li>
                        <li>Vai alla cassa<br><span>Esibisci il numero fornito dall’applicazione alle casse preposte
                                nello stand.</span></li>
                        <li>Prenotazione<br><span>La procedura è uguale a quella della cassa ma puoi prenotare un solo
                                articolo per volta</span></li>
                    </ul>
                    <button class="btn" id="utilita" @click="ChangePage(6)"
                        style="background-color: white; border-color: #f38609; color: #f38609; text-transform: capitalize;"><i
                            class="fa-solid fa-chevron-down"></i> Utilità <i
                            class="fa-solid fa-chevron-down"></i></button>
                            <ul v-if="page[1] == 6" class="info-list" style="list-style-type: disc;">
                        <li style="margin: 20px 5%;">Compatta la lista<br><span>Nel menù cliccando il selettore sotto i filtri c'è la possibilità di compattare la lista ed esplorare gli articoli più velocemente</span></li>
                        <li>Fatti mandare l'email<br><span>Per ricordare il tuo numero pre ordine puoi farti mandare una mail dalla quale potrai controllare il tuo numero ordine, gli articoli ordinati e in caso di bisogno potrai modificare il tuo ordine</span></li>
                        <li>Modifica l'ordine<br><span>Apri la mail e clicca nel bottone "modifica l'ordine". Se modificherai l'ordine ti verra asegnato un nuovo numero pre-ordine</span></li>
                        <li>Conto alla romana<br><span>In fase di checkout ti viene presentata la spesa per persona in base al numero di coperti</span></li>
                        <li>Dividi la spesa<br><span>Puoi far calcolare all'applicazione la spesa per gruppi di persone. Prova la funzone prima di ritornare alla home o riprendi la funzione dalla mail inviata.</span></li>
                    </ul>
                </div>
                <div v-else-if="page[1] == 2">
                    <div v-if="errors.length != 0" class="error-box">
                        <ul>
                            <li v-for="error in errors" :key="error">{{ error }}</li>
                        </ul>
                    </div>
                    <div class="form-group">
                        <label for="uError">Seleziona voce:
                        </label>
                        <select name="uError" id="uError" v-model="ErrorObj.segnalazione" class="form-select">
                            <option v-for="Tipoerr in errori" :key="Tipoerr" :value="Tipoerr">{{ Tipoerr }}</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="uDettagli">Descrizione:
                        </label>
                        <textarea class="form-select" id="text" name="text" rows="7" cols="50" maxlength="500"
                            placeholder="Descrivi il tuo problema o dacci un suggerimento... (se vuoi essere ricontatto lasciaci la tua mail)"
                            v-model="ErrorObj.descrizione"></textarea>
                    </div>

                    <div class="form-group">
                        <input type="submit" value="Conferma" class="btn" />
                    </div>
                </div>
                <div v-else-if="page[1] == 3">
                    <div v-if="errors.length != 0" class="error-box">
                        <ul>
                            <li v-for="error in errors" :key="error">{{ error }}</li>
                        </ul>
                    </div>
                    <div class="form-group">
                        <label for="uDettagli">Descrizione suggerimento:
                        </label>
                        <textarea class="form-select" id="text" name="text" rows="7" cols="50" maxlength="500"
                            placeholder="Dacci un suggerimento, cerca di essere il più chiaro possibile"
                            v-model="ErrorObj.descrizione"></textarea>
                    </div>

                    <div class="form-group">
                        <input type="submit" value="Conferma" @click="ErrorObj.segnalazione = 'Suggerimento'"
                            class="btn" />
                    </div>
                </div>
                <div v-else-if="page[1] == 4">
                    <div v-if="errors.length != 0" class="error-box">
                        <ul>
                            <li v-for="error in errors" :key="error">{{ error }}</li>
                        </ul>
                    </div>
                    <div class="form-group" style="text-align: center">
                        <star-rating style="padding-bottom: 10px;" :inline="true" @update:rating="Changerating"
                            :increment="0.5" :border-width="4" border-color="#d8d8d8" :rounded-corners="true"
                            :star-size="35"
                            :star-points="[23, 2, 14, 17, 0, 19, 10, 34, 7, 50, 23, 43, 38, 50, 36, 34, 46, 19, 31, 17]"
                            :show-rating="false"></star-rating>
                        <textarea class="form-select" id="text" name="text" rows="3" cols="50" maxlength="500"
                            placeholder="Lascia un feedback" v-model="ErrorObj.descrizione"></textarea>
                    </div>

                    <div class="form-group">
                        <input type="submit" value="Conferma" class="btn" />
                    </div>
                </div>
            </form>
        </div>
        <QuickViewSegnalazione v-if="showQuickVue"></QuickViewSegnalazione>
    </div>
</template>

<script>
import axios from 'axios';
import StarRating from 'vue-star-rating'
import { UAParser } from 'ua-parser-js';
import QuickViewSegnalazione from '@/components/QuickViewSegnalazione.vue'
export default {
    name: "Confirm",

    data() {
        return {
            ErrorObj: { segnalazione: "", descrizione: "", telefono: "", modello: "", os: "", versioneos: "", browser: "", versionebr: "", Webkit: "", versioenwk: "", },
            errori: ["Sulla schermata di Home non ci sono i bottoni", "Bottoni non funzionanti", "Non posso accedere al carrello", "La procedura di ordine si blocca", "Non mi è stato assegnato un numero ordine", "Non mi viene inviata nessuna mail", "Dopo il primo ordine l'app si blocca", 'Altro...'],
            errors: [],
            showQuickVue: false,
            page: ['Seleziona un opzione', 0]
        }
    },

    created() {
        this.getdataphone();
    },

    methods: {
        scrollToTop() {
            window.scrollTo(0, 0);
        },

        Changerating: function (rating) {
            this.ErrorObj.segnalazione = rating + ' stelle'
        },


        async getdataphone() {
            const parser = new UAParser();
            let UAresult = parser.getResult();
            this.ErrorObj.telefono = UAresult.device.vendor
            this.ErrorObj.modello = UAresult.device.model
            this.ErrorObj.os = UAresult.os.name
            this.ErrorObj.versioneos = UAresult.os.version
            this.ErrorObj.browser = UAresult.browser.name
            this.ErrorObj.versionebr = UAresult.browser.version
            this.ErrorObj.Webkit = UAresult.engine.name
            this.ErrorObj.versioenwk = UAresult.engine.version
        },

        ChangePage(idclick) {
            let btn = ''
            switch (idclick) {
                case 0:
                    this.page[0] = 'Seleziona un opzione'
                    break;

                case 1:
                    this.page[0] = 'Cosa vuoi sapere?'
                    break;

                case 2:
                    this.page[0] = 'Segnala il tuo errore'
                    break;

                case 3:
                    this.page[0] = 'Suggerisci una modifica'
                    break;

                case 4:
                    this.page[0] = 'Dacci la tua opinione'
                    break;

                case 5:
                    if (this.page[0] == 'Utilità') {
                        btn = document.getElementById('utilita')
                        btn.style.background = 'white'
                        btn.style.color = '#f38609'
                    }
                    this.page[0] = 'Come ordinare'
                    btn = document.getElementById('ordinare')
                    btn.style.background = '#27ae60'
                    btn.style.color = 'white'
                    break;

                case 6:
                    if (this.page[0] == 'Come ordinare') {
                        btn = document.getElementById('ordinare')
                        btn.style.background = 'white'
                        btn.style.color = '#27ae60'
                    }
                    this.page[0] = 'Utilità'
                    btn = document.getElementById('utilita')
                    btn.style.background = '#f38609'
                    btn.style.color = 'white'
                    break;
            }
            this.page[1] = idclick
        },


        async checkForm() {
            this.errors = [];

            // Select
            if (!this.ErrorObj.segnalazione) {
                this.errors.push("Scegli un tipo di segnalazione");
                this.scrollToTop();
            }

            // Desc errore
            if (!this.ErrorObj.descrizione) {
                this.errors.push("La descrizione è obbligatoria");
                this.scrollToTop();
            }
        },

        async getData() {
            var now = new Date();
            var day = ("0" + now.getDate()).slice(-2);
            var month = ("0" + (now.getMonth() + 1)).slice(-2);
            var hour = ("0" + (now.getHours())).slice(-2);
            var min = ("0" + (now.getMinutes())).slice(-2);
            return day + '/' + month + '/' + now.getFullYear() + ' alle ore ' + hour + ":" + min;
        },

        async handleSubmit(e) {
            this.checkForm();
            if (this.errors.length > 0) {
                e.preventDefault();
            } else {
                e.preventDefault();
                var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
                if (connection) {
                    connection = connection.effectiveType + ', velocità di connessione: ' + connection.downlink + ' Mbps'
                } else {
                    connection = 'API navigator.connection non supportata'
                }
                let data = {
                    tipoerr: this.ErrorObj.segnalazione,
                    descrizione: this.ErrorObj.descrizione,
                    telefono: this.ErrorObj.telefono,
                    modello: this.ErrorObj.modello,
                    os: this.ErrorObj.os,
                    versioneos: this.ErrorObj.versioneos,
                    browser: this.ErrorObj.browser,
                    versionebr: this.ErrorObj.versionebr,
                    Webkit: this.ErrorObj.Webkit,
                    versionewk: this.ErrorObj.versioenwk,
                    connessione: connection,
                    err_ora: await this.getData()
                }
                await axios.post("/mail/sengalazione/", data);
                this.showQuickVue = true
            }
        }
    },

    components: { QuickViewSegnalazione, StarRating }

};
</script>


<style scoped>
.register-container {
    padding: 2rem 9%;
}

.register-container .register-form-container {
    background: #fff;

}

.register-container .register-form-container form {
    position: relative;
    left: 50%;
    transform: translate(-50%, 0%);
    max-width: 70rem;
    width: 100%;
    box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.05);
    border: 0.1rem solid rgba(0, 0, 0, 0.2);
    padding: 2rem;
    border-radius: 0.5rem;
    animation: fadeUp 0.4s linear;
}

.register-container .register-form-container form h3 {
    padding-bottom: 1rem;
    font-size: 2rem;
    text-transform: uppercase;
    color: #130f40;
    margin: 0;
}

.register-container .register-form-container form .form-control {
    margin: 0.7rem 0;
    border-radius: 0.5rem;
    background: #f7f7f7;
    padding: 2rem 1.2rem;
    font-size: 1.6rem;
    color: #130f40;
    background: #f7f7f7;
    text-transform: none;
    width: 100%;
    border-color: black;
}

.register-container .register-form-container form .form-select {
    margin: 0.7rem 0;
    border-radius: 0.5rem;
    padding: 0.8rem 1.2rem;
    font-size: 1.6rem;
    color: #130f40;
    text-transform: none;
    width: 100%;
    background: #f7f7f7;
    border: 2px inset black;
}

.register-container .register-form-container form label {
    font-size: 2rem;
    margin-top: 10px;
    margin-bottom: 0px;
    padding: 0;
}

.register-container .register-form-container form span {
    font-size: 18px;
    padding-left: 5px;
    padding-right: 40px;
}

.register-container .register-form-container form .btn {
    margin: 1rem 0;
    width: 100%;
    text-align: center;
}

.register-container .register-form-container form p {
    padding-top: 1rem;
    font-size: 1.5rem;
    color: #666;
    margin: 0;
}

.register-container .register-form-container form p a {
    color: #27ae60;
}

.register-container .register-form-container form p a:hover {
    color: #130f40;
    text-decoration: underline;
}

.info-list {
    display: inline;
    margin: 0;
    padding: 0;
    list-style-type: decimal;
}

.info-list li {
    margin: 15px 5%;
    font-weight: 600;
    font-size: 2.2rem;
}

.info-list li span {
    font-size: 1.7rem;
    text-transform: none;
    font-weight: 400;
}

.register-container .register-form-container form .form-group {
    margin: 0;
}

.register-container .register-form-container form .form-group .error-mess {
    font-size: 1.5rem;
    position: relative;
    color: rgb(243, 47, 47);
    margin: 0;
    padding: 0;
}

.register-container .register-form-container form .error-box {
    background-color: #fff9fa;
    box-sizing: border-box;
    border: 2px solid rgba(255, 66, 79, .2);
    border-radius: 10px;
    font-size: 16px;
    margin-bottom: 20px;
}

.register-container .register-form-container form .error-box ul {
    margin: 0;
    padding: 10px 0px;
}

.register-container .register-form-container form .error-box ul li {
    padding: 5px 10px;
    list-style-type: square;
    color: black;
}
</style>
