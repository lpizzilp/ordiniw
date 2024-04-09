<template>
    <div class="shopping-cart-section">

        <div class="heading">
            <span>Conta Prezzi</span>
            <h3>Diviti la spesa tra i vari membri</h3>
        </div>

        <div class="container">
            <div class="wrapper wrapper-content">
                <div class="row">
                    <div class="in-cart col-md-9">
                        <div class="box">
                            <div class="box-title item-total row">
                                <h3 style="border: 1px solid black; padding: 7px; margin: 0; text-align: center; justify-content: center; width: ;">
                                    <p>Gruppi tra cui dividere il prezzo: <input type="text" :placeholder="Coperti" v-model="Coperti" @input="this.Calcnumbtn()"></p>
                                </h3>
                            </div>

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
                                            <label id="iQuantity" class="form-control item-quantity">{{
                                                itemQuantity[index]
                                            }}</label>
                                        </div>

                                        <div class="item-qty">
                                            <button v-for="(f, index) in group" :key="index" class="btn" value="plus"
                                                :style="{ 'border-radius': '10px 10px 0px 0px' }"
                                                @click="itemQuantity[index]++, onQtyChange(index)"><i
                                                    class="fa-solid fa-plus"></i></button>
                                        </div>

                                        <div class="cal-total col-sm-2">
                                            <h4 class="item-total">{{
                                                calculateItemPrice(index)
                                            }}€
                                            </h4>
                                        </div>
                                    </div>
                                    <hr style="border-width: 2px; background-color: #27ae60;">
                                </div>
                            </div>


                        </div>
                    </div>


                    <div class="col-md-3">
                        <div class="box">
                            <div class="box-title">
                                <h3 style="color: #f38609;">Totale {{ calculateSummaryPrice()[0] }}€</h3>
                            </div>

                            <div class="box-content">
                                <div class="btn-group">
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
var queryString = window.location.search;
queryString = queryString.substring(1);
var parametri = queryString.split("&");
var parametriObj = {};
for (var i = 0; i < parametri.length; i++) {
    var coppia = parametri[i].split("=");
    parametriObj[coppia[0]] = coppia[1];
}
import router from "@/router";
import axios from "axios";
import { mapState } from "vuex";
export default {
    name: "Cart",

    data() {
        return {
            cartItem: [],
            itemQuantity: [],
            Coperti: parametriObj.coperti,
            group: [],
            screenWidth: window.innerWidth,
            showQuickView: false,
            dataFromParent: null,
            Isuser: false,
            Quickerrore: false
        };
    },

    created() {
        this.getAllBillItem();
        this.Calcnumbtn();
    },

    computed: {
        ...mapState(["allFoods", "user"]),

        filterFoods: function () {
            return this.allFoods.filter(
                (f) => this.matchID(f, this.cartItem)
            );
        },

        isPrenotazione: function () {
            if (sessionStorage.getItem('filtro') === "PRE") {
                return true
            } else {
                return false
            }
        },
    },

    methods: {

        Calcnumbtn() {
            this.group = []
            for (let i = 0; i < this.Coperti; i++) {
                this.group.push(i)
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

        handleChildEvent(dataFromChild) {
            this.showQuickView = dataFromChild.event;
            let i = dataFromChild.id
            if (dataFromChild.type === 'si') {
                this.cancelBtn(i)
            }
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

        async onQtyChange(i) {
            if (this.itemQuantity[i] == 0) {
                this.dataFromParent = i
                this.itemQuantity[i] = 1
                this.showQuickView = true
            }

            let data = {
                user_id: parseInt(sessionStorage.getItem('Username')),
                food_id: this.cartItem[i],
                item_qty: this.itemQuantity[i]
            };

            let IsVariante = this.filterFoods.find(item => item.food_id == this.cartItem[i])
            IsVariante = IsVariante.FlgVariante == 0 ? false : true
            console.log(IsVariante)
            if (IsVariante) {
                let Nonvariante = this.filterFoods.findIndex(item => item.FlgVariante == 0)
                let Maxqta = this.itemQuantity[Nonvariante]
                let Qtavarianti = 0
                for (let i = (Nonvariante + 1); i < this.cartItem.length; i++) {
                    Qtavarianti = Qtavarianti + this.itemQuantity[i]
                }
                if (Qtavarianti > Maxqta) {
                    this.itemQuantity[i] = data.item_qty - (Qtavarianti - Maxqta)
                    data.item_qty = this.itemQuantity[i]
                }
            }
            await axios.put("/cartItem/", data)
        },

        ToHome() {
            router.push("/")
        },

        checkOutBtn: function () {
            this.cartItem = [];
            this.itemQuantity = [];
            this.$router.push("/checkout");
        },

        async getAllBillItem() {
            if (sessionStorage.getItem('MatchUser')) {
                this.Isuser = true
                let existItem = await axios.get('/billdetails/' + parametriObj.orderid);
                console.log(existItem)
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
            }
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
    border-color: #e7eaec;
    border-style: solid solid none;
    border-width: 3px 0 0;
    color: inherit;
    margin-bottom: 0;
    padding: 14px 15px 7px;
    min-height: 78px;
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
    font-size: 16px;
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
    }

    .box-content .btn-group button {
        border-radius: .5rem !important;
    }

    .box-content .btn-group button i {
        margin-top: 3px;
    }

    .box-content .btn-group .check-out-btn {
        display: flex;
        margin-top: 10px;
        margin-bottom: 10px;
        padding: 10px 25%;
        text-align: center;
    }
}

@media (max-width: 576px) {

    .box-title {
        min-height: 48px;
    }

    .box-title.item-total {
        border: none;
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
        margin-top: 30px;
    }

    .item-qty {
        position: absolute;
        margin-top: 30px;
        margin-left: 120px
    }

    .cal-total {
        position: absolute;
        margin-top: 30px;
        margin-left: 60px;

        display: block;
        color: black !important;
    }

    .cal-total h4 {
        font-size: 16px;
    }

    .in-cart .box-content .check-out-btn {
        display: none;
    }

}
</style>