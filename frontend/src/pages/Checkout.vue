<template>
    <div class="checkout-container">
        <div class="checkout-form-container">
            <form id="checkoutForm" @submit="handleSubmit" novalidate autocomplete="off" >
                <div class="checkout-heading">
                    <h3>Manca solo un passaggio</h3>
                </div>

                <!-- openai dynamic versione  --------------------------------------------->
                <template v-for="(field, index) in fields" :key="field.name">
                    <div class="form-group" :style="{ display: getFieldVisibility(index) }">
                        <component
                            :is="field.type === 'textarea' ? 'textarea' : 'input'"  
                            :type="field.inputType || 'text'"
                            :name="field.name"
                            :id="field.name"
                            :placeholder="getPlaceholderText(field.name, index)" 
                            class="form-control"
                            :value="checkoutObj[field.name]"  
                            @input="updateFieldValue($event, field.name)"  
                            v-bind="field.attrs || {}"                        
                        ></component>

                        <p class="error-mess" v-if="errorObj[`${field.name}Err`] && errorObj[`${field.name}Err`].length > 0">
                            {{ errorObj[`${field.name}Err`][0] }}
                        </p>
                    </div>
                </template>                 
                <!-- openai dynamic versione  ------------------------------------------>

                <div class="form-group details-group" id="General">                
                    <div class="checkout-headings">
                        <h3 v-if="Ute"><span>Totale {{ calculateSummaryPrice()[3] }}€</span></h3>
                        <h3 v-if="Ute"><span>Totale per persona {{ calculatePersonaPrice() }}</span></h3>
                    </div>
                    <h4>Pagamento</h4>
                    <div class="form-group">
                        <div class="form-group">
                            <input type="radio" name="payment" value="cash" id="paymentCash" checked="checked" />
                            <span>Pagamento in cassa</span>
                            <p class="error-mess" v-if="errorObj.payErr.length > 0">{{ errorObj.payErr[0] }}</p>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <input type="submit" value="Conferma" class="btn"   :disabled="buttonDisabled" />
                </div>
                <div>
                    <button class="btn" type="button" style="margin-top: 20px; background-color: #ff8902;"
                        @click="typeOrd('C')">Annulla</button>
                </div>
            </form>
        </div>

        <QuickViewCheckout v-if="showQuickView" @childEvent="Quickshow"></QuickViewCheckout>
        <QuickViewErrore v-if="Quickerrore" @childEvent="Quickshow"></QuickViewErrore>
    </div>
</template>

<script>
import axios from "axios";
import QuickViewCheckout from "@/components/QuickViewCheckout.vue";
import QuickViewErrore from "@/components/QuickViewErrore.vue";
import { mapState } from "vuex";

export default {
    name: "Checkout",
    data() {
        return {
            checkoutObj: { Tavolo: "", Coperti: "", Nominativo: "", Telefono: "", Type: "", paymentMethod: "cash", Note: "" },
            errorObj: { TavoloErr: [], CopertiErr: [], NominativoErr: [], NoteErr: [], payErr: [] },
             tempCoperti: "",
            cartItem: [],
            itemQuantity: [],
            maskVisibilita: [],
            maskObbligo: [],
            showQuickView: false,
            Ute: sessionStorage.getItem('MatchUser'),
            type: sessionStorage.getItem('filtro') == 'PRE' ? sessionStorage.getItem('filtro') : sessionStorage.getItem('TipoOrdine'),
            Quickerrore: false,
            buttonDisabled: false
        };
    },
    created() {
        this.buildForm();
        this.getAllCartItem();
    },
    computed: {
        ...mapState(["allFoods"]),
        filterFoods: function () {
            return this.allFoods.filter((f) => this.matchID(f, this.cartItem));
        },
        /*---------------------------------------------- */
        /* Gestione logiche Mashera Visibilità e Obbligo */
        /*---------------------------------------------- */
        formId() {
        return this.type === 'W' ? 'Tavolo' : 'Asporto';
        },
        formTitle() {
        return this.type === 'W' ? 'Completa dettagli ordine' : 'Dettagli dell\'acquirente';
        },
        fields() {
            const commonFields = [
                {
                name: 'Nominativo',
                type: 'input',
                placeholder: this.type === 'PRE' ? 'Inserisci un nominativo' : 'Campo nominativo'
                },
                {
                name: 'Note',
                type: 'textarea',
                attrs: { rows: 2, cols: 50, maxlength: 100 },
                placeholder: this.type === 'PRE' ? 'Inserisci una nota o un desiderata' : 'Inserisci Nota o Variante'
                }
            ];

            const typeSpecificFields = {
                'W': [
                    {
                        name: 'Tavolo',
                        type: 'input',
                        placeholder: 'Inserisci il numero del tavolo'
                    },
                    {
                        name: 'Coperti',
                        type: 'input',
                        inputType: 'number',
                        placeholder: 'Inserisci il numero di coperti',
                        attrs: { min: 1 },
                        onChange: this.calculatePersonaPrice
                    }
                ],
                'Y': [
                    {
                        name: 'Nominativo',
                        type: 'input',
                        placeholder: 'Inserisci un nominativo'
                    }
                ],
                'PRE': [
                    {
                        name: 'Coperti',
                        type: 'input',
                        inputType: 'number',
                        placeholder: 'Inserisci il numero di coperti',
                        attrs: { min: 1 },
                        onChange: this.calculatePersonaPrice
                    },
                    {
                        name: 'Telefono',
                        type: 'input',
                        inputType: 'tel',
                        placeholder: 'Inserisci un numero di telefono, Non obbligatorio'
                    }
                ]
            };

            return [...(typeSpecificFields[this.type] || []), ...commonFields];
        }
        /*end---------------------------------------------- */        
    },
    methods: {
        /*---------------------------------------------- */
        /* Gestione logiche Mashera Visibilità e Obbligo */
        /*---------------------------------------------- */
        getPlaceholderText(fieldName, index) {
            const maskIndex = this.type === 'Y' ? index + 5 : index;  // Adatta l'index come hai fatto per la visibilità
            const isObligatory = this.maskObbligo[maskIndex] == 1;
            const basePlaceholder = this.fields.find(f => f.name === fieldName).placeholder || '';
            return isObligatory ? `${basePlaceholder} (Obbligatorio)` : `${basePlaceholder} (Facoltativo)`;
        },        
        updateFieldValue(event, fieldName) {
            this.checkoutObj[fieldName] = event.target.value;  // Aggiorniamo direttamente il valore nel checkoutObj
            this.validateField(fieldName);  // Validiamo il campo dopo l'input
        },
        updateCheckoutObj() {

            console.log(this.checkoutObj.Coperti);
        } ,
        getFieldVisibility(index) {
            const maskIndex = this.type === 'Y' ? index + 6 : index;
            return this.maskVisibilita[maskIndex] == 1 ? 'block' : 'none';
        },
        checkForm() {
            this.resetCheckErr();
            const startIndex = this.type === 'Y' ? 6 : 0;
            
            this.fields.forEach((field, index) => {
                const maskIndex = startIndex + index;
                if (this.maskVisibilita[maskIndex] == 1 && this.maskObbligo[maskIndex] == 1 && !this.checkoutObj[field.name]) {
                this.errorObj[`${field.name}Err`].push(`Il campo ${field.name.toLowerCase()} è obbligatorio`);
                }
            });

            if (this.type === 'PRE') {
                if (!this.checkoutObj.Nominativo) {
                this.errorObj.NominativoErr.push("Il campo nominativo è obbligatorio");
                }
                if (!this.checkoutObj.Coperti) {
                this.errorObj.CopertiErr.push("Il campo coperti è obbligatorio");
                }
            }
        },
        resetCheckErr() {
            Object.keys(this.errorObj).forEach(key => {
                this.errorObj[key] = [];
            });
        },

        validateField(fieldName) {
            //console.log(`Current value for ${fieldName}:`, this.checkoutObj[fieldName]);
            const startIndex = this.type === 'Y' ? 5 : 0;
            const fieldIndex = this.fields.findIndex(f => f.name === fieldName);
            const maskIndex = startIndex + fieldIndex;

            this.errorObj[`${fieldName}Err`] = [];

            //console.log(`Validating ${fieldName}:`, this.checkoutObj[fieldName]);


            if (this.maskVisibilita[maskIndex] == 1 && this.maskObbligo[maskIndex] == 1 && !this.checkoutObj[fieldName]) {
            this.errorObj[`${fieldName}Err`].push(`Il campo ${fieldName.toLowerCase()} è obbligatorio`);
            }
        },        
        /*-------------------------------------------END */

        buildForm () {
            let bitData = sessionStorage.getItem('SagraBottoni').split("µ")
           this.maskVisibilita = bitData[9].split('')
           this.maskObbligo = bitData[10].split('')
        },

        handleConfermaClick() {
            // Disabilita il pulsante
            this.buttonDisabled = true;

            setTimeout(() => {
                this.buttonDisabled = false;
            }, 500); // 1000 millisecondi = 1 secondo
        },
        
        availableTime: function () {
            var now = new Date();
            var currentMonth = ("0" + (now.getMonth() + 1)).slice(-2);
            var minRange = now.getFullYear() + "-" + currentMonth;
            var maxRange = (now.getFullYear() + 10) + "-" + currentMonth;
            document.getElementById("coCardEx").setAttribute("min", minRange);
            document.getElementById("coCardEx").setAttribute("max", maxRange);
        },

        matchID: function (food, cartArray) {
            let temp = "";
            cartArray.forEach(element => {
                if (food.food_id == element) {
                    temp = food;
                }
            });
            return temp;
        },

        calculatePersonaPrice: function () {
            let subtotal = 0;
            for (let i = 0; i < this.itemQuantity.length; i++) {
                subtotal = subtotal + parseFloat(this.filterFoods[i].food_price) * this.itemQuantity[i]
            }
            let total = subtotal / this.checkoutObj.Coperti
            total = total.toFixed(2)
            return total == 'Infinity' ? 'calcolo...' : total + '€';
        },

        calculateSummaryPrice: function () {
            let subtotal = 0;
            let discount = 0;
            let delivery = 0;
            for (let i = 0; i < this.itemQuantity.length; i++) {
                subtotal = subtotal + parseFloat(this.filterFoods[i].food_price) * this.itemQuantity[i]
            }
            let total = subtotal
            return [subtotal, discount, delivery, total];
        },
        async getAllCartItem() {
            if (sessionStorage.getItem('MatchUser')) {
                try {var existItem = await axios.get("/cartItem/" + sessionStorage.getItem('Username'));
                    if (existItem.errMsg) {this.Quickerrore = true; return; }} catch (error) {this.Quickerrore = true; return;
                }
                existItem.data.forEach(element => {
                    this.cartItem.push(element.food_id);
                    this.itemQuantity.push(element.item_qty);
                });
            }
        },

        Quickshow(dataFromChild) {
            this.showQuickView = dataFromChild
            this.Quickerrore = false
        },
        typeOrd: function (click) {
            if (click === "C") {
                this.showQuickView = true
            }
        },

        checkEmptyErr: function () {
            for (var typeErr in this.errorObj) {
                if (this.errorObj[typeErr].length != 0) {
                    return false;
                }
            }
            return true;
        },

        inputUpcase: function (e) {
            e.target.value = e.target.value.toUpperCase();
        },

        async sendBillDetails(billId, foodId, qty) {
            let callURL = null
            let Details = null
            if (sessionStorage.getItem('filtro') === 'PRE') {
                Details = {
                    book_id: parseInt(billId),
                    food_id: foodId,
                    item_qty: parseInt(qty)
                };
                callURL = "/prenotazione/dettaglio"
            } else {
                Details = {
                    bill_id: parseInt(billId),
                    food_id: foodId,
                    item_qty: parseInt(qty)
                };
                callURL = "/billdetails";
            }
            try {
                const response = await axios.post(callURL, Details);
                if (response.errMsg ) {
                    throw new Error("Whoops!");
                }
            } catch (error) {
                throw new Error("Whoops!");
            }
        },

        currentTime: function () {
            var now = new Date();
            var day = ("0" + now.getDate()).slice(-2);
            var month = ("0" + (now.getMonth() + 1)).slice(-2);
            var hour = ("0" + (now.getHours())).slice(-2);
            var min = ("0" + (now.getMinutes())).slice(-2);
            return now.getFullYear() + "-" + month + "-" + day + "T" + hour + ":" + min;

        },

        async handleSubmit(e) {
            e.preventDefault(); //importante
            this.checkForm();
            if (!this.checkEmptyErr()) {
                return;
            }
            this.handleConfermaClick()
            //PRENOTAZIONE ----------------------------------------------------
            if (this.type === 'PRE') {  
                if (sessionStorage.getItem('Bill') != "" || sessionStorage.getItem('Bill') != null || sessionStorage.getItem('Bill') != undefined) {
                    axios.delete("/prenotazioni/status/delete/" + sessionStorage.getItem('Bill'))
                    axios.delete("/prenotazioni/details/delete/" + sessionStorage.getItem('Bill'))
                }

                let bookId = (await axios.get("/prenotazione/new")).data;
                if (bookId == "") {
                    if (sessionStorage.getItem('Bill') == null || sessionStorage.getItem('Bill') == "" || sessionStorage.getItem('Bill') == undefined) {
                        bookId = sessionStorage.getItem('startprt');
                    } else {
                        bookId = sessionStorage.getItem('Bill')
                    }
                } else {
                    if (bookId.book_id < sessionStorage.getItem('startprt')) {
                        bookId =  sessionStorage.getItem('startprt')
                    } else {
                        bookId = parseInt(bookId.book_id) + 1;
                    }
                }

                let dataprenotazione = {
                    book_id: parseInt(bookId),
                    user_id: sessionStorage.getItem('Username'),
                    book_tavolo: this.checkoutObj.Tavolo,
                    book_coperti: this.checkoutObj.Coperti,
                    book_when: this.currentTime(),
                    book_method: this.checkoutObj.paymentMethod,
                    book_discount: parseFloat(this.calculateSummaryPrice()[1]),
                    book_delivery: parseFloat(this.calculateSummaryPrice()[2]),
                    book_total: parseFloat(this.calculateSummaryPrice()[3]),
                    book_paid: "false",
                    book_status: 0,
                    book_tipocassa: sessionStorage.getItem('filtro'),
                    book_nominativo: this.checkoutObj.Nominativo,
                    book_phone: this.checkoutObj.Telefono,
                    book_note: this.checkoutObj.Note

                };

                try {
                    const response = await axios.post("/prenotazione", dataprenotazione);
                    if (response.errMsg) {this.Quickerrore = true; return; }} catch (error) {this.Quickerrore = true; return;
                }
                sessionStorage.setItem('Bill', dataprenotazione.book_id)
                sessionStorage.setItem('Coperti', dataprenotazione.book_coperti)

            //ORDINI ----------------------------------------------------         
            } else {
                if (sessionStorage.getItem('Bill') != "" || sessionStorage.getItem('Bill') != null || sessionStorage.getItem('Bill') != undefined) {
                    axios.delete("/billstatus/delete/" + sessionStorage.getItem('Bill'))
                    axios.delete("/billdetails/delete/" + sessionStorage.getItem('Bill'))
                }
                let billId = (await axios.get("/billstatus/new")).data;

                if (billId == "") billId = 1;
                else {
                    billId = parseInt(billId.bill_id) + 1;
                }
                let billStatus = {
                    bill_id: parseInt(billId),
                    user_id: sessionStorage.getItem('Username'),
                    bill_tavolo: this.checkoutObj.Tavolo,
                    bill_coperti: this.checkoutObj.Coperti,
                    bill_when: this.currentTime(),
                    bill_method: this.checkoutObj.paymentMethod,
                    bill_discount: parseFloat(this.calculateSummaryPrice()[1]),
                    bill_delivery: parseFloat(this.calculateSummaryPrice()[2]),
                    bill_total: parseFloat(this.calculateSummaryPrice()[3]),
                    bill_paid: "false",
                    bill_status: 1,
                    TipoCassa: sessionStorage.getItem('TipoOrdine'),
                    Nominativo: this.checkoutObj.Nominativo,
                    bill_note: this.checkoutObj.Note
                };

                try {
                    const response = await axios.post("/billstatus", billStatus);
                    if (response.errMsg) {this.Quickerrore = true; return; }} catch (error) {this.Quickerrore = true; return;
                }
                sessionStorage.setItem('Bill', billStatus.bill_id)
                sessionStorage.setItem('Coperti', billStatus.bill_coperti)
            }

            //COMMON -> dettaglio per tutti ----------------------------------------- 
            let detailPromises = []; // Array per memorizzare le promesse delle richieste di inserimento dei dettagli dell'ordine
            this.cartItem.forEach((foodId, index) => {
                detailPromises.push(this.sendBillDetails(sessionStorage.getItem('Bill'), foodId, this.itemQuantity[index]));
            });
            try {
                await Promise.all(detailPromises);// Attendere il completamento di tutte le richieste di inserimento dei dettagli dell'ordine
            } catch (error) {
                this.Quickerrore = true;
                return;
            }

            axios.delete("/cartItem/" + sessionStorage.getItem('Username'));
            this.cartItem = [];
            this.itemQuantity = [];
            this.$router.push("/thank");
        }
    },    
    components: {
        QuickViewCheckout,
        QuickViewErrore
    }
};
</script>

<style scoped>
.checkout-container {
    padding: 2rem 9%;
}

.checkout-container .checkout-form-container {
    background: #fff;
    height: 90vh;
}

.checkout-container .checkout-form-container form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -40%);
    max-width: 70rem;
    width: 100%;
    box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.05);
    border: 0.1rem solid rgba(0, 0, 0, 0.2);
    padding: 2rem;
    border-radius: 0.5rem;
    animation: fadeUp 0.4s linear;
}

.checkout-container .checkout-form-container form h3 {
    padding-bottom: 1rem;
    font-size: 2rem;
    text-transform: uppercase;
    color: #130f40;
    margin: 0;
}

.checkout-container .checkout-form-container form .form-control {
    margin: 0.7rem 0;
    border-radius: 0.5rem;
    background: #f7f7f7;
    padding: 2.2rem 1.2rem;
    font-size: 2rem;
    color: #130f40;
    text-transform: none;
    width: 100%;
    border-color: black;
}

.checkout-container .checkout-form-container form label {
    font-size: 2rem;
    margin: 0;
    padding: 0;
}

.checkout-container .checkout-form-container form span {
    font-size: 18px;
    padding-left: 5px;
    padding-right: 40px;
}

.checkout-container .checkout-form-container form .btn {
    margin: 1rem 0;
    width: 100%;
    text-align: center;
}

.checkout-container .checkout-form-container form p {
    padding-top: 1rem;
    font-size: 1.5rem;
    color: #666;
    margin: 0;
}

.checkout-container .checkout-form-container form p a:hover {
    color: #130f40;
    text-decoration: underline;
}

.checkout-container .checkout-form-container form .form-group {
    margin: 0;
}

.checkout-container .checkout-form-container form .form-group.details-group {
    display: block;
    margin-top: 20px;
    margin-bottom: 10px;
}

.checkout-container .checkout-form-container form .form-group .error-mess {
    font-size: 1.8rem;
    font-weight: bold;
    position: relative;
    color: rgb(243, 47, 47);
    margin: 0;
    padding: 0;
}

.checkout-container .checkout-form-container form .checkout-headings h3 span {
    color: #f38609;
}

.checkout-container .checkout-form-container form .checkout-headings p {
    color: #f38609;
    font-size: 2rem;
    padding: 0;
    padding-bottom: 20px;
    padding-left: 6px;
}


.checkout-container .checkout-form-container form .checkout-heading h3:first-of-type span {
    padding-right: 0px;
    color: #130f40;
}
</style>
