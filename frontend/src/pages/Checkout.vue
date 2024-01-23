<template>
    <div class="checkout-container">
        <div class="checkout-form-container">
            <form id="checkoutForm" @submit="handleSubmit" novalidate autocomplete="off">
                <div class="checkout-heading">
                    <h3>Manca solo un passaggio</h3>
                </div>

                <div v-if="type === 'W'">
                    <div class="form-group details-group" id="Tavolo">
                        <h4>Completa dettagli ordine</h4>
                        <div class="form-group">
                            <input type="text" name="Tavolo" id="Tavolo" placeholder="Inserisci il numero del tavolo"
                                class="form-control" v-model="checkoutObj.Tavolo" />
                            <p class="error-mess" v-if="errorObj.TavoloErr.length > 0">{{ errorObj.TavoloErr[0] }}</p>
                        </div>

                        <div class="form-group">
                            <input type="number" name="Coperti" id="Coperti" placeholder="Inserisci il numero di coperti"
                                class="form-control" v-model="checkoutObj.Coperti" />
                            <p class="error-mess" v-if="errorObj.CopertiErr.length > 0">{{ errorObj.CopertiErr[0] }}</p>
                        </div>

                        <div class="form-group">
                            <input type="text" name="Nominativo" id="Nominativo"
                                placeholder="Campo nominativo, non obbligatorio" class="form-control"
                                v-model="checkoutObj.Nominativo" />
                            <p class="error-mess" v-if="errorObj.NominativoErr.length > 0">{{ errorObj.NominativoErr[0] }}
                            </p>
                        </div>

                    </div>
                </div>
                <div v-else-if=" type === 'Y'">
                    <div class="form-group details-group" id="Asporto">
                        <h4>Dettagli dell'acquirente</h4>
                        <div class="form-group">
                            <input type="text" name="Nominativo" id="Nominativo" placeholder="Inserisci un nominativo"
                                class="form-control" v-model="checkoutObj.Nominativo" />
                            <p class="error-mess" v-if="errorObj.NominativoErr.length > 0">{{ errorObj.NominativoErr[0] }}
                            </p>
                        </div>
                    </div>
                </div>
                <div v-else-if=" type === 'PRE'">
                    <div class="form-group details-group" id="Asporto">
                        <h4>Dettagli dell'acquirente</h4>
                        <div class="form-group">
                            <input type="text" name="Nominativo" id="Nominativo" placeholder="Inserisci un nominativo"
                                class="form-control" v-model="checkoutObj.Nominativo" />
                            <p class="error-mess" v-if="errorObj.NominativoErr.length > 0">{{ errorObj.NominativoErr[0] }}
                            </p>
                        </div>
                        <div class="form-group">
                            <input type="tel" name="Telefono" id="Telefono" placeholder="Inserisci un numero di telefono, non obbligatorio"
                                class="form-control" v-model="checkoutObj.Telefono" />
                        </div>
                    </div>
                </div>

                <div class="form-group details-group" id="General">
                    <div class="checkout-headings">
                        <h3 v-if="Ute"><span>Totale {{ calculateSummaryPrice()[3] }}€</span></h3>
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
                    <input type="submit" value="Conferma" class="btn" />
                </div>
                <div>
                    <button class="btn" type="button" style="margin-top: 20px; background-color: #ff8902;"
                        @click="typeOrd('C')">Annulla</button>
                </div>
            </form>
        </div>

        <QuickViewCheckout v-if="showQuickView" @childEvent="Quickshow"></QuickViewCheckout>
    </div>
</template>

<script>
import axios from "axios";
import QuickViewCheckout from "@/components/QuickViewCheckout.vue";
import { mapState } from "vuex";
export default {
    name: "Checkout",
    data() {
        return {
            checkoutObj: { Tavolo: "", Coperti: "", Nominativo: "", Telefono: "", Type: "", paymentMethod: "cash" },
            errorObj: { TavoloErr: [], CopertiErr: [], NominativoErr: [], payErr: [] },
            cartItem: [],
            itemQuantity: [],
            showQuickView: false,
            Ute: sessionStorage.getItem('MatchUser'),
            type: sessionStorage.getItem('filtro') == 'PRE' ? sessionStorage.getItem('filtro') : sessionStorage.getItem('TipoOrdine')
        };
    },
    created() {
        this.getAllCartItem();
    },
    computed: {
        ...mapState(["allFoods"]),
        filterFoods: function () {
            return this.allFoods.filter((f) => this.matchID(f, this.cartItem));
        },
    },
    methods: {
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
                let existItem = await axios.get("/cartItem/" + sessionStorage.getItem('Username'));
                existItem.data.forEach(element => {
                    this.cartItem.push(element.food_id);
                    this.itemQuantity.push(element.item_qty);
                });
            }
        },

        Quickshow(dataFromChild) {
            this.showQuickView = dataFromChild
        },

        resetCheckErr: function () {
            this.errorObj.TavoloErr = [];
            this.errorObj.CopertiErr = [];
            this.errorObj.NominativoErr = [];
            this.errorObj.payErr = [];
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

        checkForm: function () {
            this.resetCheckErr();
            if (this.type === 'W') {
                // Tavolo validate
                if (!this.checkoutObj.Tavolo) {
                    this.errorObj.TavoloErr.push("Il campo tavoli è obbligatorio");
                }

                // Coperti validate
                if (!this.checkoutObj.Coperti) {
                    this.errorObj.CopertiErr.push("Il campo coperti è oblligatorio");
                }

            } else if (this.type === 'Y' || this.type === 'PRE' ) {
                // Nominativo validate
                if (!this.checkoutObj.Nominativo) {
                    this.errorObj.NominativoErr.push("Il campo nominativo è oblligatorio");
                }
            }
        },

        async sendBillDetails(billId, foodId, qty) {
            console.log(billId)
            if (sessionStorage.getItem('filtro') === 'PRE') {
                let bookDetails = {
                    book_id: parseInt(billId),
                    food_id: foodId,
                    item_qty: parseInt(qty)
                };
                await axios.post("/prenotazione/dettaglio", bookDetails);
                console.log('fe')
            } else {

                let billDetails = {
                    bill_id: parseInt(billId),
                    food_id: foodId,
                    item_qty: parseInt(qty)
                };
                await axios.post("/billdetails", billDetails);
            }
        },
        currentTime: function () {
            var now = new Date();
            var day = ("0" + now.getDate()).slice(-2);
            var month = ("0" + (now.getMonth() + 1)).slice(-2);
            var hour = ("0" + (now.getHours())).slice(-2);
            var min = ("0" + (now.getMinutes())).slice(-2);
            return  now.getFullYear() + "-" + month + "-" + day + "T" + hour + ":" + min;

        },

        async handleSubmit(e) {
            this.checkForm();
            if (!this.checkEmptyErr()) {
                e.preventDefault();
            }
            else {
                e.preventDefault(); //importante
                
                if (this.type === 'PRE') {
                    let bookId = (await axios.get("/prenotazione/new")).data;
                    if (bookId == "") {
                        bookId = 500;
                    }
                    else {
                        bookId = parseInt(bookId.book_id) + 1;
                    }

                    console.log(bookId)
                    let dataprenotazione = {
                        book_id: parseInt(bookId),
                        user_id: parseInt(sessionStorage.getItem('Username')),
                        book_tavolo: this.checkoutObj.Tavolo,
                        book_coperti: this.checkoutObj.Coperti,
                        book_when: this.currentTime(),
                        book_method: this.checkoutObj.paymentMethod,
                        book_discount: parseInt(this.calculateSummaryPrice()[1]),
                        book_delivery: parseInt(this.calculateSummaryPrice()[2]),
                        book_total: parseFloat(this.calculateSummaryPrice()[3]),
                        book_paid: "false",
                        book_status: 1,
                        book_tipocassa: sessionStorage.getItem('filtro'),
                        book_nominativo: this.checkoutObj.Nominativo,
                        book_phone: this.checkoutObj.Telefono,

                    };

                    await axios.post("/prenotazione", dataprenotazione);
                    sessionStorage.setItem('Bill', dataprenotazione.book_id)

                    this.cartItem.forEach((foodId, index) => {
                        this.sendBillDetails(bookId, foodId, this.itemQuantity[index]);
                    });

                } else {
                    if (sessionStorage.getItem('Bill') != "" || null || undefined) {
                        axios.delete("/billstatus/delete/" + sessionStorage.getItem('Bill'))
                        axios.delete("/billdetails/delete/" + sessionStorage.getItem('Bill'))
                    }

                    e.preventDefault();
                    let billId = (await axios.get("/billstatus/new")).data;
                    if (billId == "") {
                        billId = 1;
                    }
                    else {
                        billId = parseInt(billId.bill_id) + 1;
                    }

                    let billStatus = {
                        bill_id: parseInt(billId),
                        user_id: parseInt(sessionStorage.getItem('Username')),
                        bill_tavolo: this.checkoutObj.Tavolo,
                        bill_coperti: this.checkoutObj.Coperti,
                        bill_when: this.currentTime(),
                        bill_method: this.checkoutObj.paymentMethod,
                        bill_discount: parseInt(this.calculateSummaryPrice()[1]),
                        bill_delivery: parseInt(this.calculateSummaryPrice()[2]),
                        bill_total: parseFloat(this.calculateSummaryPrice()[3]),
                        bill_paid: "false",
                        bill_status: 1,
                        TipoCassa: sessionStorage.getItem('TipoOrdine'),
                        Nominativo: this.checkoutObj.Nominativo
                    };

                    await axios.post("/billstatus", billStatus);
                    sessionStorage.setItem('Bill', billStatus.bill_id)

                    this.cartItem.forEach((foodId, index) => {
                        this.sendBillDetails(billId, foodId, this.itemQuantity[index]);
                    });
                }

                axios.delete("/cartItem/" + sessionStorage.getItem('Username'));
                this.cartItem = [];
                this.itemQuantity = [];
                this.$router.push("/thank");
            }

        },
    },

    components: {
        QuickViewCheckout
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

.checkout-container .checkout-form-container form p a {
    color: #27ae60;
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


.checkout-container .checkout-form-container form .checkout-heading h3:first-of-type span {
    padding-right: 0px;
    color: #130f40;
}
</style>
