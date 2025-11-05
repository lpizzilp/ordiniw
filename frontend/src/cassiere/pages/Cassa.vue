<template>
    <vue-basic-alert :duration="300" :closeIn="1500" ref="alert" />
    <div class="info-container" :style="{ marginLeft: `${cassaBarraWidth}px` }">
        <div class="form-group" :key="refreshlayout">
            <label :id="foodObj.type == 'W' ? 'uTavolo' : 'uNominativo'" style="padding-right: 10px;">
                {{ foodObj.type == 'W' ? 'Inserisci il Tavolo' : 'Inserisci il Nominativo' }}
            </label>
            <input type="text" :id="foodObj.type == 'W' ? 'uTavolo' : 'uNominativo'"
                :name="foodObj.type == 'W' ? 'uTavolo' : 'uNominativo'" class="form-control"
                :placeholder="foodObj.type == 'W' ? 'Inserisci il tavolo' : 'Inserisci il nominativo'"
                v-model="currentTableOrName" :ref="foodObj.type ? 'Itavolo' : null" />
        </div>
        <hr class="divisor" />
        <div class="form-group">
            <label :for="foodObj.type ? 'uCoperti' : 'uNote'" style="padding-right: 10px;">
                {{ foodObj.type == 'W' ? 'Inserisci i Coperti' : 'Note' }}
            </label>
            <input type="text" :id="foodObj.type == 'W' ? 'uCoperti' : 'uNote'"
                :name="foodObj.type == 'W' ? 'uCoperti' : 'uNote'" class="form-control"
                :placeholder="foodObj.type == 'W' ? 'Inserisci i coperti' : 'Inserisci una specifica'"
                v-model="currentCoversOrNotes" />
        </div>
    </div>
    <hr id="Copertura"
        style="position: fixed; top: 68px; left: 0; right: 0; bottom: 0; z-index: 994; width: 100%; height: 100%; border: 200vh solid #0000004f;">
    <div class="menu-section" :style="{ marginLeft: `${cassaBarraWidth - 39}px` }">

        <div class="row-container">
            <div class="grid-container">
                <div class="filter-menu" ref="menuRef">
                    <button :id="'filter' + (ind + 1)" v-for="(r, ind) in loadReparti" :key="ind"
                        @click="filterFoodBtn(r.idReparto, (ind + 1))">
                        {{ r.descReparto }}
                    </button>
                </div>
                <div class="row box-container">
                    <div v-for="(f, index) in currentPageItems" :key="index" @click="onQtyChange($event.button, index)"
                        @contextmenu.prevent="onQtyChange($event.button, index)">
                        <div class="box">
                            <!--<a href="" class="fas fa-heart"></a>-->
                            <div class="content">
                                <h3>{{ f.FlgVariante != 0 ? '++ ' + f.food_name + ' ++' : f.food_name }}</h3>
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
                                    <h4 class="btn" style="background-color: white; padding: 0px 10px; "
                                        v-if="qty[index] == 0">{{ qty[index] }}</h4>
                                    <h4 class="btn" v-else
                                        style="background-color: #27ae60; padding: 1px 10px; color: white; box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.4);">
                                        {{
                                            qty[index] }}
                                    </h4>
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
                                <img src="@/assets/images/notfound.png" alt="" />
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
            <div class="filter-box" ref="filterbox">
                <h4 class="row price-box">{{ calculateSummaryPrice() }} €</h4>
                <hr style="margin: 0px;" />
                <div class="close-table">
                    <table class="table-cart">
                        <thead>
                            <tr>
                                <th style="border-right: 2px solid #273dae;">Qta</th>
                                <th>Articolo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(i, index) in Cartarray" :key="index">
                                <td style="border-right: 2px solid #273dae;">{{ i.qty }}</td>
                                <td>{{ i.artDesc }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button v-if="buttonDisabled" class="btn" @click="handleConfermaClick($event)" style="width: 90%; font-size: 1.8rem;"
                    ><i class="fa-solid fa-print"
                        style="padding-right: 2vh;"></i>STAMPA</button>
                <button v-else class="btn" @click="handleConfermaClick($event)" style="width: 90%; font-size: 1.8rem;"
                    disabled><i class="fa-solid fa-print"
                        style="padding-right: 2vh;"></i>STAMPA</button>

                <button class="btn"
                    style="width: 90%; background-color: #f38609; font-size: 1.7rem; margin-top: 2vh; margin-bottom: 2vh; "
                    @click="ClearAll()"><i class="fa-solid fa-xmark" style="padding-right: 2vh;"></i>Annulla
                    l'ordine</button>
            </div>
        </div>
        <quick-view-prenotazione v-if="Prenotazione === '1' && showQuickView === true"
            @closedata="CloseQuickvue"></quick-view-prenotazione>
    </div>
    <quick-view-errore v-if="Quickerrore" @childError="CloseQuickvue"></quick-view-errore>
</template>

<script>
import { mapState } from "vuex";
import VueBasicAlert from 'vue-basic-alert';
import QuickViewErrore from "@/components/QuickViewErrore.vue";
import QuickViewPrenotazione from "@/components/QuickViewPrenotazione.vue";
import axios from "axios";
//import { nextTick } from "vue";

export default {
    props: ["food"],
    name: "Menu",
    inject: ["eventBus"],

    data() {
        let categorytype = ""
        let flgartprenotabile = "0"
        let flgvariante = "0"
        let Ordertype = sessionStorage.getItem('Tipo').toUpperCase()
        /*switch (sessionStorage.getItem('filtro')) {
            case 'PRE':
                flgartprenotabile = "1"
                flgvariante = "1"
                break;
            default:
                sessionStorage.getItem('filtro') ? categorytype = sessionStorage.getItem('filtro') : categorytype = ""
                break;
        }*/
        const currentTime = (() => {
            var now = new Date();
            var day = ("0" + now.getDate()).slice(-2);
            var month = ("0" + (now.getMonth() + 1)).slice(-2);
            var hour = ("0" + (now.getHours())).slice(-2);
            var min = ("0" + (now.getMinutes())).slice(-2);
            return now.getFullYear() + "-" + month + "-" + day + "T" + hour + ":" + min;
        })();

        return {
            foodObj: { name: "", category: categorytype, status: [], price: "", type: Ordertype, prenotazioni: flgartprenotabile, ora: "", varianti: flgvariante },
            checkoutObj: { id_sagra: sessionStorage.getItem('SagraId'), bill_id: "", user_id: sessionStorage.getItem('userCassa'), bill_tavolo: "", bill_coperti: "", bill_when: currentTime, bill_method: "cash", bill_discount: '0', bill_delivery: '0', bill_total: "0", bill_paid: "true", bill_status: "1", TipoCassa: Ordertype, Nominativo: "", bill_note: "" },
            Cartarray: [], //{ id: "", artDesc: "", price: "", qty: "" }
            showDropDown: false,
            matchUser: undefined,
            setqty: false,
            Prenotazione: flgartprenotabile,
            Compress: false,
            QtyDisponibile: [],

            refreshlayout: 0,
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
            Quickerrore: false,
            Quickcasse: true,
            buttonDisabled: false,
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

    mounted() {
        setTimeout(() => {
            this.filterFoodBtn(this.loadReparti[0].idReparto, 1)
            this.setupWatcher();
        }, 200);
    },

    updated() {
        this.buildArray(),
            this.getAllCartItem()
    },

    beforeUnmount() {
        this.ClearAll()
    },

    computed: {
        ...mapState(["allFoods"]),
        ...mapState(["allReparti"]),
        ...mapState({
            cassaBarraWidth: state => state.cassaBarraWidth,
        }),
        ...mapState(["userCassa"]),

        filteredMenuItems() {
            if (this.activeFilter === 'Tutti') {
                return this.menuItems
            }
            return this.menuItems.filter(item => item.category === this.activeFilter)
        },

        filterFoods: function () {
            return this.allFoods.filter((f) => f.food_name.toLowerCase().match(this.foodObj.name.toLowerCase()) &&
                (f.IdReparto.match(this.foodObj.category) || this.foodObj.category == "all" || this.foodObj.category == "") &&
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

        loadReparti: function () {
            const IdRepartomap = [...new Set(this.allFoods.filter(f => f.food_type.toLowerCase().match(this.foodObj.type.toLowerCase())).map(f => f.IdReparto))];
            return this.allReparti.filter((r) => IdRepartomap.includes(r.idReparto));
        },

        currentTableOrName: {
            get() {
                return this.foodObj.type ? this.checkoutObj.bill_tavolo : this.checkoutObj.Nominativo;
            },
            set(value) {
                if (this.foodObj.type == 'W') {
                    this.checkoutObj.bill_tavolo = value;
                } else {
                    this.checkoutObj.Nominativo = value;
                }
            }
        },
        currentCoversOrNotes: {
            get() {
                return this.foodObj.type ? this.checkoutObj.bill_coperti : this.checkoutObj.bill_note;
            },
            set(value) {
                if (this.foodObj.type == 'W') {
                    this.checkoutObj.bill_coperti = value;
                } else {
                    this.checkoutObj.bill_note = value;
                }
            }
        },
        /*gridStyle() {
            let neWidth = 0
            nextTick(() => {
                setTimeout(() => {
                    // Ottieni gli stili calcolati del container grid
                    const box = document.querySelector('.box-container');
                    const styles = window.getComputedStyle(box);
                    const columns = styles.gridTemplateColumns.split(' ').length

                    const rect = box.getBoundingClientRect();
                    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
                    const visual = rect.bottom > (viewportHeight + 50)

                    console.log(this.getElementsInLastRow(box) + ' visual ' + visual + ' colums ' + columns)

                    if (!visual) {
                        if ( columns > this.getElementsInLastRow(box) && columns > '1') {
                    neWidth = ((columns - this.getElementsInLastRow(box)) / 100) + 100
                    console.log(neWidth + 'new widtch')
                       }
                   }
                }, 200);
            });
            return 'repeat(auto-fill, minmax(' + neWidth + ', 1fr))'
        },*/
    },

    methods: {
        ClearAll() {
            let Ordertype = this.foodObj.Ordertype
            let currentTime = this.checkoutObj.bill_when
            this.checkoutObj = []
            this.checkoutObj = { id_sagra: sessionStorage.getItem('SagraId'), bill_id: "", user_id: sessionStorage.getItem('userCassa'), bill_tavolo: "", bill_coperti: "", bill_when: currentTime, bill_method: "cash", bill_discount: '0', bill_delivery: '0', bill_total: "0", bill_paid: "true", bill_status: "1", TipoCassa: Ordertype, Nominativo: "", bill_note: "" },

                sessionStorage.removeItem('Tipo')
            sessionStorage.removeItem("QtyArray")
            sessionStorage.removeItem("CartArray")
            this.CartItem = []
            this.Cartarray = []
            this.qty = []
        },

        handleFilterChange(filter) {
            this.activeFilter = filter
        },

        handleTipocassa(data) {
            this.Quickcasse = false
            this.foodObj.type = data
            this.checkoutObj.TipoCassa = data
            this.refreshlayout = 1
        },

        setupWatcher() {
            const props = this.foodObj.type === 'W'
                ? ['bill_tavolo', 'bill_coperti']
                : ['Nominativo', 'bill_note'];

            const updateVisibility = () => {
                const visibility = this.checkoutObj[props[0]] && this.checkoutObj[props[1]] ? 'none' : 'block';
                const visibility2 = this.checkoutObj[props[0]] && this.checkoutObj[props[1]] ? 'false' : 'true';
                document.getElementById('Copertura').style.display = visibility;
                this.buttonDisabled = visibility2
            };


            this.$watch(() => this.checkoutObj[props[0]], updateVisibility);
            this.$watch(() => this.checkoutObj[props[1]], updateVisibility);

            updateVisibility(); // Imposta la visibilità all'inizio
        },

        getWIFIConnection() {
            const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            if (connection) {
                this.wifiquality = connection.effectiveType.indexOf('g')
                this.wifispeed = connection.downlink
            } else {
                //console.log('API navigator.connection non supportata.');
            }
        },

        getElementsInLastRow(gridContainer) {
            const gridItems = Array.from(gridContainer.children); // Ottieni tutti gli elementi figli
            if (gridItems.length === 0) return 0; // Se non ci sono elementi, ritorna 0

            // Ottieni la posizione inferiore di ogni elemento
            const itemPositions = gridItems.map(item => item.getBoundingClientRect().bottom);

            // Trova la posizione inferiore massima (ultima riga)
            const lastRowBottom = Math.max(...itemPositions);

            // Conta gli elementi che appartengono all'ultima riga
            const elementsInLastRow = gridItems.filter(
                item => item.getBoundingClientRect().bottom === lastRowBottom
            );

            return elementsInLastRow.length; // Ritorna il numero di elementi nell'ultima riga
        },

        CloseQuickvue(data) {
            this.showQuickView = data
            this.Quickerrore = data
        },

        scrollToTop() {
            window.scrollTo(0, 0);
        },

        errorImage(e) {
            e.target.src = require('@/assets/images/no.png');
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
            var hour = ("0" + (now.getHours())).slice(-2);
            var min = ("0" + (now.getMinutes())).slice(-2);
            this.foodObj.ora = now.getFullYear() + "-" + month + "-" + day + "T" + hour + ":" + min;
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
            if (this.setqty) return;
            const qtyArray = JSON.parse(sessionStorage.getItem("QtyArray") || '[]');
            const cartArray = JSON.parse(sessionStorage.getItem("CartArray") || '[]');
            if (qtyArray.length && cartArray.length) {
                this.Cartarray = cartArray;
                this.qty = qtyArray;
                const pageItems = this.currentPageItems;
                const giavalorizati = new Set();

                cartArray.forEach(cartItem => {
                    const foodID = cartItem.id;
                    pageItems.forEach((pageItem, index) => {
                        const itemPageID = pageItem.food_id;
                        if (itemPageID === foodID) {
                            this.qty[index] = parseInt(cartItem.qty);
                            giavalorizati.add(itemPageID);
                        } else if (!giavalorizati.has(itemPageID)) {
                            this.qty[index] = 0;
                        }
                    });
                });
            }
            this.setqty = true;
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
            var cal = parseFloat(food.food_price).toFixed(2) - parseFloat(food.food_discount).toFixed(2);
            if (priceRange == "2,50") {
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

        calculateSummaryPrice: function () {
            let total = 0.00;
            for (let i = 0; i < this.Cartarray.length; i++) {
                total = total + this.Cartarray[i].price * this.Cartarray[i].qty
            }
            this.checkoutObj.bill_total = parseFloat(total).toFixed(2)
            return this.checkoutObj.bill_total
        },

        filterFoodBtn: function (value, index) {
            this.FilterBtncolor(index)
            this.foodObj.name = ""
            var qtylenght = Object.keys(this.currentPageItems).length;
            this.pageNum = 0;
            this.foodObj.category = value;
            this.qty.length = 0
            for (var l = 0; l < qtylenght; l++) {
                this.qty[l] = 0
            }
            this.setqty = false
        },

        FilterBtncolor(index) {
            if (this.Prenotazione == 0) {
                const element = document.getElementById('filter' + index);
                document.querySelectorAll('[id^="filter"]').forEach(el => {
                    el.style.cssText = `
                        padding: 5px 25px;
                        margin: 0px 0px;
                        width: 100%;
                        background-color: #f0f0f0;
                        border-radius: 0px;
                        font-size: 2rem;
                        border: 2px inset black;
                        cursor: pointer;
                        transition: background-color 0.3s;`;
                });

                if (element) {
                    element.style.cssText = `
                    padding: 5px 25px;
                    margin: 0px 0px;
                    width: 100%;
                    background: #273dae;
                    border: 2px inset black;
                    border-radius: 0px;
                    font-size: 2rem;
                    color: white;
                `;
                }
            }
        },

        onQtyChange: function (BtnInesco, index) {
            if (BtnInesco === 0) {
                this.qty[index]++
            } else if (BtnInesco === 2) {
                this.qty[index]--
                if (this.qty[index] < 0) {
                    this.qty[index] = 0;
                }
            }

            // Imposta un timer specifico per l'articolo
            if (this.currentPageItems[index].FlgVariante != 0) {
                this.AltreVarianti(index)
            } else {
                this.cartElement(index)
            }

            this.setqty = true;

        },

        async AltreVarianti(index) {
            this.sendId = this.currentPageItems[index].food_id;
            let lastItem = []
            let QtaVarianti = 0
            if (sessionStorage.getItem('MatchUser')) {
                this.Isuser = true
                try {
                    var existItem = await axios.get('/cartItem/' + sessionStorage.getItem('userCassa'));
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


        cartElement: function (index) {
            var idElement = this.currentPageItems[index].food_id
            var item = this.Cartarray.findIndex(item => item.id === idElement);
            if (item !== -1) {
                if (this.qty[index] <= 0) {
                    this.Cartarray.splice(item, 1)
                } else {
                    this.Cartarray[item].qty = this.qty[index]
                }
            } else {
                if (this.qty[index] > 0) {
                    this.Cartarray.push(
                        { id: idElement, artDesc: this.currentPageItems[index].food_name, price: this.currentPageItems[index].food_price, qty: this.qty[index] }
                    )
                }
            }
            sessionStorage.setItem('CartArray', JSON.stringify(this.Cartarray))
            sessionStorage.setItem('QtyArray', JSON.stringify(this.qty))
        },

        handleConfermaClick(e) {
            // Disabilita il pulsante
            // axios.post('stampa/ordine')
            this.buttonDisabled = true;
            this.Datasubmit(e)
            setTimeout(() => {
                this.buttonDisabled = false;
            }, 1000); // 1000 millisecondi = 1 secondo
        },

        async sendBillDetails(idSagra, billId, foodId, qty) {
            let Details = {
                id_sagra: idSagra,
                bill_id: parseInt(billId),
                food_id: foodId,
                item_qty: parseInt(qty)
            };
            try {
                const response = await axios.post("/billdetails", Details);
                if (response.errMsg) {
                    throw new Error("Whoops!");
                }
            } catch (error) {
                throw new Error("Whoops!");
            }
        },

        async Datasubmit(e) {
            e.preventDefault(); //importante
            if (sessionStorage.getItem('Bill') != "" || sessionStorage.getItem('Bill') != null || sessionStorage.getItem('Bill') != undefined) {
                axios.delete("/billstatus/delete/" + sessionStorage.getItem('Bill'))
                axios.delete("/billdetails/delete/" + sessionStorage.getItem('Bill'))
            }
            let billId = (await axios.get("/billstatus/new")).data;

            if (billId == "") billId = 1;
            else {
                billId = parseInt(billId.bill_id) + 1;
            }
            this.checkoutObj.bill_id = billId
            try {
                const response = await axios.post("/billstatus", this.checkoutObj);
                if (response.errMsg) { this.Quickerrore = true; return; }
            } catch (error) {
                this.Quickerrore = true; return;
            }
            sessionStorage.setItem('Bill', this.checkoutObj.bill_id)
            sessionStorage.setItem('Coperti', this.checkoutObj.bill_coperti)

            //COMMON -> dettaglio per tutti ----------------------------------------- 
            let detailPromises = []; // Array per memorizzare le promesse delle richieste di inserimento dei dettagli dell'ordine
            this.Cartarray.forEach(f => {
                detailPromises.push(this.sendBillDetails(this.checkoutObj.id_sagra, this.checkoutObj.bill_id, f.id, f.qty));
            });
            try {
                await Promise.all(detailPromises);// Attendere il completamento di tutte le richieste di inserimento dei dettagli dell'ordine
            } catch (error) {
                this.Quickerrore = true;
                return;
            }

            const descSagra = (await axios.get('/sagra/ute/' + this.checkoutObj.id_sagra)).data[0].descrizione;

            let data = this.Cartarray.map(item => {
                const food = Object.values(this.allFoods).find(f => f.food_id === item.id);
                return {
                    Descsagra: descSagra,
                    bill_id: this.checkoutObj.bill_id,
                    user_name: this.userCassa,
                    bill_tavolo: this.checkoutObj.bill_tavolo,
                    bill_nominativo: this.checkoutObj.Nominativo,
                    bill_coperti: this.checkoutObj.bill_coperti,
                    bill_note: this.checkoutObj.bill_note,
                    bill_when: this.checkoutObj.bill_when,
                    bill_total: this.checkoutObj.bill_total,
                    TipoCassa: this.checkoutObj.TipoCassa,
                    food_id: item.id.trim(),
                    food_desc: food?.food_name,
                    food_price: item.price,
                    food_qty: item.qty
                };
            });

            try {
                const response = await axios.post('stampa/ordine', data)
                if (response.errMsg) { this.Quickerrore = true; return; }
            } catch (error) {
                this.Quickerrore = true; return;
            }

            this.ClearAll()
        },
    },

    components: {
        VueBasicAlert,
        QuickViewPrenotazione,
        QuickViewErrore,
    }
};
</script>

<style scoped>
.info-container,
.filter-menu-container {
    position: fixed;
    top: 1;
    left: 0;
    right: 0;
    background-color: #fff;
    text-align: center;
    z-index: 100;
    margin-top: 77.5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow-x: auto;
    white-space: nowrap;
    border-bottom: 2px inset black;
    -webkit-overflow-scrolling: touch;
}

.filter-menu-container::-webkit-scrollbar-thumb {
    background-color: #f38609;
    border-radius: 5px;
}

.filter-menu-container::-webkit-scrollbar {
    background-color: #f5f5f5;
    border-radius: 5px;
}

.filter-menu {
    display: flex;
    background-color: #273dae;
    margin: -7px -10px;
    margin-bottom: 10px;
    border-radius: 10px;
}

.info-container {
    margin-top: 0px;
    background-color: #f7f7f7;
    display: flex;
    padding: 10px 0;
    justify-content: space-evenly;
}

.info-container .divisor {
    border-top: 3px solid #273dae;
    margin: 0;
    padding: 0;
    width: 128px;
    transform: rotate(90deg);
    /* Ruota l'hr per renderlo verticale */
}

.info-container .form-group {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    text-align: center;
    font-size: 1.7rem;
    margin: 0
}


.info-container .form-group input {
    margin: .7rem 0;
    border-radius: .5rem;
    background: #fff;
    padding: 2rem 1.2rem;
    font-size: 1.6rem;
    color: #130f40;
    text-transform: none;

    border-color: black;
}



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

.filter-box {
    display: flex;
    flex-direction: column;
    margin-left: 1%;
    flex: 24%;
    width: 100%;
    height: 70vh;
    border: 1px inset black;
    background-color: #f5f5f5;
    border-radius: 10px;
    text-align: center;
    align-items: center;
    -webkit-box-shadow: -1px 3px 8px 5px #bbbbbb, 2px 5px 16px 0px #0B325E, 5px 5px 15px 5px rgba(0, 0, 0, 0);
    box-shadow: -1px 3px 8px 5px #bbbbbb, 2px 5px 16px 0px #0B325E, 5px 5px 15px 5px rgba(0, 0, 0, 0);
}

.filter-box .price-box {
    background-color: #273dae;
    width: 90%;
    margin: 15px 10px;
    padding: 10px 10px;
    border-radius: 10px;
    justify-content: center;
    font-size: 2.5rem;
    color: white;
    box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.4),
        /* ombra interna */
        inset -5px -5px 10px rgba(0, 0, 0, 0.4);
}

.filter-box .close-table {
    width: 90%;
    height: calc(9 * (16px + 1.5rem));
    overflow-x: auto;
    margin: 15px 5%;
    border: 2px inset black;
    background-color: white;
    border-radius: 10px;
}

.filter-box .close-table .table-cart {
    width: 100%;
    border-radius: 10px;
    background-color: white;
    font-size: 1.5rem;
}

.table-cart>thead {
    border-bottom: 2px solid #273dae;
}

.table-cart>tbody>tr {
    border-bottom: 1px dashed #273dae;
}

.table-cart>thead>tr>th,
.table-cart>tbody>tr>td {
    padding: 5px 0px;
}

.table-cart>thead>tr>th {
    padding: 2px 0px;
}

.close-table::-webkit-scrollbar {
    border-radius: 10px;
    width: 0.5rem;
}


.close-table::-webkit-scrollbar-thumb {
    background: #f38609;
    padding: 3px 0px;
    border-radius: 10px;
}

.search-input {
    border-radius: 10px;
    margin: 0;
    width: 100%;
    height: 40px;
    padding-left: 35px;
    font-size: 20px;
    color: white;
    background: #27ae60;
}

.fa-magnifying-glass {
    position: absolute;
    top: 12px;
    left: 7px;
    color: white;
    font-size: 17px;
}

.search-input::placeholder {
    color: white;
}

.menu-section {
    padding: 11rem 2% 0rem 5%;
}

.row-container {
    display: flex;
}

.grid-container {
    flex: 75%;
    padding: 10px;
    border: 2px solid black;
    border-top: 0px;
    border-radius: 10px;
    box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.4),
        /* ombra interna */
        inset -5px -5px 10px rgba(0, 0, 0, 0.4);
}

.menu-section .box-container {
    user-select: none;
    margin: 2.5px;
    cursor: pointer;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(10vmax, 1fr));
    gap: 0.4rem;
}

.menu-section .box-container .box {
    border-radius: 10px;
    border: 3px dotted rgb(0, 0, 0);
    position: relative;
    background: #d4d4d4;
    padding: 2rem;
    text-align: center;
}

.menu-section .box-container .box .content h3 {
    font-size: 1.6rem;
    color: #130f40;
}

.menu-section .box-container .box .content .price {
    font-size: 2.4rem;
    padding-bottom: 3px;
    color: #130f40;
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

.to-cart {
    width: 50%;
    margin-left: 25%;
    margin-right: 25%;
    margin-top: 5vh;
}

/*---------------------------------*/
h3 {
    /*font-size: 1.2em; */
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /* Limita il titolo a 2 righe */
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    /* Nasconde il testo oltre la seconda riga */
    text-overflow: ellipsis;
    /* Aggiunge "..." alla fine se il testo è troppo lungo */
    /*max-height: calc(1.2em * 2); /* Altezza massima impostata per 2 righe di testo */
    line-height: 1.1em;
    /* Altezza della linea specifica per mantenere proporzioni corrette */
    word-wrap: break-word;
    /* Permette al testo di andare a capo correttamente */
}


/*---------------------------------*/

@media (min-width: 576px) {

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
        height: 5rem;
    }
}

@media (max-width: 576px) {

    .search-box,
    .filter-section {
        width: auto;
    }

    .filter-option {
        width: 100%;
    }

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
        height: 1.5rem;
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
            height: 5rem;
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