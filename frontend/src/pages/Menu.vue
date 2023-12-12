<template>
    <vue-basic-alert :duration="300" :closeIn="1500" ref="alert" />

    <div class="menu-section">
        <div class="heading">
            <span>menu</span>
            <h3>Vi presentiamo i nostri piatti</h3>
        </div>

        <div class="row">
            <div class="col-sm-4 col-12 filter-box">
                <div class="row search-box">
                    <input type="text" class="search-input" v-model="foodObj.name" placeholder="Cerca.." />
                </div>

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
                            <input type="button" name="cbStatus" id="ooStatus" value="pasta" hidden
                                @click="filterFoodBtn($event)" />
                            <label for="ooStatus" class="d-flex justify-content-between">Pasta</label>
                        </li>


                        <li>
                            <input type="button" name="cbStatus" id="soStatus" value="carne" hidden
                                @click="filterFoodBtn($event)" />
                            <label for="soStatus" class="d-flex justify-content-between">Carne</label>
                        </li>


                        <!-- <li>
                            <input type="button" name="cbStatus" id="sdStatus" value="pesce" hidden
                                @click="filterFoodBtn($event)" />
                            <label for="sdStatus" class="d-flex justify-content-between">Pesce</label>
                        </li> -->

                        <li>
                            <input type="button" name="cbStatus" id="ndStatus" value="bevande" hidden
                                @click="filterFoodBtn($event)" />
                            <label for="ndStatus" class="d-flex justify-content-between">Bevande</label>
                        </li>

                    </ul>
                    <hr />
                </div>
            </div>

            <div class="col-sm-8">
                <div class="row box-container">
                    <div v-for="(f, index) in currentPageItems" :key="index">
                        <div class="box">
                            <!--<a href="" class="fas fa-heart"></a>-->
                            <div class="image">
                                <img :src="require(`../assets/images/${f.food_src}`)" alt="" />
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

                                <div class="add-to-cart">
                                    <button class="btn" style="flex: 33%; padding-left: 2%; padding-right: 2%;"
                                        value="minus" @click="qty[index]--, onQtyChange(index)"><i
                                            class="fa-solid fa-minus"></i></button>
                                    <h4 style="flex: 33%; background-color: white;">{{ qty[index] }}</h4>
                                    <button class="btn" style="flex: 33%; padding-left: 2%; padding-right: 2%;" value="plus"
                                        @click="qty[index]++, onQtyChange(index)"><i class="fa-solid fa-plus"></i></button>
                                    <button name="conferma" class="btn"
                                        style="margin-top: 30px; display: none; background-color: #f38609; padding: 2vh; padding-left: 3vh; padding-right: 3vh;"
                                        @click="addToCart(index)" value="conferma">Conferma</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="!filterFoods.length">
                        <div class="box">
                            <div class="content">
                                <h1 style="color: #057835fa;">Nessun articolo trovato!</h1>
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
        <QuickView v-if="showQuickView" @childEvent="handleChildEvent"></QuickView>
    </div>
</template>

<script>
import QuickView from "@/components/QuickView.vue";
import { mapState } from "vuex";
import VueBasicAlert from 'vue-basic-alert';
import axios from "axios";

export default {
    props: ["food"],
    name: "Menu",

    data() {
        let categorytype = sessionStorage.getItem('filtro')
        //let Ordertype = sessionStorage.getItem('Type')
        if (categorytype == null || undefined || "") {
            categorytype = ""
        } else {
            sessionStorage.removeItem('filtro')
        }
        return {
            foodObj: { name: "", category: categorytype, status: [], price: "", type: "" },
            showQuickView: false,
            showDropDown: false,
            matchUser: undefined,
            setqty: false,

            sendId: null,
            showCounterCart: false,
            qty: [],
            CartItem: [],
            perPage: 25,
            pageNum: 0,
        };
    },

    created() {
        this.buildArray()
        this.getAllCartItem()
        console.log('crea')
    },

    updated() {
        this.buildArray()
        this.getAllCartItem()
        console.log('up')
    },

    computed: {
        ...mapState(["allFoods"]),
        filterFoods: function () {
            return this.allFoods.filter((f) => f.food_name.toLowerCase().match(this.foodObj.name.toLowerCase()) &&
                (f.food_category.match(this.foodObj.category) || this.foodObj.category == "all" || this.foodObj.category == "") &&
                (this.evaluatePrice(f, this.foodObj.price)) &&
                f.food_type.toLowerCase().match(this.foodObj.type.toLowerCase()) &&
                (this.evaluateStatus(f, this.foodObj.status)));
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
            return this.allFoods.filter((f) => parseInt(f.food_id) == parseInt(this.food));
        },
    },
    methods: {
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

        async getAllCartItem() {
            if (this.setqty !== true) {
                if (sessionStorage.getItem('MatchUser')) {
                    let existItem = await axios.get('/cartItem/' + sessionStorage.getItem('Username'));
                    var pageItem = Object.keys(this.currentPageItems).length;
                    for (var ix = 0; ix < existItem.data.length; ix++) {
                        let FoodID = parseInt(existItem.data[ix].food_id)
                        for (var l = 0; l < pageItem; l++) {
                            var Itempage = parseInt(this.currentPageItems[l].food_id)
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
        s: function (e) {
            let previousCategory = this.foodObj.category
            let divControl1 = document.getElementsByName("conferma")
            var qtylenght = Object.keys(this.currentPageItems).length;
            for (var l = 0; l < qtylenght; l++) {
                console.log(divControl1[l].style.display)
                if (divControl1[l].style.display == "block") {
                    this.foodObj.category = previousCategory
                    this.showQuickView = true
                    return;
                }
            }

            this.pageNum = 0;
            this.foodObj.category = e.target.value;
            e.target.style.background = "#057835fa";


            for (l = 0; l < qtylenght; l++) {
                this.qty[l] = 0
            }
        },

        addItem: function (index) {
            this.sendId = parseInt(this.currentPageItems[index].food_id);
            this.showCounterCart = !this.showCounterCart;
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
            let divControl1 = document.getElementsByName("conferma");
            divControl1[index].style.display = "block";
            if (this.qty[index] < 0) {
                this.qty[index] = 0;
            }
            this.setqty = true
        },

        async addToCart(index) {
            let divControl1 = document.getElementsByName("conferma")
            divControl1[index].style.display = "none";

            this.sendId = parseInt(this.currentPageItems[index].food_id);
            this.showCounterCart = !this.showCounterCart;
            this.showQuickView = false

            let existItem = await axios.get("/cartItem/" + parseInt(sessionStorage.getItem('Username')) + "/" + parseInt(this.sendId))
            let data = {
                user_id: parseInt(sessionStorage.getItem('Username')),
                food_id: parseInt(this.sendId),
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

        },
    },

    components: {
        VueBasicAlert,
        QuickView
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

.menu-section .box-container .box .content .add-to-cart h4 {
    font-size: 2.0rem;
    text-align: center;
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

}
</style>