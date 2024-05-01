<template>
    <div class="shopping-cart-section">

        <div class="heading">
            <!-- <span>Fai i Conti Giusti</span> -->
            <h3 style="font-family: 'Satisfy', cursive; color: #27ae60;">Dividi la spesa per gruppi</h3>
            <h2>Assegna un colore a ogni gruppo e carica le quantità </h2>

        </div>

        <div class="container">
            <div class="wrapper wrapper-content">
                <div class="row">
                    <div class="in-cart col-md-9">
                        <div class="box">
                            <div class="box-title item-total row">
                                <h3 class="group-box">
                                    Gruppi tra cui dividere il prezzo: <input type="number" :max="maxBtn" min="2"
                                        maxlength="1" style="text-align: center; color: #27ae60;"
                                        :placeholder="Coperti == null ? 'inserire' : Coperti" v-model="Coperti"
                                        @input="this.Calcnumbtn()">
                                </h3>
                            </div>
                            <hr v-show="shwRow" id="mioDiv"
                                style="border-width: 2px; background-color: #27ae60; margin-top: 15px;">

                            <div v-if="!filterFoods.length">
                                <div class="box-content row no-food">
                                    <div class="content">
                                        <h2 style="color: #057835fa;">Errore!
                                            <br>Aggiorna la pagina
                                        </h2>
                                    </div>
                                    <div class="image">
                                        <img src="../assets/images/notfound.png" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <hr style="border-width: 2px; background-color: #27ae60; margin-top: 15px;">
                                <div v-for="(f, index) in filterFoods" :key="index">

                                    <div class="box-content row">
                                        <div class="desc col-sm-4">
                                            <h2 class="item-name" style="color: #146c39">{{ f.food_name }}</h2>
                                            <div class="item-desc" style="color: black;">
                                                <b>&nbsp;</b>
                                                <b>&nbsp;</b>
                                            </div>
                                        </div>

                                        <div class="item-price col-sm-1">
                                            <label id="iQuantity"
                                                :style="{ 'border-color': Complete[1][index] === true ? '#27ae60' : '#f38609', 'border-width': '2px' }"
                                                class="form-control item-quantity">{{
                                                    itemQuantity[index]
                                                }}<i :class="'fa-solid fa-' + (Complete[1][index] === true ? 'check' : '')"
                                                    :style="{ 'color': Complete[1][index] === true ? '#27ae60' : '#f38609', 'padding-left': '4px' }"></i></label>
                                        </div>

                                        <div class="item-qty">
                                            <button v-for="(value, indexBtn) in group[index]" :key="indexBtn"
                                                class="btn" value="plus"
                                                :style="{ 'border-radius': '10px 10px 0px 0px', 'background-color': Valorifissi[0][indexBtn] }"
                                                @click="group[index][indexBtn]++, onIcrement(index, indexBtn)">
                                                <i v-if="group[index][indexBtn] == 0" class="fa-solid fa-plus"></i>
                                                <i v-else :class="'fa-solid fa-' + group[index][indexBtn]"></i></button>
                                        </div>

                                        <!-- <div class="cal-total col-sm-2">
                                            <h4 class="item-total">{{
                                                calculateItemPrice(index)
                                                }}€
                                            </h4>
                                        </div> -->
                                    </div>
                                    <hr style="border-width: 2px; background-color: #27ae60;">
                                </div>
                            </div>


                        </div>
                    </div>


                    <div class="col-md-3">
                        <div class="box">
                            <div class="box-title">
                                <ul class="Pricelist">
                                    <li v-for="(value, index) in group[0]" :key="index"
                                        :style="{ 'color': Valorifissi[0][index] }">
                                        <h2>{{ Valorifissi[1][index] }}: <span style="color: black;"> {{ Price[index]
                                                }}€</span></h2>
                                    </li>
                                </ul>
                                <hr v-if="group.length != 0"
                                    style="border-width: 2px; background-color: #27ae60; margin-top: 15px;">
                                <h2
                                    :style="{ 'color': Complete[0][0] === true ? '#27ae60' : '#f38609', 'text-align-last': 'center', 'padding': '10.5px 0', 'margin': '0' }">
                                    Totale {{ calculateSummaryPrice()[0] }}€ <i v-show="Complete[0][0]"
                                        class='fa-solid fa-check'></i></h2>
                            </div>

                            <div class="box-content" style="text-align: center;">
                                <div style="width: 100%;" class="btn-group">
                                    <button class="btn cancel-btn" @click="ToHome()">
                                        Chiudi</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import router from "@/router";
import axios from "axios";
import { mapState } from "vuex";
export default {
    name: "Cart",


    data() {
        return {
            shwRow: true,
            cartItem: [],
            itemQuantity: [],
            Coperti: 4,
            maxBtn: null,
            group: [[0], [0]],
            Price: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            screenWidth: window.innerWidth,
            Quickerrore: false,
            Complete: [[false], []],
            Valorifissi: [['#E5C000', 'red', 'green', 'blue', 'purple', 'black', 'orange', 'azure', 'brown'], ['Giallo', 'Rosso', 'Verde', 'Blu', 'Viola', 'Nero', 'Arancione', 'Celeste', 'Marrone']]
        };
    },

    created() {
        this.getAllBillItem();
    },


    computed: {
        ...mapState(["allFoods", "user"]),

        filterFoods: function () {
            return this.allFoods.filter(
                (f) => this.matchID(f, this.cartItem)
            );
        },

    },

    methods: {

        Calcnumbtn() {
            this.group = []
            if (this.maxBtn == null) {
                this.Lenghtpage()
                this.Coperti = this.Coperti > this.maxBtn ? null : Math.abs(this.Coperti)
                console.log(this.Coperti + ' > ' + this.maxBtn)
            } {
                this.Coperti = this.Coperti > this.maxBtn ? this.maxBtn : this.Coperti < 2 ? this.Coperti = null : Math.abs(this.Coperti)
            }
            if (this.Coperti == "" || this.Coperti == 0 || this.Coperti == null) {
                this.Coperti = null
            } else {
                this.Price = Array(parseInt(this.Coperti)).fill(0)
                this.Complete[1] = Array(parseInt(this.cartItem.length)).fill(false)
                for (let foodindex = 0; foodindex < this.cartItem.length; foodindex++) {
                    this.group[foodindex] = Array(parseInt(this.Coperti)).fill(0)
                }
            }
        },

        Lenghtpage() {
            this.shwRow = true;
            this.$nextTick(() => {
                this.shwRow = false;
            });

            var div = document.getElementById("mioDiv");
            let divlenght = div.offsetWidth - 400
            switch (true) {
                case this.screenWidth > 768:
                    this.maxBtn = Math.abs(Math.floor(divlenght / 58, 35))
                    break;

                case this.screenWidth < 768 && this.screenWidth > 567:
                    this.maxBtn = Math.abs(Math.floor(divlenght / 52, 14))
                    break;

                case this.screenWidth < 567:
                    this.maxBtn = Math.abs(Math.floor((divlenght + 400) / 48))
                    break;
            }

        },


        matchID: function (food, cartArray) {
            let temp = "";
            cartArray.forEach(element => {
                if (food.food_id == element) {
                    temp = food
                }
            });
            return temp
        },

        calculateItemPrice: function (index) {
            return ((parseFloat(this.filterFoods[index].food_price) - parseFloat(this.filterFoods[index].food_discount)) * this.itemQuantity[index]).toString()
        },

        calculateSummaryPrice: function () {
            let subtotal = 0;
            for (let i = 0; i < this.itemQuantity.length; i++) {
                subtotal = subtotal + parseFloat(this.filterFoods[i].food_price) * this.itemQuantity[i]
            }
            let total = subtotal;
            return [subtotal, total];
        },

        onIcrement(indexItem, indexBtn) {
            let sommaqta = 0
            for (let i = 0; i < this.group[indexItem].length; i++) {
                sommaqta = this.group[indexItem][i] + sommaqta
            }

            if (this.itemQuantity[indexItem] < sommaqta) {
                this.Price[indexBtn] = this.Price[indexBtn] - (parseFloat(this.filterFoods[indexItem].food_price) * (this.group[indexItem][indexBtn] - 1))
                this.group[indexItem][indexBtn] = 0
            } else {
                this.Price[indexBtn] = parseFloat(this.filterFoods[indexItem].food_price) + this.Price[indexBtn]
            }
            
            this.CorrectQta(indexItem, indexBtn, sommaqta)

        },


        CorrectQta(indexItem,) {
            let qta = 0
            for (let i = 0; i < this.group[indexItem].length; i++) {
                qta = this.group[indexItem][i] + qta
            }
            if (this.itemQuantity[indexItem] == qta) {
                this.Complete[1][indexItem] = true
            } else {
                this.Complete[1][indexItem] = false
            }
            var indice = this.Complete[1].findIndex(item => item === false);
            if (indice == -1) {
                this.Complete[0][0] = true
            } else  {
                this.Complete[0][0] = false
            }
        },

        ToHome() {
            router.push("/")
        },

        async getAllBillItem() {
            let existItem = await axios.get('/billdetails/' + sessionStorage.getItem('Bill')); // + parametriObj.orderid);
            let response = existItem.request.response
            if (response.includes("{\"code\"")) {
                this.Quickerrore = true
                this.Makelog(response);
            } else {
                existItem.data.forEach(element => {
                    this.cartItem.push(element.food_id);
                    this.itemQuantity.push(element.item_qty);
                });
            }
            this.Calcnumbtn();
        },

        async Makelog(err) {
            let data = {
                mode: 'err',
                arg: err
            }
            await axios.post('/log', data)
        },
    },
}
</script>


<style scoped>
.shopping-cart-section {
    background: #fff;
    padding: 2rem 9%;
}

.item-name {
    color: #27ae60
}

.cart-product-img {
    text-align: center;
    width: 100%;
    height: 125px;
    object-fit: cover;
    background-color: #f7f7f7;

}

.box {
    clear: both;
    margin: 0;
    margin-bottom: 20px;
    padding: 0;
}

.box:after,
.box:before {
    display: table;
}

.box-title {
    background-color: inherit;
    border: 3px solid #e7eaec;
    border-radius: 10px;
    border-right: 0px;
    border-left: 0px;
    color: inherit;
    margin-bottom: 5px;
    padding: 10px 15px;
    justify-content: center;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.Pricelist {
    display: inline;
    list-style-type: square;
}


.Pricelist li {
    padding-left: 10px;
    margin-left: 30px
}

.group-box {
    border: 1px outset black;
    border-radius: 10px;
    margin: 0;
    padding: 10px;
    align-items: center;
    box-shadow: rgb(200, 208, 231) 3.2px 3.2px 8px 0px inset, rgb(255, 255, 255) -3.2px -3.2px 8px 0px inset;
}

.box-content {
    background-color: inherit;
    color: inherit;
    padding: 15px 20px 20px 20px;
    border-color: #e7eaec;
    border-image: none;

}

.item-desc b {
    font-size: 12px;
}

.item-desc p {
    font-size: 10px;
}

.sale-price,
.first-price,
.item-quantity {
    text-align: center;
    width: 5.85rem;
    height: 30px;
    font-size: 18px;
    margin-bottom: 0px;
    border-color: black;
}

.first-price {
    text-decoration: line-through;
}

.remove-btn {
    font-size: 12px;
    padding: 5px;
    margin-top: 27px;
}

.item-qty {
    display: flex;
    flex-wrap: nowrap;
    position: absolute;
    margin-top: 30px;
    margin-left: 400px
}

.item-qty {
    display: inline;
}

.remove-btn i {
    padding-right: 5px;
}

.box-content button i,
.box-content a i {
    padding-right: 5px;
}

.no-food {
    text-align: center;
    justify-content: center;
    display: block;
}

.no-food .image img {
    width: 200px;
    height: 200px;
}




@media (max-width: 768px) {
    .box-content .item-name {
        font-size: 14px;
    }

    .desc button {
        position: absolute;
        bottom: 0;
    }

    .box-content .btn-group {
        display: block;
        text-align: center;
        width: 100%;
    }

    .box-content .btn-group button {
        width: 75%;
        border-radius: 10px !important;
    }

    .box-content .btn-group button i {
        margin-top: 3px;
    }

}

@media (max-width: 576px) {

    .box-title {
        min-height: 48px;
    }

    .box-title.item-total {
        border: none;
        text-align: center
    }

    .in-cart .box-content .btn-group {
        margin-top: 5px;
        display: inline-flex;
    }

    .in-cart .box-content .btn-group .check-out-btn {
        display: flex;
        margin-top: 0px;
        margin-right: 5px;
        margin-bottom: 0px;
        padding: 10px 25%;
    }

    .image-box {
        position: absolute;
        opacity: 0.8;
        max-width: 100%;
        width: 100%;
        max-height: 100%;
        filter: brightness(60%);
        padding: none;
    }

    .image-box img {
        border-radius: 15px;

    }

    .in-cart .box-content {
        color: white;
        margin-left: -25px;
        border: none;
        display: flex;
    }

    .desc .item-name {
        font-size: 16px;
        filter: brightness(160%);
    }

    .desc b {
        font-size: 10px;
    }

    .desc p {
        font-size: 12px;
    }

    .desc .remove-btn {
        font-size: 12px;
        margin-top: 27px;
        position: relative;

    }

    .item-price {
        position: absolute;
        margin-top: -5px;
        margin-left: 200px;
    }

    .item-qty {
        position: absolute;
        margin-top: 30px;
        margin-left: 15px
    }

    .cal-total {
        display: none;
    }

    .cal-total h4 {
        font-size: 16px;
    }

    .box-content .btn-group button {
        width: 100%;
    }

}
</style>