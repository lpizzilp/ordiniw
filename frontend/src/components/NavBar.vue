<template>
    <div class="header">
        <router-link @click="scrollToTop()" to="/" class="logo"><img src="../assets/images/taco-logo.png" alt="" />
            {{ nav_name }}
        </router-link>

        <nav class="navbar">
            <router-link @click="scrollToTop()" to="/">home</router-link>
            <!--<router-link @click="scrollToTop()" to="/menu">menu</router-link>
            <router-link @click="scrollToTop()" to="/table">table</router-link>
            <router-link @click="scrollToTop()" to="/promotions">Serate speciali</router-link>
            <router-link @click="scrollToTop()" to="/login">login</router-link>-->
        </nav>

        <div class="icons">
            <!--<div id="menu-btn" class="fas fa-bars menu-btn" @click="showNav"></div>-->
            <router-link @click="scrollToTop()" to="cart">
                <div class="fas fa-shopping-cart cart"></div>
            </router-link>
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

import { mapState, mapMutations } from "vuex";
import axios from "axios";
export default {
    name: 'NavBar',
    data() {
        return {
            nav_name: 'Home ordini',
            sagra_name: ''
        }
    },

    computed: {
        ...mapState(["user"])
    },

    created() {
        this.getsagra();
    },

    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    unmounted() {
        window.removeEventListener('scroll', this.handleScroll);
    },

    methods: {
        ...mapMutations(["setUser"]),

        scrollToTop() {
            window.scrollTo(0, 0);
        },

        async getsagra() {
            if (!sessionStorage.getItem('Siglanav')) {
                var sagra = await axios.get('/sagra/' + parametriObj.id)
                if (sagra.data.length == 0) {
                    sessionStorage.setItem('SagraButt', 0)
                } else {
                    this.nav_name = sagra.data[0].descrizione
                    this.sagra_name = "" + sagra.data[0].note + " " + sagra.data[0].descrizione
                    sessionStorage.setItem('Siglanav', this.nav_name)
                    sessionStorage.setItem('SiglaHome', this.sagra_name)
                    if (sagra.data[0].flgTavoli == 1 || sagra.data[0].flgTavoli == 1) {
                        var ordini = 1
                    }
                    const flgdata = ordini + '/' + sagra.data[0].flgTavoli + '/' + sagra.data[0].flgAsporto + '/' + sagra.data[0].flgPrenotazioni + '/' + sagra.data[0].flgEliminacode
                    sessionStorage.setItem('SagraButt', flgdata)
                    console.log(flgdata)
                    if (history.replaceState) {
                        var nuovoURL = window.location.pathname + window.location.hash;
                        history.replaceState({}, document.title, nuovoURL);
                    }
                }
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

        handleLogout: function () {
            this.setUser("");
        }
    }
}
</script>

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
    background: #f7f7f7;
    color: #130f40;
    border-radius: .5rem;
    margin-left: .4rem;
    cursor: pointer;
    text-align: center;
}

.header .icons div:hover {
    color: #fff;
    background: #27ae60 !important;
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
        top: 99%;
        left: 0;
        right: 0;
        background: #fff;
        border-top: 0.1rem solid rgba(0, 0, 0, 0.2);
        border-bottom: 0.1rem solid rgba(0, 0, 0, 0.2);
        clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
    }

    .header .navbar.active {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
    }

    .header .navbar a {
        font-size: 2rem;
        margin: 2rem;
        display: block;
    }

    #menu-btn {
        display: inline-block;
    }

}

@media (max-width: 576px) {
    .header .navbar a {
        font-size: 1.5rem;
        margin: 0;
    }
}
</style>