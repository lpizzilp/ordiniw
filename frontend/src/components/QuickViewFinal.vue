<template>
    <div class="quick-view">
        <div v-if="from === 'H'" class="quick-view-inner">
            <h2>Sei sicuro?</h2><br>
            <h3>Il codice è essenziale per effettuare il pagamento. Ti consigliamo di farti
                inviare un email o in alternativa di fare uno screenshot.
                <slot></slot>
            </h3>
            <button class="btn" @click="DataParent('I')" style="margin-right: 5%;">Indietro</button>
            <button class="btn" @click="DataParent('E')" style="margin-left: 5%;">Invia email</button>
            <button class="btn" @click="DataParent('H')" style="width: 100%;">Torna alla Home</button>
        </div>
        <div v-else-if="from === 'E'" class="quick-view-inner">
            <div v-if="error === 'Si'">
                <h2>Riprova</h2><br>
                <h3>Controlla che l'email sia corretta
                    <slot></slot>
                </h3>
            </div>
            <div v-else>
                <h2>Invio Email</h2>
                <h3>Inserisci la tua Email
                    <slot></slot>
                </h3>
            </div>
            <form @submit.prevent="submitForm">
                <input class="email" type="email" id="email" name="email" v-model="Dataform.email"
                    placeholder="Inserisci la tua email" required>
                <button class="btn" type="submit" style="width: 100%;">Invia</button>
                <button class="btn" type="reset" @click="DataParent('I')"
                    style="width: 100%; margin-top: 20px; background-color: #f38304;">Annulla</button>
            </form>
        </div>
        <div v-else-if="from === 'I'" class="quick-view-inner">
            <h2 style="color: #27ae60;">Successo</h2><br>
            <h3>L' email inviata con successo.<br>Controlla la casella di posta.<br>Puoi abbandonare la pagina
                <slot></slot>
            </h3>
            <button @click="DataParent('E', 'Si')"
                style="width: 100%; margin-top: 20px; background-color: white; text-align: center; color: #f38304; text-decoration: underline;">
                <h4>L'email non è arrivata?</h4>
            </button>
        </div>
        <div v-else-if="from === 'D'" class="quick-view-inner">
            <h2 style="color: #c71b1b;">Errore</h2><br>
            <h3>Email non inviata<br>Ti consigliamo di fare uno screenshot in attesa che l'assistenza tecnica intervenga.
                <slot></slot>
            </h3>
            <button class="btn" @click="DataParent('I')" style="margin-right: 5%;">Indietro</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "QuickView",
    data() {
        return {
            from: 'H',
            Dataform: { email: "", id: "", data: "" },
            error: 'N',
            Item: [],
            itemQuantity: [],
            timer: 7
        }
    },

    props: {
        parentData: String,
        parentId: Number,
    },

    created() {
        this.from = this.parentData
        this.Dataform.id = this.parentId
        var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var hour = ("0" + (now.getHours())).slice(-2);
        var min = ("0" + (now.getMinutes())).slice(-2);
        this.Dataform.data = hour + ":" + min + ' del giorno ' + day + '/' + month + '/' + now.getFullYear();

    },

    scrollToTop() {
        window.scrollTo(0, 0);
    },
    methods: {
        //Codici
        //this.from                 DataParent                          this.Error
        //H = Banner Home           //H = Rotta Home                    //Si = errore
        //E = Banner Email          //E = Valorizza From con E
        //I = Banner Successo       //I = Indietro
        //D = Banner Errore


        async DataParent(where, err) {
            if (where === 'E') {
                this.from = 'E'
                this.error = err
            } else if (where === 'I') {
                this.$emit('childEvent', false);
            } else if (where === 'H') {
                sessionStorage.removeItem('MatchUser')
                sessionStorage.removeItem('Username')
                sessionStorage.removeItem('Type')
                this.$router.push("/");
            }
        },

        async submitForm() {  
            let billitem = await axios.get('/billdetails/' + this.Dataform.id)
            billitem.data.forEach(element => {
                this.Item.push('<tr style="background-color: #ffffff;"><td style="background-color: #ffffff; padding-left:10px; padding-top:10px; padding-bottom:10px; font-size:18px;">' + element.food_name + '</td><td style="background-color: #ffffff; padding-left:10px; padding-top:10px; padding-bottom:10px; font-size:18px; text-align: center;">' +  element.item_qty);
            });

            let data = {
                user_email: this.Dataform.email,
                user_data: "http://" + window.location.hostname.toString() + ":8082/myorder?match=" + sessionStorage.getItem('MatchUser') + "&user=" + sessionStorage.getItem('Username') + "&id=" + this.Dataform.id + "&type=" + sessionStorage.getItem('Type'),
                ord_id: this.Dataform.id,
                ord_data: this.Dataform.data,
                ord_item: this.Item,
            }
            await axios.post('/mail/', data)
                .then(response => {
                    console.log(response.data);
                    if (response.data === '') {
                        this.from = 'I'
                        this.startTimer()
                    } else {
                        this.from = 'D'
                    }
                })
                .catch(error => {
                    console.error('Errore durante l\'invio dell\'email:', error);
                    this.from = 'D'
                });
        },

        startTimer() {
            sessionStorage.removeItem('MatchUser')
            sessionStorage.removeItem('Username')
            // Decrementa il timer ogni secondo
            this.timerInterval = setInterval(() => {
                if (this.timer > 0) {
                    this.timer--;
                } else {
                    // Quando il timer raggiunge zero, ferma l'intervallo e reindirizza alla pagina home
                    clearInterval(this.timerInterval);
                    this.$router.push("/");
                }
            }, 1000);
        },
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
    color: #f38304;
}

.quick-view .quick-view-inner h3 {
    text-align: center;
    text-transform: none;
    font-size: 22px;
    color: #000000ae;
}

.quick-view .quick-view-inner .btn {
    font-size: 18px;
    margin-top: 5vh;
    margin-bottom: 10px;
    width: 45%;
}

.email {
    width: 90%;
    text-transform: none;
    text-align: center;
    font-size: medium;
    padding-top: 3vh;
    padding-bottom: 3vh;
    height: 20px;
    margin: 2vh;
    border-color: black;
    border-style: solid;
    border-width: 2px;
    border-radius: 10px;
}

@media (max-width: 768px) {

    .quick-view .quick-view-inner {
        width: 60vw;

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
        margin-bottom: 0px;
    }

}
</style>