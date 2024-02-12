<template>
    <div class="register-container">
        <div class="register-form-container">
            <form id="registerForm" @submit="handleSubmit" novalidate autocomplete="off">
                <h3>Segnala il tuo errore</h3>

                <div v-if="errors.length != 0" class="error-box">
                    <ul>
                        <li v-for="error in errors" :key="error">{{ error }}</li>
                    </ul>
                </div>
                <div class="form-group">
                    <label for="uError">Seleziona il tuo errore:
                    </label>
                    <select name="uError" id="uError" v-model="ErrorObj.segnalazione" class="form-select">
                        <option v-for="Tipoerr in errori" :key="Tipoerr" :value="Tipoerr">{{ Tipoerr }}</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="uDettagli">Descrizione:
                    </label>
                    <textarea class="form-select" id="text" name="text" rows="7" cols="50" maxlength="500"
                        placeholder="Descrivi il tuo problema... (se vuoi essere ricontatto lasciaci la tua mail)"
                        v-model="ErrorObj.descrizione"></textarea>
                </div>

                <div class="form-group">
                    <input type="submit" value="Conferma" class="btn" />
                </div>
            </form>
        </div>
        <QuickViewSegnalazione v-if="showQuickVue"></QuickViewSegnalazione>
    </div>
</template>

<script>
import axios from 'axios';
import { UAParser } from 'ua-parser-js';
import QuickViewSegnalazione from '@/components/QuickViewSegnalazione.vue'
export default {
    name: "Confirm",

    data() {
        return {
            ErrorObj: { segnalazione: "", descrizione: "", telefono: "", modello: "", os: "", versioneos: "", browser: "", versionebr: "", Webkit: "", versioenwk: "", },
            errori: ["Bottoni non funzionanti", "La procedura si blocca", "Non mi viene inviata nessuna mail", "Non posso accedere al carrello", "Dopo il primo ordine l'app si blocca", "Non mi è stato assegnato un numero ordine", 'Altro...'],
            errors: [],
            showQuickVue: false,
        }
    },

    created() {
        this.getdataphone();
    },

    methods: {
        scrollToTop() {
            window.scrollTo(0, 0);
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

    components: { QuickViewSegnalazione }

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
