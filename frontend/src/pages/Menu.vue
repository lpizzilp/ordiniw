<template>
    <vue-basic-alert :duration="300" :closeIn="1500" ref="alert" />

    <div class="menu-section">
        <div class="heading">
            <span>menu</span>
            <h3 v-if="Prenotazione == '0'">Vi presentiamo i nostri piatti</h3>
            <h3 v-else>Prenotazione serate speciali</h3>
        </div>

        <div class="row">
            <div class="col-sm-4 col-12 filter-box">
                <div class="row search-box">
                    <input type="text" class="search-input" v-model="foodObj.name" placeholder="Cerca.." />
                </div>

                <div v-if="Prenotazione == '0'">
                    <div class="row filter-drop-down">
                        <p @click="displayFilterDrop">Filtri<span v-if="showDropDown">V</span><span v-else>X</span></p>
                    </div>

                    <div class="row filter-heading">
                        <h1>Tipo</h1>
                    </div>

                    <div class="row filter-section">
                        <ul class="filter-option">
                            <li>
                                <input type="button" name="cbStatus" id="bsStatus" value="all" hidden
                                    @click="filterFoodBtn($event)" />
                                <label for="bsStatus" class="d-flex justify-content-between">Mostra tutto</label>
                            </li>


                            <li>
                                <input type="button" name="cbStatus" id="ooStatus" value="P" hidden
                                    @click="filterFoodBtn($event)" />
                                <label for="ooStatus" class="d-flex justify-content-between">Primi</label>
                            </li>


                            <li>
                                <input type="button" name="cbStatus" id="soStatus" value="C" hidden
                                    @click="filterFoodBtn($event)" />
                                <label for="soStatus" class="d-flex justify-content-between">Cucina</label>
                            </li>


                            <!-- <li>
                            <input type="button" name="cbStatus" id="sdStatus" value="pesce" hidden
                                @click="filterFoodBtn($event)" />
                            <label for="sdStatus" class="d-flex justify-content-between">Pesce</label>
                        </li> -->

                            <li>
                                <input type="button" name="cbStatus" id="ndStatus" value="B" hidden
                                    @click="filterFoodBtn($event)" />
                                <label for="ndStatus" class="d-flex justify-content-between">Bevande</label>
                            </li>

                        </ul>
                        <hr />
                    </div>
                </div>
            </div>

            <div class="col-sm-8">
                <div class="row box-container">
                    <div v-for="(f, index) in currentPageItems" :key="index">
                        <div class="box">
                            <!--<a href="" class="fas fa-heart"></a>-->
                            <div v-if="Artimage(f.food_src) != ''" class="image">
                                <img :src="Artimage(f.food_src)" :alt="require('../assets/images/no.png')"
                                    @click="qty[index]++, onQtyChange(index)" />
                            </div>
                            <div class="content">
                                <h3>{{ f.food_name }}</h3>
                                <div class="desc">
                                    <p>{{ f.food_desc }}</p>
                                </div>
                                <div class="price">
                                    {{ parseFloat(f.food_price) - parseFloat(f.food_discount) }} €
                                    <span v-if="parseFloat(f.food_discount) != 0.00">{{ parseFloat(f.food_price) }} €</span>
                                </div>

                                <div v-if="f.QtaDisponibile == 0" class="add-to-cart">
                                    <h4
                                        style="flex: 50%; background-color: #f38609; text-align: center; color: white; border-radius: 10px; padding: 0.9rem;">
                                        Esaurito
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
                                <h1 v-if="Prenotazione == '1'" style="color: #057835fa;">Nessun articolo! <br>Prenotazioni chiuse</h1>
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
            <router-link @click="scrollToTop()" to="cart" class="btn" style="width: 100%;">
                <i class="fas fa-shopping-cart cart"></i> Vai al carrello
            </router-link>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import VueBasicAlert from 'vue-basic-alert';
import axios from "axios";

export default {
    props: ["food"],
    name: "Menu",

    data() {
        let categorytype = ""
        let flgartprenotabile = "0"
        let Ordertype = sessionStorage.getItem('TipoOrdine')
        switch (sessionStorage.getItem('filtro')) {
            case 'PRE':
                flgartprenotabile = "1"
                console.log(sessionStorage.getItem('filtro'))
                break;


            default:
                sessionStorage.getItem('filtro') ? categorytype = sessionStorage.getItem('filtro') : categorytype = ""
                sessionStorage.removeItem('filtro')
                break;
        }

        return {
            foodObj: { name: "", category: categorytype, status: [], price: "", type: Ordertype, prenotazioni: flgartprenotabile },
            showQuickView: false,
            showDropDown: false,
            matchUser: undefined,
            setqty: false,
            Prenotazione: flgartprenotabile,

            sendId: null,
            showCounterCart: false,
            qty: [],
            CartItem: [],
            perPage: 50,
            pageNum: 0,
            timer: 0.25
        };
    },

    created() {
        this.buildArray()
        this.getAllCartItem()
        if (this.Prenotazione == '1') {
            this.chekPrenotazioni()
        }
    },

    updated() {
        this.buildArray()
        this.getAllCartItem()
    },

    computed: {
        ...mapState(["allFoods"]),
        filterFoods: function () {
            return this.allFoods.filter((f) => f.food_name.toLowerCase().match(this.foodObj.name.toLowerCase()) &&
                (f.food_category.match(this.foodObj.category) || this.foodObj.category == "all" || this.foodObj.category == "") &&
                (this.evaluatePrice(f, this.foodObj.price)) &&
                f.food_type.toLowerCase().match(this.foodObj.type.toLowerCase()) &&
                (this.evaluateStatus(f, this.foodObj.status)) &&
                f.FlgPrenotabile.toString().match(this.foodObj.prenotazioni.toString()));
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
    },
    methods: {

        // return require(`../assets/images/${this.food_src}`);

        Artimage(food) {
            try {
                return require(`../assets/images/${food}`);

            } catch (ex) {
                return '';//require(`../assets/images/no.png`);
            }
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

        ImagePresent: function () {
            if (this.f.food_src != null) {
                return 1;
            }
        },

        chekPrenotazioni() {
            //ee
        },

        async getAllCartItem() {
            if (this.setqty !== true) {
                if (sessionStorage.getItem('MatchUser')) {
                    let existItem = await axios.get('/cartItem/' + sessionStorage.getItem('Username'));
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

        handleChildEvent(dataFromChild) {
            this.showQuickView = dataFromChild;
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
        filterFoodBtn: function (e) {
            var qtylenght = Object.keys(this.currentPageItems).length;
            this.pageNum = 0;
            this.foodObj.category = e.target.value;
            e.target.style.background = "#057835fa";
            for (var l = 0; l < qtylenght; l++) {
                this.qty[l] = 0
            }
        },

        displayFilterDrop: function () {
            let divControl1 = document.getElementsByClassName("filter-heading");
            let divControl2 = document.getElementsByClassName("filter-section");
            for (var i = 0; i < divControl1.length; i++) {
                if (this.showDropDown) {
                    divControl1[i].style.display = "block";
                    divControl2[i].style.display = "block";
                }
                else {
                    divControl1[i].style.display = "none";
                    divControl2[i].style.display = "none";
                }
            }
            this.showDropDown = !this.showDropDown;
        },

        onQtyChange: function (index) {
            clearInterval(this.timerInterval);
            if (this.qty[index] < 0) {
                this.qty[index] = 0;
            }

            this.timerInterval = setInterval(() => {
                if (this.timer > 0) {
                    this.timer--;
                } else {
                    // Quando il timer raggiunge zero, ferma l'intervallo e inserisci nel carrello
                    clearInterval(this.timerInterval);
                    this.addToCart(index)
                }
            }, 250);


            this.setqty = true
        },

        async addToCart(index) {
            this.sendId = this.currentPageItems[index].food_id;
            this.showCounterCart = !this.showCounterCart;
            this.showQuickView = false

            let existItem = await axios.get("/cartItem/" + parseInt(sessionStorage.getItem('Username')) + "/" + this.sendId)
            let data = {
                user_id: parseInt(sessionStorage.getItem('Username')),
                food_id: this.sendId,
                item_qty: parseInt(this.qty[index])
            }

            this.setqty = false

            switch (existItem.data.length) {
                case 1:
                    if (data.item_qty <= 0) {
                        await axios.delete("/cartItem/" + sessionStorage.getItem('Username') + "/" + this.sendId)
                        this.$refs.alert.showAlert("Successo", "Che peccato!", "Articolo rimosso con successo!")
                    } else {
                        await axios.put("/cartItem/", data);
                        this.$refs.alert.showAlert("successo", "Grazie!", "Articolo modificato correttamente!");
                    }
                    break;

                case 0:
                    if (data.item_qty <= 0) {
                        this.$refs.alert.showAlert("Errore", "Riprovare!", "Impossibile inserire articolo con con quantità pari a " + data.item_qty + "!")
                    } else {
                        await axios.post("/cartItem/", data);
                        this.$refs.alert.showAlert("successo", "Grazie!", "Articolo aggiunto al carrello!")
                        break;
                    }
            }

            if (this.Prenotazione === "1") {
                let Itemprenotabili = await axios.get('/cartItem/' + sessionStorage.getItem('Username'));
                if (Itemprenotabili.data.length > 1) {
                    await axios.delete("/cartItem/" + sessionStorage.getItem('Username') + "/" + this.sendId)
                    this.qty[index] = 0
                    this.$refs.alert.showAlert("Errore", "Riprovare!", "Puoi prenotare solo una articolo per ordine!");
                } else {
                    await axios.put("/cartItem/", data);
                    this.$refs.alert.showAlert("successo", "Grazie!", "Articolo modificato correttamente!");
                }
            }

        },
    },

    components: {
        VueBasicAlert
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
    background-color: #f38609 !important;
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
}

.menu-section .box-container .box .content .add-to-cart .btn:hover {
    background-color: #27ae60;
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

    .filter-drop-down {
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
    }

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

}</style>