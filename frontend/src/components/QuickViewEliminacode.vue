<template>
    <div class="quick-view">
        <div v-if="Show == 0" class="quick-view-inner">
            <h2>Fatti avvisare</h2><br>
            <h3>Ti verra inviato un messaggio quando sarà il tuo turno<br><br>
                Inserisci il numero del tuo ticket<br><br>
                <slot></slot>
            </h3>
            <div class="writespace">
                <input type="number" min="0" max="9" maxlength="1" @input="Changeinput(1)"
                    oninput="this.value = this.value.slice(0, 1)" name="input0" id="input0" v-model="Ncliente[0]" />
                <input type="number" min="0" max="9" maxlength="1" @input="Changeinput(2)"
                    oninput="this.value = this.value.slice(0, 1)" name="input1" id="input1" v-model="Ncliente[1]" />
                <input type="number" min="0" max="9" maxlength="1" @input="Changeinput(2)"
                    oninput="this.value = this.value.slice(0, 1)" name="input2" ref="input2" id="input2"
                    v-model="Ncliente[2]" />
            </div>
            <h3 v-if="err[0] == true" style="padding-top: 2vh; color: red;">{{ err[1] }}</h3>
            <button class="btn" @click="DataParent(0)"><i class="fa-solid fa-bell"
                    style="padding-right: 2vh;"></i>Conferma<i class="fa-solid fa-bell"
                    style="padding-left: 2vh;"></i></button>
            <button class="btn" @click="Chiudi()" style="background-color: #f38609;">Annulla</button>
        </div>
        <div v-else-if="Show == 1" class="quick-view-inner">
            <h2 style="color: #f38609">Richiesta Consenso</h2><br>
            <h3>Perchè ti venga inviato il messaggio devi consentire al browser di inviarti notifiche
                <slot></slot>
            </h3>
            <button class="btn" @click="DataParent(1)">Consenti</button>
            <button class="btn" @click="Chiudi()" style="background-color: #f38609;">Non consentire e chiudi</button>
        </div>
        <div v-else-if="Show == 2" class="quick-view-inner">
            <h2>Grazie</h2><br>
            <h3>5 minuti prima che arrivi il tuo numero sarai avvisato con una notifica
                <slot></slot>
            </h3>
            <button class="btn" @click="DataParent(2)">Ho capito</button>
        </div>
        <div v-else-if="Show == 3" class="quick-view-inner">
            <h2 style="color: #f38609">Errore</h2><br>
            <h3>Ci scusiamo ma la procedura di avviso non può essere effettuata dato che il tuo numero è troppo vicino a
                quello dell'eliminacode
                <slot></slot>
            </h3>
            <button class="btn" @click="Chiudi()">Ho capito</button>
        </div>

        <div v-else-if="Show == 4" class="quick-view-inner">
            <h2 style="color: #f38609">Errore</h2><br>
            <h3>Ci scusiamo ma il sistema di notifica non può essere attivata per un incopatibilità di sistema
                <slot></slot>
            </h3>
            <button class="btn" @click="Chiudi()">Ho capito</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "QuickView",
    data() {
        return {
            Ncliente: [],
            err: false,
            Show: null,
            NotificationToken: null
        };
    },

    created() {
        this.Show = this.Whatshow
    },

    scrollToTop() {
        window.scrollTo(0, 0);
    },
    props: {
        Whatshow: Number
    },

    methods: {

        Changeinput(input) {
            if (input < 3) {
                document.getElementById('input' + input).focus();
            }
        },

        async Checkerr() {
            this.err = []
            if (+this.Ncliente.join('').length == 0) {
                this.err[0] = true
                this.err[1] = 'Inserire un numero di 1, 2 o 3 cifre'
            } else if (+this.Ncliente.join('') <= 0 || +this.Ncliente.join('') >= 1000) {
                this.err[0] = true
                this.err[1] = 'Inserire un numero compreso tra 1 e 999'
            } else {
                this.err[0] = false
            }

        },

        Chiudi() {
            this.$emit('CloseError', false);
        },

        async DataParent(tipo) {
            const dataforParent = {
                tipo: tipo,
                numero: +this.Ncliente.join('')
            };
            switch (tipo) {
                case 0:
                    this.Show = 1
                    console.log('passo')
                    break;

                case 1:
                    Notification.requestPermission().then(function (permission) {
                        if (permission === "granted") {
                            // Il permesso è stato concesso
                            console.log("Permesso per le notifiche è stato concesso");
                        } else {
                            // Il permesso non è stato concesso
                            console.log("Permesso per le notifiche non è stato concesso");
                        }
                    });
                    await this.requestNotificationPermission()
                    this.Show = 2
                    break;

                case 2:
                    await this.Checkerr()
                    if (this.err[0] == false) {
                        this.$emit('childEvent', dataforParent);
                    }
                    break;
            }
        },

        async requestNotificationPermission() {
            if (!("Notification" in window)) {
                alert("Questo browser non supporta le notifiche desktop");
                this.Show = 4
            } else if (Notification.permission === "granted") {
                // Permesso già concesso
                this.sendNotification();
                this.Show = 2
            } else if (Notification.permission !== "denied") {
                // Richiedi il permesso
                Notification.requestPermission().then(permission => {
                    if (permission === "granted") {
                        this.sendNotification();
                        this.Show = 2
                    }
                });
            }
        },

        sendNotification() {
            console.log('passo')
            new Notification("Preparati in cassa", {
                body: "Il tuo numero sta per essere raggiunto da quello dell'eliminacode, preparati in cassa",
                vibrate: [200, 100, 200],
                requireInteraction: true,
                data: {
                    messageId: 12345,
                    currentmum: 250
                    // Altri dati pertinenti
                }
                // Altri opzioni per la notifica
            });
        }
    },
};
</script>

<style scoped>
.quick-view {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.2);

    display: flex;
    align-items: center;
    justify-content: center;
}

.quick-view .quick-view-inner {
    width: 30vw;
    background-color: #fff;
    padding: 30px;
    border-radius: 10px;
}


.quick-view .quick-view-inner h2 {
    text-align: center;
    font-size: 35px;
    color: #27ae60;
}

.quick-view .quick-view-inner h3 {
    text-align: center;
    font-size: 22px;
    color: #000000ae;
    text-transform: none;
}

.quick-view .quick-view-inner .writespace {
    display: flex;
    text-align: center;
    justify-content: space-evenly;
}

.quick-view .quick-view-inner .writespace input {
    border-bottom: 1px solid black;
    width: 25%;
    font-size: 22px;
    text-align: center;
    color: #000000ae;
    text-transform: none;
}

.quick-view .quick-view-inner .btn {
    font-size: 18px;
    margin-top: 5vh;
    width: 100%;
}

@media (max-width: 768px) {

    .quick-view .quick-view-inner {
        width: 50vw;

    }

    .quick-view .quick-view-inner h2 {
        font-size: 28px;
    }

    .quick-view .quick-view-inner h3 {
        text-align: center;
        font-size: 20px;
    }



    .quick-view .quick-view-inner .btn {
        font-size: 16px;
        margin-top: 5px;
        margin-bottom: 7px;
    }
}

@media (max-width: 576px) {
    .quick-view .quick-view-inner {
        width: 90vw;
    }

    .quick-view .quick-view-inner .btn {
        font-size: 16px;
        margin-top: 25px;
        margin-bottom: 5px;
    }

}
</style>