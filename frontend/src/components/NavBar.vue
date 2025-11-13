<template>
    <div class="header">
        <router-link @click="scrollToTop()" to="/" class="logo"><img src="../assets/images/taco-logo.png" alt="" />
            {{ nav_name }}
        </router-link>

        <nav class="navbar">
            <router-link @click="scrollToTop()" to="/">Home</router-link>
            <!--<router-link @click="scrollToTop()" to="/menu">menu</router-link>
            <router-link @click="scrollToTop()" to="/table">table</router-link>
            <router-link @click="scrollToTop()" to="/promotions">Serate speciali</router-link>-->
            <router-link @click="scrollToTop()" to="/login">Login</router-link>
        </nav>

        <div v-if="showCart == true" class="icons">
            <div v-if="showHamburger" id="menu-btn" class="fas fa-bars menu-btn" @click="showNav"></div>
            <!-- Sostituisci il router-link con un button -->
            <button v-else-if="!showHamburger" @click="goToCartFromNavbar()" class="cart-button">
                <div class="fas fa-shopping-cart cart"></div>
            </button>            
            <!-- <router-link v-else-if="!showHamburger" @click="scrollToTop()" to="cart">
                <div class="fas fa-shopping-cart cart"></div>
            </router-link> -->
        </div>
        <div v-else class="icons">
            <div v-if="showHamburger" id="menu-btn" class="fas fa-bars menu-btn" @click="showNav"></div>
            <button v-else @click="scrollToTop()" :disabled="true">
                <div class="fas fa-shopping-cart cart" style="background-color: #130f40a6;"></div>
            </button>
        </div>

    </div>
</template>

<script>

import router from "@/router";
import axios from "axios";
import { showErrore } from '@/glbFunctions';
import { UAParser } from 'ua-parser-js';

export default {
    name: 'NavBar',
    inject: ["eventBus"],
    Quickerrore: false,

    data() {
        return {
            nav_name: 'Home ordini',
            sagra_name: '',
            info: '',
            numcoda: '',
            sito: '',
            showCart: false,
            showHamburger: false
        }
    },

    created() {
        this.getsagra();
    },

    mounted() {
        window.addEventListener('scroll', this.handleScroll);
        this.eventBus.on("showCart", (param) => {
            this.showCart = param
        });
        window.addEventListener('routeChanged', this.handleHamburger);
    },

    unmounted() {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('routeChanged', this.handleHamburger);
    },

    methods: {
        goToCartFromNavbar() {
            this.scrollToTop();
            // Emetti evento per chiamare goToCart() del componente menu
            this.eventBus.emit("goToCartFromNavbar");
        },

        scrollToTop() {
            window.scrollTo(0, 0);
        },

        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },

        handleHamburger() {
            let mq = window.matchMedia("(max-width: 768px)");
            if (router.currentRoute.value.path == '/' && mq.matches || router.currentRoute.value.path == '/login' && mq.matches) {
                this.showHamburger = true
            } else {
                this.showHamburger = false
            }
        },

        async getsagra() {
            if (!sessionStorage.getItem('Siglanav')) {
                const parser = new UAParser();
                    let UAresult = parser.getResult();
                    var os = UAresult.os.name ;
                    os = os.toUpperCase(); 
                try {
                    var sagra = await axios.get('/sagra/' + sessionStorage.getItem('SagraId'));
                    if (sagra.errMsg) {
                        if (os != 'IOS'){
                            showErrore();
                            return; 
                        }else return;   
                    }
                } catch (error) {
                    if (os != 'IOS'){
                            showErrore();
                            return; 
                        }else return;   
                    
                }
                if (sagra.data.length == 0) {
                    sessionStorage.setItem('SagraBottoni', 0)
                } else {
                    this.nav_name = sagra.data[0].descrizione
                    this.sagra_name = "" + sagra.data[0].desc_prefix + " " + sagra.data[0].descrizione
                    sessionStorage.setItem('Siglanav', this.nav_name)
                    sessionStorage.setItem('SiglaHome', this.sagra_name)

                    var ordini = [sagra.data[0].flgTavoli, sagra.data[0].flgAsporto, sagra.data[0].flgPrenotazioni]
                    if (ordini[0] == 1) {
                        ordini[0] = sagra.data[0].StrOrdini.substring(1, 2) == "" ? 1 : sagra.data[0].StrOrdini.substring(0, 1)
                    }
                    if (ordini[1] == 1) {
                        ordini[1] = sagra.data[0].StrOrdini.substring(2, 3) == "" ? 1 : sagra.data[0].StrOrdini.substring(1, 2)
                    }
                    if (ordini[2] == 1) {
                        ordini[2] = sagra.data[0].StrOrdini.substring(3, 4) == "" ? 1 : sagra.data[0].StrOrdini.substring(3, 4)
                    }
                    sagra.data[0].flgInfo == 1 ? this.info = sagra.data[0].info : this.info = ''
                    sagra.data[0].flgEliminacode == 1 ? this.numcoda = sagra.data[0].numcoda.toString() : this.numcoda = '000'
                    sagra.data[0].linkSito == null ? this.sito = 0 : this.sito = sagra.data[0].linkSito
                    sagra.data[0].flgForm == '' ? sagra.data[0].flgForm = '' : sagra.data[0].flgForm == null ? sagra.data[0].flgForm = '' : sagra.data[0].flgForm

                    const flgdata = ordini[0] + 'µ' + ordini[1] + 'µ' + ordini[2] + 'µ' + sagra.data[0].flgEliminacode + 'µ' + this.numcoda + 'µ' + sagra.data[0].flgInfo + 'µ' + this.info + 'µ' + sagra.data[0].nstartprt + 'µ' + this.sito + 'µ' + sagra.data[0].MaskVisibilita + 'µ' + sagra.data[0].MaskObbligo + 'µ' + sagra.data[0].flgMenu + 'µ' + sagra.data[0].flgForm
                    sessionStorage.setItem('SagraBottoni', flgdata)
                    if (history.replaceState) {
                        var nuovoURL = window.location.pathname + window.location.hash;
                        history.replaceState({}, document.title, nuovoURL);
                    }
                }
                this.eventBus.emit("loadBottoniHome", 'OIgetsagra-1');
            } else {
                this.nav_name = sessionStorage.getItem('Siglanav')
            }
        },

        showNav: function () {
            let navbar = document.querySelector('.header .navbar');
            navbar.classList.toggle('active');
        },

        showLog: function () {
            let mq = window.matchMedia("(max-width: 768px)");
            if (mq.matches) {
                let log = document.querySelector('.drop-down-select');
                log.classList.toggle('active');
            }
        },

        handleScroll: function () {
            let navbar = document.querySelector('.header .navbar');
            navbar.classList.remove('active');
            /* let log = document.querySelector('.drop-down-select');
             log.classList.remove('active');*/
        },
    }
}
</script>
<!------------------------------------------------------------------------->
<!------------------------------------------------------------------------->
<!------------------------------------------------------------------------->
<!------------------------------------------------------------------------->

<style scoped>
.header {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: #fff;
    box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2rem 9%;
}

.header .logo {
    font-size: 2.5rem;
    font-weight: bolder;
    color: #130f40;
}

.header .logo img {
    padding-right: .5rem;
    color: #27ae60;
}

.header .navbar a {
    font-size: 1.7rem;
    margin: 0 1rem;
    color: #666;
}

.header .navbar a:hover {
    color: #27ae60;
}

.header .navbar a.router-link-exact-active {
    color: #f38609;
}

.header .icons div {
    height: 5.5rem;
    width: 5.5rem;
    line-height: 5.5rem;
    font-size: 2rem;
    background: #27ae60;
    color: #130f40;
    border-radius: .5rem;
    /*margin-left: .4rem;*/
    cursor: pointer;
    text-align: center;
}

.header .icons .cart {
    color: #fff;
}

.header .icons div:hover {
    color: #fff;
    background: #f38609 !important;
}

.header .icons a.router-link-exact-active .cart {
    background: #f38609;
    color: white;
}

#menu-btn {
    display: none;
}

.header .icons .account .drop-down-select {
    display: none;
    position: absolute;
    margin-left: -50px;
    list-style-type: none;
}

.header .icons .account .drop-down-select a {
    text-decoration: none;
    color: #130f40;
    font-size: 15px;
    font-weight: 500;
    float: left;
    width: 95px;
    border-radius: 5%;

}

.header .icons .account .drop-down-select.active {
    display: block !important;
}

.header .icons .account .drop-down-select.active a {
    background-color: #f7f7f7;
}

.header .icons .account .drop-down-select.active a:hover {
    background-color: #f38609;
    color: white;
}

/* .header .icons .account:hover .drop-down-select {
    display: block;
} */

.header .icons .account:hover .drop-down-select a {
    background-color: #f7f7f7;

}

.header .icons .account:hover .drop-down-select a:hover {
    background-color: #f38609;
    color: white;
}

@media (min-width: 769px) {
    .header .icons .account:hover .drop-down-select {
        display: block;
    }
}

@media (max-width: 768px) {
    .header .navbar {
        position: absolute;
        display: flex;
        flex-wrap: wrap;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        top: 99%;
        left: 0;
        right: 0;
        background: #fff;
        border-bottom: 0.1rem solid black;
        clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
    }

    .header .navbar.active {
        margin: 0;
        padding: 0;
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
    }

    .header .navbar a {
        width: 100%;
        border-top: 1px inset black;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        padding: 2px 0px;
        margin: 0;
        font-size: 2rem;
        text-align: center;
        display: block;
    }

    #menu-btn {
        color: white;
        display: inline-block;
    }

}
</style>