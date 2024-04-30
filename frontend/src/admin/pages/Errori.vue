<template>
    <div class="admin-container">
        <div class="d-flex justify-content-between">
            <h1><i class="fa-solid fa-triangle-exclamation"> Errori</i></h1>
            <button v-if="Showmodifica == false" class="btn" @click="GestClick('Modifica')"><i class="fa-solid fa-info"
                    style="padding-right: 1vh;"></i>Dettagli riga{{ Nriga == null ? null : ' N.' + Nriga }}</button>
        </div>

        <div v-if="Showmodifica == false" class="table-open">
            <table class="project-list" id="Tabella">
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Tipo</td>
                        <td>Segnalazione</td>
                        <td>Dispositivo</td>
                        <td>OS</td>
                        <td>Connessione</td>
                        <td>Ora errore</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(t, index) in filterErr.toReversed()" :key="t.id" @click="Selectriga(index, t)"
                        @dblclick="GestClick('Modifica')">
                        <td style="border-right: 2px inset #27ae60;"
                            :style="{ 'background-color': t.tiposegnalazione == 'ERRORE' ? '#e95018cb' : t.tiposegnalazione == 'SUGGERIMENTO' ? '#ffa500' : '#2ae477c4' }">
                            {{ t.id }}</td>
                        <td style="border-right: 2px inset #27ae60; text-transform: lowercase;"
                            :style="{ 'background-color': t.tiposegnalazione == 'ERRORE' ? '#e95018cb' : t.tiposegnalazione == 'SUGGERIMENTO' ? '#ffa500' : '#2ae477c4' }">
                            {{ t.tiposegnalazione }}</td>
                        <td style="border-right: 2px inset #27ae60;"
                            :style="{ 'background-color': t.tiposegnalazione == 'ERRORE' ? '#e95018cb' : t.tiposegnalazione == 'SUGGERIMENTO' ? '#ffa500' : '#2ae477c4' }">
                            {{ t.tipoerr }}</td>
                        <td style="border-right: 2px inset #27ae60;">{{ t.telefono === null ? 'PC' : t.telefono }}</td>
                        <td style="border-right: 2px inset #27ae60;">{{ t.os }}</td>
                        <td style="border-right: 2px inset #27ae60;">{{ t.connessione }}</td>
                        <td style="border-right: 2px inset #27ae60;">{{ t.err_ora }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else class="register-form-container">
            <form id="registerForm" @submit="GestClick('Conferma')" novalidate autocomplete="off">
                <table style="text-align: center; width: 100%;">
                    <tr style="text-align: center">
                        <td>
                            <h3
                                :style="{ 'color': DetailObj.Tipo == 'ERRORE' ? '#e95018cb' : DetailObj.Tipo == 'SUGGERIMENTO' ? '#ffa500' : '#2ae477c4', 'margin-top': '2rem', 'text-align': 'center' }">
                                {{ DetailObj.Tipo }}: <span style="text-transform: lowercase;"> {{ DetailObj.Err
                                    }}</span></h3>
                            <h4 style="margin-top: 15px;">{{ DetailObj.err_ora }}</h4>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="form-group">
                                <textarea type="text area" name="uDesc" id="uDesc" class="form-control" readonly
                                    :placeholder="DetailObj.Descrizione"
                                    style="border: 0; border-bottom: 1px inset black;"
                                    v-model="DetailObj.Descrizione"></textarea>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for="uPass" style="margin-top: 10px;">Dispositivo
                            </label>
                            <div style="display: flex; justify-content: center; flex-wrap: wrap;">
                                <input type="text" readonlyname="uTel" style="flex: 50%; border-right: 1px inset black;"
                                    :placeholder="DetailObj.Telefono == null ? 'PC' : DetailObj.Telefono" id="uTel"
                                    class="form-control" v-model="DetailObj.Telefono" />
                                <input type="text" name="uMod" style="flex: 50%;" :placeholder="DetailObj.Modello"
                                    id="uMod" class="form-control" v-model="DetailObj.Modello" />
                                <input type="text" name="uOs" style=" flex: 50%; border-right: 1px inset black;"
                                    :placeholder="DetailObj.OS" id="uOs" class="form-control" v-model="DetailObj.OS" />
                                <input type="text" name="uVersOs" style=" flex: 50%;" :placeholder="VersioneOS"
                                    id="uVersOs" class="form-control" v-model="VersioneOS" />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for="uPass" style="margin-top: 10px;">Browser
                            </label>
                            <div style="display: flex; justify-content: center; flex-wrap: wrap;">
                                <input type="text" readonlyname="ubrowser"
                                    style="flex: 50%; border-right: 1px inset black;" :placeholder="DetailObj.Browser"
                                    id="ubrowser" class="form-control" v-model="DetailObj.Browser" />
                                <input type="text" name="uMod" style="flex: 50%;" :placeholder="DetailObj.VersioneBR"
                                    id="uMod" class="form-control" v-model="DetailObj.VersioneBR" />
                                <input type="text" name="uWebkit" style=" flex: 50%; border-right: 1px inset black;"
                                    :placeholder="DetailObj.WebKit" id="uWebkit" class="form-control"
                                    v-model="DetailObj.WebKit" />
                                <input type="text" name="uVerswebkit" style=" flex: 50%;"
                                    :placeholder="DetailObj.Versionewk" id="uVerswebkit" class="form-control"
                                    v-model="DetailObj.Versionewk" />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for="uauthlevel" style="margin-top: 10px;">Connessione:
                            </label>
                            <input type="text" readonly name="uconnect" :placeholder="DetailObj.connessione"
                                id="uconnect" class="form-control" v-model="DetailObj.connessione" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button class="btn" @click="GestClick('Annulla')" style="margin-top: 20px; width: 50%;">Torna
                                indietro</button>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
    </div>
    <QuickViewErrore v-if="Quickerrore"></QuickViewErrore>
</template>


<script>
import axios from "axios";
import QuickViewErrore from '@/components/QuickViewErrore.vue';
import { mapState, mapMutations } from "vuex";
export default {
    name: 'Tabrrori',

    data() {
        return {
            DetailObj: { Id: "", Tipo: "", Err: "", Descrizione: "", Telefono: "", Modello: "", OS: "", VersioneOS: "", Browser: "", VersioneBR: "", WebKit: "", Versionewk: "", connessione: "", err_ora: "" },
            Showmodifica: false,
            status: [],
            Errori: [],
            Nriga: null,
            Quickerrore: false,
            showQuickview: false
        }
    },

    created() {
        if (!this.admin) {
            this.$router.push("/login");
        } else {
            this.GetErr()
        }
    },

    computed: {
        ...mapState(["admin"]),
        filterErr: function () {
            return this.Errori;
        },
    },

    methods: {
        ...mapMutations(["setAdmin"]),

        async GetErr() {
            this.Errori = (await axios.get('/errori')).data
        },

        handleLogout: function () {
            this.setAdmin("");
        },

        Selectriga(index) {
            this.Nriga = index + 1
            var Tabella = document.getElementById("Tabella");
            for (let i = 1; i < Tabella.rows.length; i++) {
                if ((index + 1) == i) {
                    Tabella.rows[(index + 1)].style.backgroundColor = "yellow"
                    Tabella.rows[(index + 1)].cells[3].style.backgroundColor = "yellow"
                } else {
                    Tabella.rows[i].style.backgroundColor = 'transparent';
                    Tabella.rows[i].cells[3].style.backgroundColor = 'transparent'
                }
            }
        },

        async Rigadata() {
            var Tabella = this.filterErr.toReversed()[(this.Nriga - 1)];
            this.DetailObj.Id = Tabella.id
            this.DetailObj.Tipo = Tabella.tiposegnalazione
            this.DetailObj.Err = Tabella.tipoerr
            this.DetailObj.Descrizione = Tabella.descrizione
            this.DetailObj.Telefono = Tabella.telefono
            this.DetailObj.Modello = Tabella.Modello
            this.DetailObj.OS = Tabella.os
            this.DetailObj.VersioneOS = Tabella.versioneos
            this.DetailObj.Browser = Tabella.browser
            this.DetailObj.VersioneBR = Tabella.versionebr
            this.DetailObj.WebKit = Tabella.Webkit
            this.DetailObj.Versionewk = Tabella.versionewk
            this.DetailObj.connessione = Tabella.connessione
            this.DetailObj.err_ora = Tabella.err_ora
        },

        async Confuser() {
            let data = {
                user_email: this.ModifyObj.email,
                user_password: this.ModifyObj.pass,
                id_sagra: this.ModifyObj.id_sagra,
                user_name: this.ModifyObj.name,
                authlevel: this.ModifyObj.authlevel,
            }
            await axios.post("/users/", data);
        },

        async GestClick(type) {
            switch (type) {
                case 'Annulla':
                    this.Showmodifica = false
                    break;

                case 'Elimina':
                    await axios.delete("/users/delete/" + this.ModifyObj.email)
                    break;

                case 'Conferma':
                    await axios.delete("/users/delete/" + this.ModifyObj.email)
                    await this.Confuser()
                    break;

                case 'Modifica':
                    if (this.Nriga != null || this.Nriga != undefined) {
                        await this.Rigadata()
                        this.Nriga = null
                        this.Showmodifica = true
                    }
                    break;
            }
        },

        async Makelog(index) {
            let arg = ""
            if (this.toggle[index] === true) {
                arg = 'Disabilitazione'
            } else if (this.toggle[index] === false) {
                arg = 'Abbilitazione'
            }

            let data = {
                mode: 'warn',
                arg: arg + ' toggle switch numero ' + (index + 1) + ' da parte di ' + sessionStorage.getItem('User')
            }
            await axios.post('/log', data)
        },
    },
    components: { QuickViewErrore }
}
</script>

<style scoped>
.admin-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin-left: 20%;
    margin-bottom: 0;
    background-color: whitesmoke;
    padding: 5rem 5%;
    font-size: 16px;
}

.admin-container h1 {
    font-family: 'Satisfy', cursive;
    font-size: 1.5em;
    color: #27ae60;
}

.project-list {
    width: 100%;
    text-align: center;
}

.project-list>thead>tr>td {
    border: 2px inset #27ae60;
    background-color: whitesmoke;
    font-weight: 600;
}

.project-list>tbody>tr>td {
    border: 2px inset #27ae60;
    border-left: none;
    border-right: none;
    border-bottom: none;
    padding: 5px;
}

.project-list>tbody>tr:hover {
    background-color: aliceblue;
}

.table-open::-webkit-scrollbar {
    width: 1rem;
}

.table-open::-webkit-scrollbar-track {
    background: #fff;
}

.table-open::-webkit-scrollbar-thumb {
    background: #f38609;
    border-radius: 5rem;
}

.table-open {
    width: 100%;
    margin: 4vh 0vh;
    text-align: center;
    background-color: white;
    border: 1px outset black;
    border-radius: 5px;
}

.register-form-container {
    margin-left: 12.5%;
    width: 75%;
    text-align: center;
    background-color: white;
    border: 2px inset black;
    border-radius: 10px;
}

.register-form-container form h3 {
    font-size: 2rem;
    text-transform: uppercase;
    color: #130f40;
}

.register-form-container form .form-control {
    margin: 0;
    background: white;
    text-align: center;
    padding: 2rem 1.2rem;
    font-size: 1.6rem;
    text-transform: none;
    border: 0;
    border-top: 1px inset black;
    border-bottom: 1px inset black;
    border-radius: 0.5rem;
}


.register-form-container form label {
    font-size: 1.7rem;
    margin-top: 10px;
    margin-bottom: 0px;
}

.register-form-container form .btn {
    margin: 1.5rem 0;
    width: 100%;
    text-align: center;
}

.register-form-container form .mobile {
    display: none;
}

.register-form-container form .form-group {
    margin: 0;
}

.register-form-container form .form-group input::placeholder {
    color: black;
}

.register-form-container form .form-group .error-mess {
    font-size: 1.5rem;
    position: relative;
    color: rgb(243, 47, 47);
    margin: 0;
    padding: 0;
}

.register-form-container form .error-box {
    background-color: #fff9fa;
    box-sizing: border-box;
    border: 2px solid rgba(255, 66, 79, .2);
    border-radius: 10px;
    font-size: 16px;
    margin-bottom: 20px;
}

.register-form-container form .error-box ul {
    margin: 0;
    padding: 10px 0px;
}

.register-form-container form .error-box ul li {
    padding: 5px 10px;
    list-style-type: square;
    color: black;
}


@media (max-width: 983px) {
    .admin-container {
        margin: 0px;
        margin-top: 70px;
        padding-bottom: 0px;
        background-color: whitesmoke;
        font-size: 16px;
    }

    .admin-container h1 {
        font-family: 'Satisfy', cursive;
        font-size: 1.2em;
        color: #27ae60;
    }

    .table-open {
        width: 100%;
        text-align: center;
        background-color: white;
        border: 1px outset black;
        border-radius: 5px;
        overflow-x: auto;
    }

    .register-form-container {
        margin-top: 30px;
    }


    .admin-container .pc {
        display: none;
    }

    .register-form-container form .mobile {
        display: block;
    }
}
</style>