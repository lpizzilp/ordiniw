<template>
    <vue-basic-alert :duration="300" :closeIn="1500" ref="alert" />
    <div class="menu-section">
        <div class="heading">
            <span>menu</span>
            <h3 v-if="Prenotazione == '0'">Vi presentiamo i nostri piatti</h3>
            <h3 v-else>Prenotazione Eventi / Specialità</h3>
        </div>

        <div class="row">
            <div class="col-sm-4 col-12 filter-box">
                <div class="row search-box">
                    <input type="text" class="search-input" v-model="foodObj.name" placeholder="Cerca.." />
                </div>

                <div v-if="Prenotazione == '0'">
                    <!-- <div class="row filter-drop-down">
                        <p @click="displayFilterDrop">Filtri<span v-if="showDropDown">V</span><span v-else>X</span></p>
                    </div> -->
                    <!--  <div class="row filter-heading">
                        <h1>Tipo</h1>
                    </div> -->

                    <div class="row filter-section">
                        <ul class="filter-option">
                            <li id="filter0">
                                <input type="button" name="cbStatus" id="bsStatus" value="all" hidden
                                    @click="filterFoodBtn($event.target.value, 0)" />
                                <label for="bsStatus" class="d-flex justify-content-between">Mostra tutto</label>
                            </li>

                            <li :id="'filter' + (ind + 1)" v-for="(c, ind) in loadCategories" :key="ind">
                                <input type="button" :id="'bsStatus' + (ind + 1)" hidden
                                    @click="filterFoodBtn(c.idCategoria, (ind + 1))" />
                                <label :for="'bsStatus' + (ind + 1)" class="d-flex justify-content-between">{{
                                    c.descCategoria
                                    }}</label>
                            </li>

                            <hr />

                            <li id="Compress" style="display: flex; width: 75%; ">
                                <label for="ndStatus" class="d-flex justify-content-between">Comprimi spazio</label>
                                <VueToggles :value="Compress" @click="changeCompress()" :height="28" :width="58"
                                    checkedText="On" uncheckedText="Off" checkedBg="#2196F3" uncheckedBg="lightgrey"
                                    style="margin-left: -58px;" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="col-sm-8">
                <div class="row box-container">
                    <div v-for="(f, index) in currentPageItems" :key="index">
                        <div class="box">
                            <!--<a href="" class="fas fa-heart"></a>-->
                            <div v-if="Artimage(f.food_src) != '' && Compress == false" class="image">
                                <img v-if="f.QtaDisponibile != 0 && f.FlgPrenotabile == 0" :src="Artimage(f.food_src)"
                                    :alt="require('../assets/images/no.png')"
                                    @click="qty[index]++, onQtyChange(index)" />
                                <img v-else :src="Artimage(f.food_src)" :alt="require('../assets/images/no.png')" />
                            </div>
                            <div class="content">
                                <h3>{{ f.FlgVariante != 0 ? '++ ' + f.food_name + ' ++' : f.food_name }}</h3>
                                <div class="desc" v-if="Compress == false">
                                    <p>{{ f.food_desc }}</p>
                                </div>
                                <div class="price" v-if="Compress == false">
                                    {{ parseFloat(f.food_price) - parseFloat(f.food_discount) }} €
                                    <span v-if="parseFloat(f.food_discount) != 0.00">{{ parseFloat(f.food_price) }}
                                        €</span>
                                </div>

                                <div v-if="f.FlgPrenotabile == 0 && f.QtaDisponibile == 0" class="add-to-cart">
                                    <h4
                                        style="flex: 50%; background-color: #f38609; text-align: center; color: white; border-radius: 10px; padding: 0.9rem;">
                                        Esaurito
                                    </h4>
                                </div>
                                <div v-else-if="f.FlgPrenotabile != 0 && QtyDisponibile[index] == true"
                                    class="add-to-cart">
                                    <h4
                                        style="flex: 50%; background-color: #f38609; text-align: center; color: white; border-radius: 10px; padding: 0.9rem;">
                                        Prenotazione Chiusa
                                    </h4>
                                </div>
                                <div v-else class="add-to-cart">
                                    <button class="btn"
                                        style="border-right-color: black; border-bottom-right-radius: 0%;  border-top-right-radius: 0%;"
                                        value="minus" @click="qty[index]--, onQtyChange(index)"><i
                                            class="fa-solid fa-minus"></i></button>
                                    <h4 v-if="qty[index] == 0">{{ qty[index] }}</h4>
                                    <h4 v-else style="background-color: #f38609f4; color: white;">{{ qty[index] }}
                                    </h4>
                                    <button class="btn"
                                        style="border-left-color: black; border-bottom-left-radius: 0%;  border-top-left-radius: 0%;"
                                        value="plus" @click="qty[index]++, onQtyChange(index)"><i
                                            class="fa-solid fa-plus"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="!filterFoods.length">
                        <div class="box">
                            <div class="content">
                                <h1 v-if="Prenotazione == '1'" style="color: #057835fa;">Nessun articolo!
                                    <br>Prenotazioni
                                    chiuse
                                </h1>
                                <h1 v-else style="color: #057835fa;">Nessun articolo! <br>Scegli un altro Reparto</h1>
                            </div>
                            <div class="image">
                                <img src="../assets/images/notfound.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="calculatePages > 1" class="action-row">

                    <button v-if="pageNum != 0" @click="previous()" class="action-btn"> {{ "<" }} </button>
                            <div v-for="(p, i) in calculatePages" :key="i" class="d-inline">
                                <span v-if="i == pageNum" class="highlight" @click="set(i)">{{ i + 1 }}</span>
                                <span v-else @click="set(i)">{{ i + 1 }}</span>
                            </div>
                            <button v-if="pageNum != calculatePages - 1" @click="next()" class="action-btn"> {{ ">" }}
                            </button>
                </div>
            </div>
        </div>
        <div class="to-cart">
            <router-link v-if="showCart == true" @click="scrollToTop()" to="cart" class="btn" style="width: 100%;">
                <i class="fas fa-shopping-cart cart"></i> Vai al carrello
            </router-link>
            <button v-else class="btn" style="width: 100%;" :disabled="true">
                <i class="fas fa-shopping-cart cart"></i> Vai Al Carrello</button>
        </div>
        <quick-view-prenotazione v-if="Prenotazione === '1' && showQuickView === true"
            @closedata="CloseQuickvue"></quick-view-prenotazione>
    </div>
    <quick-view-errore v-if="Quickerrore"></quick-view-errore>
</template>

<script>
import { mapState } from "vuex";
import { VueToggles } from "vue-toggles";
import VueBasicAlert from 'vue-basic-alert';
import QuickViewErrore from "@/components/QuickViewErrore.vue";
import QuickViewPrenotazione from "@/components/QuickViewPrenotazione.vue";
import axios from "axios";

export default {
    props: ["food"],
    name: "Menu",
    inject: ["eventBus"],

    data() {
        let categorytype = ""
        let flgartprenotabile = "0"
        let flgvariante = "0"
        let Ordertype = sessionStorage.getItem('TipoOrdine')
        switch (sessionStorage.getItem('filtro')) {
            case 'PRE':
                flgartprenotabile = "1"
                flgvariante = "1"
                break;
            default:
                sessionStorage.getItem('filtro') ? categorytype = sessionStorage.getItem('filtro') : categorytype = ""
                break;
        }
        return {
            foodObj: { name: "", category: categorytype, status: [], price: "", type: Ordertype, prenotazioni: flgartprenotabile, ora: "", varianti: flgvariante },
            showDropDown: false,
            matchUser: undefined,
            setqty: false,
            Prenotazione: flgartprenotabile,
            Compress: false,
            QtyDisponibile: [],

            sendId: null,
            showCart: false,
            showCounterCart: false,
            showQuickView: false,
            qty: [],
            CartItem: [],
            perPage: 70,
            pageNum: 0,
            throttleTimer: null,
            throttleDelay: 600, // Millisecondi   
            throttleTimers: {}, // Oggetto per memorizzare i timer per ciascun articolo
            wifiquality: null,
            wifispeed: null,
            Quickerrore: false
        };
    },

    created() {
        this.buildArray()
        this.getAllCartItem()
        this.getWIFIConnection()
        if (this.Prenotazione == '1') {
            this.chekdata()
            this.chekQty()
        }
    },

    updated() {
        this.buildArray()
        this.getAllCartItem()
    },
    mounted() {
        this.FilterBtncolor(0)
    },

    computed: {
        ...mapState(["allFoods"]),
        ...mapState(["allCategories"]),

        filterFoods: function () {
            return this.allFoods.filter((f) => f.food_name.toLowerCase().match(this.foodObj.name.toLowerCase()) &&
                (f.food_category.match(this.foodObj.category) || this.foodObj.category == "all" || this.foodObj.category == "") &&
                (this.evaluatePrice(f, this.foodObj.price)) &&
                f.food_type.toLowerCase().match(this.foodObj.type.toLowerCase()) &&
                (this.evaluateStatus(f, this.foodObj.status)) &&
                Math.abs(f.FlgDisabled).toString().match('0') &&
                Math.abs(f.FlgPrenotabile).toString().match(this.foodObj.prenotazioni.toString()) &&
                f.DataFineValidita.toString() >= (this.foodObj.ora.toString()) &&
                (Math.abs(f.FlgVariante).toString() == '0' || (this.foodObj.varianti.toString())));
        },

        currentPageItems: function () {
            return this.filterFoods.slice(this.pageNum * this.perPage, this.pageNum * this.perPage + this.perPage);
        },

        calculatePages: function () {
            if (this.filterFoods.length % this.perPage != 0) {
                return Math.floor((this.filterFoods.length) / this.perPage) + 1;
            }
            else {
                return this.filterFoods.length / this.perPage;
            }
        },
        selectedFood: function () {
            return this.allFoods.filter((f) => f.food_id == this.food);
        },

        loadCategories: function () {
            return this.allCategories
        },
    },

    methods: {

        getWIFIConnection() {
            const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            if (connection) {
                this.wifiquality = connection.effectiveType.indexOf('g')
                this.wifispeed = connection.downlink
            } else {
                //console.log('API navigator.connection non supportata.');
            }
        },

        Artimage(food) {
            if (food === '') {
                return '';
            } else {
                if (this.wifiquality == -1 || this.wifispeed < '0.25' && this.wifispeed != null) {
                    return ''
                } else {
                    try {
                        return require(`../assets/images/${food}`);

                    } catch (ex) {
                        return require(`../assets/images/no.png`);
                    }
                }
            }
        },

        CloseQuickvue(data) {
            this.showQuickView = data
        },

        scrollToTop() {
            window.scrollTo(0, 0);
        },

        errorImage(e) {
            e.target.src = require('../assets/images/no.png');
        },
        set(val) {
            this.pageNum = val;
        },
        next() {
            this.pageNum++;
        },
        previous() {
            this.pageNum--;
        },

        buildArray: function () {
            var qtylenght = Object.keys(this.currentPageItems).length;
            for (var l = 0; l < qtylenght; l++) {
                this.qty.push(0);
            }
        },

        changeCompress() {
            if (this.Compress == false) {
                this.Compress = true
            } else {
                this.Compress = false
            }
        },

        ImagePresent: function () {
            if (this.f.food_src != null) {
                return 1;
            }
        },

        chekdata() {
            var now = new Date();
            var day = ("0" + now.getDate()).slice(-2);
            var month = ("0" + (now.getMonth() + 1)).slice(-2);
            this.foodObj.ora = now.getFullYear() + month + day;
        },

        async chekQty() {
            let totqty = (await axios.get('/prenotazione/sumordine')).data;
            for (let i = 0; i < this.allFoods.length; i++) {
                if (this.allFoods[i].FlgPrenotabile != 0) {
                    for (let l = 0; l < totqty.length; l++) {
                        if (this.allFoods[i].food_id == totqty[l].food_id) {
                            if (this.allFoods[i].DataFinePRT < this.foodObj.ora) {
                                this.QtyDisponibile.push(true)
                                break;
                            } else {
                                if (this.allFoods[i].QtaDisponibile == null || undefined || "") {
                                    this.QtyDisponibile.push(false)
                                } else {
                                    if (this.allFoods[i].QtaDisponibile <= totqty[l].somma_qty) {
                                        this.QtyDisponibile.push(true)
                                    } else {
                                        this.QtyDisponibile.push(false)
                                    }
                                }
                                break;
                            }
                        }
                    }
                }
            }
        },

        async getAllCartItem() {
            if (this.setqty !== true) {
                if (sessionStorage.getItem('MatchUser')) {
                    try {
                        var existItem = await axios.get('/cartItem/' + sessionStorage.getItem('Username'));
                        if (existItem.errMsg) { this.Quickerrore = true; return; }
                    } catch (error) {
                        this.Quickerrore = true; return;
                    }
                    var pageItem = Object.keys(this.currentPageItems).length;
                    for (var ix = 0; ix < existItem.data.length; ix++) {
                        let FoodID = existItem.data[ix].food_id
                        for (var l = 0; l < pageItem; l++) {
                            var Itempage = this.currentPageItems[l].food_id
                            if (Itempage == FoodID) {
                                this.qty[l] = parseInt(existItem.data[ix].item_qty)
                                break;
                            }
                        }
                    }
                }
            }
        },

        evaluateStatus: function (food, statusArray) {
            this.pageNum = 0;
            if (statusArray.length != 0) {
                if (this.checkSale(food, statusArray) && this.checkBest(food, statusArray) && this.checkNew(food, statusArray) && this.checkSeason(food, statusArray) && this.checkOnl(food, statusArray)) {
                    return food;
                }
            }
            else {
                return food;
            }
        },
        evaluatePrice: function (food, priceRange) {
            this.pageNum = 0;
            var cal = parseFloat(food.food_price) - parseFloat(food.food_discount);
            if (priceRange == "2,5") {
                if (2 <= cal && cal <= 5) {
                    return food;
                }
            }
            else if (priceRange == "5,10") {
                if (5 <= cal && cal <= 10) {
                    return food;
                }
            }
            else if (priceRange == "10,12") {
                if (10 <= cal && cal <= 12) {
                    return food;
                }
            }
            else if (priceRange == "2") {
                if (cal <= 2) {
                    return food;
                }
            }
            else if (priceRange == "12") {
                if (cal >= 12) {
                    return food;
                }
            }
            else if (priceRange == "") {
                return food;
            }
        },

        filterFoodBtn: function (value, index) {

            this.FilterBtncolor(index)
            this.foodObj.name = ""
            var qtylenght = Object.keys(this.currentPageItems).length;
            this.pageNum = 0;
            this.foodObj.category = value;
            for (var l = 0; l < qtylenght; l++) {
                this.qty[l] = 0
            }
        },

        FilterBtncolor(index) {
            if (this.Prenotazione == 0) {
                const element = document.getElementById('filter' + index);
                document.querySelectorAll('[id^="filter"]').forEach(el => {
                    el.style.background = 'white';
                    el.style.color = 'black';
                    el.style.width = '100%';
                });

                if (element) {
                    element.style.cssText = `
                    background: #f38609;
                    border-radius: 10px;
                    color: white;
                    width: 75%;
                `;
                }
            }
        },

        onQtyChange: function (index) {
            // Cancella il timer se esiste per l'articolo specifico
            if (this.throttleTimers[index]) {
                clearTimeout(this.throttleTimers[index]);
            }

            if (this.qty[index] < 0) {
                this.qty[index] = 0;

            }
            this.showCart = false;
            this.eventBus.emit("showCart", this.showCart);

            // Imposta un timer specifico per l'articolo
            this.throttleTimers[index] = setTimeout(() => {
                if (this.currentPageItems[index].FlgVariante != 0) {
                    this.AltreVarianti(index)
                } else {
                    this.addToCart(index, false);
                }
                delete this.throttleTimers[index]; // Rimuovi il timer dopo l'esecuzione
            }, this.throttleDelay);

            this.setqty = true;

        },

        async AltreVarianti(index) {
            this.sendId = this.currentPageItems[index].food_id;
            let lastItem = []
            let QtaVarianti = 0
            if (sessionStorage.getItem('MatchUser')) {
                this.Isuser = true
                try {
                    var existItem = await axios.get('/cartItem/' + sessionStorage.getItem('Username'));
                    if (existItem.errMsg) { this.Quickerrore = true; return; }
                } catch (error) {
                    this.Quickerrore = true; return;
                }
                if (existItem.data.length > 0) {
                    for (var i = existItem.data.length - 1; i >= 0; i--) {
                        for (let l = 0; l < this.currentPageItems.length; l++) {
                            if (this.currentPageItems[l].food_id == existItem.data[i].food_id) {
                                if (this.currentPageItems[l].FlgVariante == 0) {
                                    lastItem[0] = existItem.data[i].food_id
                                    lastItem[1] = existItem.data[i].item_qty
                                    if (lastItem[1] >= (this.qty[index] + QtaVarianti)) {
                                        this.addToCart(index, true)
                                        break;
                                    } else {
                                        this.qty[index] = lastItem[1] - QtaVarianti
                                        this.addToCart(index, true)
                                    }
                                } else {
                                    if (existItem.data[i].food_id != this.sendId) {
                                        QtaVarianti = existItem.data[i].item_qty + QtaVarianti
                                    }
                                }
                            }
                        }

                    }
                } else {
                    this.qty[index] = 0
                    return;
                }
            }
        },


        async addToCart(index, IsVariante) {
            this.sendId = this.currentPageItems[index].food_id;
            this.showCounterCart = !this.showCounterCart;

            let user_id = sessionStorage.getItem('Username');
            let data = {
                user_id: user_id,
                food_id: this.sendId,
                item_qty: parseInt(this.qty[index])
            };
            this.setqty = false


            if (data.item_qty <= 0) {
                // Se la quantità è <= 0, rimuovi l'articolo dal carrello (se presente)
                await axios.delete("/cartItem/" + user_id + "/" + this.sendId);
                this.$refs.alert.showAlert("Successo", "Che peccato!", "Articolo rimosso con successo!");
            } else {
                // Verifica se l'articolo esiste nel carrello
                try {
                    var existingCartItem = await axios.get("/cartItem/" + user_id + "/" + this.sendId);
                    if (existingCartItem.errMsg) { this.Quickerrore = true; return; }
                } catch (error) {
                    this.Quickerrore = true; return;
                }
                var Esiste = existingCartItem.data.length > 0 ? true : false
                if (Esiste) {
                    // Se l'articolo esiste, aggiorna la quantità
                    await axios.put("/cartItem/", data);
                    this.$refs.alert.showAlert("Successo", "Grazie!", "Articolo modificato correttamente!");
                } else {
                    // Altrimenti, aggiungi l'articolo al carrello
                    await axios.post("/cartItem", data);
                    this.$refs.alert.showAlert("Successo", "Grazie!", "Articolo aggiunto al carrello!");
                }
            }

            if (this.Prenotazione === "1") {
                // Gestisci la prenotazione dell'articolo
                try {
                    var cartItems = await axios.get('/cartItem/' + user_id);
                    if (cartItems.errMsg) { this.Quickerrore = true; return; }
                } catch (error) {
                    this.Quickerrore = true; return;
                }
                IsVariante = this.currentPageItems[index].FlgVariante != 0 ? true : false
                if (!IsVariante) {
                    IsVariante = Esiste === true ? true : false
                }
                if (cartItems.data.length > 1 && !IsVariante) {
                    // Se ci sono più di un articolo non variante nel carrello, rimuovi l'articolo aggiunto
                    await axios.delete("/cartItem/" + user_id + "/" + this.sendId);
                    this.qty[index] = 0;
                    this.showQuickView = true;
                    this.$refs.alert.showAlert("Attenzione", "Ci Dispiace!", "Puoi prenotare solo un articolo per ordine!");
                } else {
                    await axios.put("/cartItem/", data);
                    this.$refs.alert.showAlert("Successo", "Grazie!", "Articolo modificato correttamente!");
                }
            }

            this.showCart = true;
            this.eventBus.emit("showCart", this.showCart);
        },
    },

    components: {
        VueBasicAlert,
        QuickViewPrenotazione,
        QuickViewErrore,
        VueToggles
    }
};
</script>

<style scoped>
input[type="button"] {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
}

.action-btn:active,
.action-btn:focus {
    border: none;
    outline: none;
}

hr {
    border-top: 3px solid #057835fa;
    width: 100%;
}



.filter-section {
    width: inherit;
}

.filter-heading {
    padding-top: 20px;
}

.filter-heading h1 {
    color: #27ae60;
    padding-left: 10px;
}

.filter-option {
    list-style-type: none;
    width: inherit;
}

.filter-option label {
    width: 100%;
    font-size: 17px;
    padding: 2px 10px;

}

.filter-option label:hover {
    color: white;
    width: 75%;
    background-color: #f38609 !important;
    border-radius: 10px;
    transition: all 0.5s ease;
}

.search-box {
    width: 100%;
    justify-content: center;
    position: relative;
    display: flex;
    margin-bottom: 10px;
}

.search-input {
    border-radius: 10px;
    margin: 0;
    width: 100%;
    padding-left: 10px;
    height: 40px;
    font-size: 20px;
    color: white;
    background: #27ae60;
}

::placeholder {
    color: white;
}

.menu-section {
    padding: 2rem 9%;
}

.menu-section .box-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(27rem, 1fr));
    gap: 1.5rem;
}

.menu-section .box-container .box {
    border-radius: 0.5rem;
    position: relative;
    background: #f7f7f7;
    padding: 2rem;
    text-align: center;
}

.menu-section .box-container .box .image {
    margin: 1rem 0;
}

.menu-section .box-container .box .image img {
    height: 15rem;
}

.menu-section .box-container .box .content h3 {
    font-size: 2rem;
    color: #130f40;
}

.menu-section .box-container .box .content .stars {
    font-size: 1.7rem;
}

.menu-section .box-container .box .content .stars i {
    color: gold;
}

.menu-section .box-container .box .content .stars span {
    color: #666;
}

.menu-section .box-container .box .content .desc p {
    font-size: 14px;
}

.menu-section .box-container .box .content .price {
    font-size: 2.4rem;
    padding-bottom: 3px;
    color: #130f40;
}

.menu-section .box-container .box .content .price span {
    font-size: 1.5rem;
    color: #666;
    text-decoration: line-through;
}

.menu-section .box-container .box .content .add-to-cart {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: auto;
    padding-top: 10px;

}

.menu-section .box-container .box .content .add-to-cart .btn {
    flex: 33%;
    padding-left: 2%;
    padding-right: 2%;
    touch-action: manipulation;
}

.menu-section .box-container .box .content .add-to-cart .btn:hover {
    background-color: #27ae60;
    touch-action: manipulation;
}

.menu-section .box-container .box .content .add-to-cart h4 {
    font-size: 2.0rem;
    flex: 33%;
    margin: 0px;
    padding-top: 0.5rem;
    background-color: white;
    color: #130f40;
}


.menu-section .action-row {
    padding-top: 30px;
    width: 100%;
    text-align: center;
    font-size: 20px;
}

.menu-section .action-row .action-btn {
    background-color: #27ae60;
    padding: 3px;
    border: 2px solid #27ae60;
    border-radius: 30%;
    color: white;
}

.menu-section .action-row span {
    margin-right: 15px;
}

.menu-section .action-row span:hover {
    cursor: pointer;
}

.menu-section .action-row span.highlight {
    color: #f38609;
}

.menu-section .action-row span:first-of-type {
    margin-left: 15px;
}

.filter-drop-down {
    display: none;
}

.to-cart {
    width: 50%;
    margin-left: 25%;
    margin-right: 25%;
    margin-top: 5vh;
}

@media (min-width: 576px) {

    .filter-heading,
    .filter-section {
        display: block !important;
    }
}

@media (max-width: 768px) {
    .menu-section .box-container {

        grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
        gap: 1rem;
    }

    .menu-section .box-container .box .content h3 {
        height: 4rem;
    }
}

@media (max-width: 576px) {

    .search-box,
    .filter-heading,
    .filter-section {
        width: auto;
    }

    .filter-option {
        width: 100%;
    }

    /*  .filter-drop-down {
        display: block;
        background-color: #27ae5f;
        border-radius: 10px;
        color: white;
        font-weight: 400;
        margin-top: 15px;
        margin-bottom: 5px;

    }

    .filter-drop-down p {
        font-size: 20px;
        padding: 5px 10px;
        margin: 0;
        display: flex;
        justify-content: space-between;
    }

    .filter-drop-down p span {
        font-size: 20px;
        padding-right: 10px;
        text-transform: lowercase;
        font-weight: 300;
    } */

    .filter-heading,
    .filter-section {
        display: block;
        margin-bottom: 20px;
    }

    .menu-section .action-row {
        font-size: 16px !important;
    }

    .menu-section .action-row span {
        margin-right: 5px;
    }

    .menu-section .box-container .box .image img {
        height: 12.5rem;
    }

    .menu-section .box-container .box .desc p {
        font-size: medium;
    }

    .menu-section .box-container .box .content .stars {
        font-size: 10px !important;
    }

    .menu-section .box-container .box .content h3 {
        font-size: large !important;
        padding-top: 2%;
        margin-bottom: 13px;
    }

    .menu-section .box-container .box .content .price {
        font-size: 2.8rem;
        padding-bottom: 3px;
        color: #130f40;
    }

    .menu-section .box-container .box .content .add-to-cart h4 {
        font-size: 2.5rem;
        text-align: center;
        color: #130f40;
    }

    .to-cart {
        width: 100%;
        margin: 0%;
        margin-top: 5vh;
    }

    @media (max-width: 361px) {
        .menu-section .box-container {
            grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
            gap: 1rem;
        }

        .menu-section .box-container .box .content h3 {
            height: 4rem;
            font-size: 15px !important;
        }

        .menu-section .box-container .box .content .price {
            font-size: 1.8rem;
        }

        .menu-section .box-container .box .content .desc p {
            font-size: small;
        }

    }

}
</style>