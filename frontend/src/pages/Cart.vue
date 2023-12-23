<template>
    <div class="shopping-cart-section">

        <div class="heading">
            <span>Carrello</span>
            <h3>Conferma l'ordine premendo "Checkout"</h3>
        </div>

        <div class="container">
            <div class="wrapper wrapper-content">
                <div class="row">
                    <div class="in-cart col-md-9">
                        <div class="box">
                            <div class="box-title item-total row">
                                <h3>
                                    <p style="font-size: 15px;">{{ filterFoods.length.toString() }}
                                        <span v-if="filterFoods.length != 1">Articoli nel tuo carrello</span>
                                        <span v-else>Articolo nel tuo carrello</span>
                                    </p>
                                </h3>
                            </div>

                            <div v-if="!filterFoods.length">
                                <div class="box-content row no-food">
                                    <div class="content">
                                        <h2 style="color: #057835fa;">Non ci sono ancora articoli nel carrello.
                                            <br>Va a comprare qualcosa!
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
                                        <div v-if="f.food_src != null" class="image-box col-sm-3" style="padding-left: 0;">
                                            <img :src="require(`../assets/images/${f.food_src}`)" alt=""
                                                class="cart-product-img" />
                                        </div>

                                        <div class="desc col-sm-4">
                                            <h2 class="item-name">{{ f.food_name.substring(0, 19)  }}</h2>
                                            <div class="item-desc">
                                                <b>Descrizione</b>
                                                <p>{{ f.food_desc.substring(0, 25) }}</p>
                                            </div>
                                            <button class="btn remove-btn" @click="cancelBtn(index)"><i
                                                    class="fa fa-trash"></i>Rimuovi</button>
                                        </div>

                                        <div class="item-price col-sm-1">
                                            <span class="sale-price">{{ parseFloat(f.food_price) -
                                                parseFloat(f.food_discount)
                                            }}€</span>
                                            <p class="text-muted first-price" v-if="parseFloat(f.food_discount) != 0.00">
                                                {{
                                                    parseFloat(f.food_price)
                                                }}€

                                            </p>
                                        </div>

                                        <div class="item-qty col-sm-2 d-inline">
                                            <button class="btn" value="plus"
                                                style="border-bottom-left-radius: 0px; border-bottom-right-radius: 0px;"
                                                @click="itemQuantity[index]++, onQtyChange(index)"><i
                                                    class="fa-solid fa-plus"></i></button>
                                            <label id="iQuantity" class="form-control item-quantity">{{ itemQuantity[index]
                                            }}</label>
                                            <button class="btn" value="minus"
                                                style="border-top-left-radius: 0px; border-top-right-radius: 0px;"
                                                @click="itemQuantity[index]--, onQtyChange(index)"><i
                                                    class="fa-solid fa-minus"></i></button>
                                        </div>

                                        <div class="cal-total col-sm-2">
                                            <h4 class="item-total">{{
                                                calculateItemPrice(index)
                                            }}€
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>

                        <div class="box-content row">
                            <div v-if="Isuser">
                                <router-link to="/menu" class="btn shop-btn"><i class="fa fa-arrow-left"></i>Aggiungi
                                    articoli</router-link>
                            </div>
                            <div v-else>
                                <router-link to="/" class="btn shop-btn"><i class="fa fa-arrow-left"></i>Inizia a
                                    comprare</router-link>
                            </div>
                            <button class="btn check-out-btn" style="margin-left: 10px;"
                                :disabled="filterFoods.length ? false : true" @click="checkOutBtn()"><i
                                    class="fa fa fa-shopping-cart"></i>Checkout</button>
                        </div>
                    </div>


                    <div class="col-md-3">
                        <div class="box">
                            <div class="box-title">
                                <h3>Totale {{ calculateSummaryPrice()[0] }}€</h3>
                            </div>

                            <div class="box-content">
                                <div class="btn-group">
                                    <button class="btn check-out-btn" :disabled="filterFoods.length ? false : true"
                                        @click="checkOutBtn()"><i class="fa fa-shopping-cart"></i>
                                        Checkout</button>
                                    <button class="btn cancel-btn" @click="cancelBtn(false)"
                                        :disabled="filterFoods.length ? false : true">
                                        Annulla ordine</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <quick-view-cart v-if="showQuickView" @childEvent="handleChildEvent" :parentData="dataFromParent"></quick-view-cart>
    </div>
</template>

<script>
import axios from "axios";
import QuickViewCart from "@/components/QuickViewCart.vue";
import { mapState } from "vuex";
export default {
    name: "Cart",

    data() {
        return {
            cartItem: [],
            itemQuantity: [],
            showQuickView: false,
            dataFromParent: null,
            Isuser: false,
        };
    },

    created() {
        this.getAllCartItem();
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
        matchID: function (food, cartArray) {
            let temp = "";
            cartArray.forEach(element => {
                if (parseInt(food.food_id) == element) {
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
            return ((parseFloat(this.filterFoods[index].food_price) - parseInt(this.filterFoods[index].food_discount)) * this.itemQuantity[index]).toString()
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
                food_id: parseInt(this.cartItem[i]),
                item_qty: this.itemQuantity[i]
            };
            await axios.put("/cartItem/", data)
        },

        async cancelBtn(index) {
            if (index === false) {
                await axios.delete("/cartItem/" + sessionStorage.getItem('Username'));
                this.cartItem = [];
                this.itemQuantity = [];
            } else {
                await axios.delete("/cartItem/" + sessionStorage.getItem('Username') + "/" + this.cartItem[index]);
                this.cartItem.splice(index, 1);
                this.itemQuantity.splice(index, 1);
            }
        },

        checkOutBtn: function () {
            this.cartItem = [];
            this.itemQuantity = [];
            this.$router.push("/checkout");
        },

        async getAllCartItem() {
            if (sessionStorage.getItem('MatchUser')) {
                this.Isuser = true
                let existItem = await axios.get('/cartItem/' + sessionStorage.getItem('Username'));
                existItem.data.forEach(element => {
                    this.cartItem.push(element.food_id);
                    this.itemQuantity.push(element.item_qty);
                });
            }
        }


    },

    components: {
        QuickViewCart
    }

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
    border-style: solid solid none;
    border-width: 1px 0;

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
    width: 6rem;
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
        margin-top: 25px;
        position: relative;

    }

    .item-price {
        position: absolute;
        margin-top: 55px;
    }

    .item-price .first-price {
        display: inline;
        padding-left: 5px;
        color: red !important;
    }

    .item-qty {
        position: absolute;
        margin-top: 15px;
        padding-left: 200px;
    }

    .cal-total {
        display: none;
    }

    .in-cart .box-content .check-out-btn {
        display: none;
    }

}
</style>