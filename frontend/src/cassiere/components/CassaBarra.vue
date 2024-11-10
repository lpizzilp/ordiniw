<template>
    <div v-if="!PannelAction" class="close-button" ref="RefCassaOpen" @click="TooglePannel()"><i class="fa-solid fa-chevron-left"></i>
    </div>
    <div v-else ref="RefCassaClose" class="open-button" @click="TooglePannel()" style="width: fit-content;"><i
            class="fa-solid fa-chevron-right"></i></div>
    <div class="header">
        <router-link @click="scrollToTop()" to="/cassiere/prenotazioni" class="testa"><i
                class="fa-solid fa-cash-register" style="padding-right: 2vh;"></i>Ciao {{ nav_name }}!
        </router-link>
        <button class="btn"><i class="fas fa-bars" @click="showNav()"></i>
        </button>

        <ul class="table-element">

            <li class="td-router"><router-link @click="scrollToTop(), Writelog('Cashboard')" to="/cassiere/cashboard"><i
                        class="fa-solid fa-chart-line" style="padding-right: 2vh;"></i>Cashboard</router-link></li>
            <li class="td-router" onmouseover="this.style.backgroundColor='#273dae'">
                <hr style="width: 100%; border: 2px outset white; border-radius: 10px;">
            </li>
            <li class="td-router"><router-link @click="scrollToTop(), Writelog('Ordini')" to="/cassiere/ordini"><i
                        class="fa-solid fa-utensils" style="padding-right: 2vh;"></i>Casse</router-link></li>
            <li class="td-router" onmouseover="this.style.backgroundColor='#273dae'">
                <hr style="width: 100%; border: 2px outset white; border-radius: 10px;">
            </li>
            <li class="td-router"><router-link @click="scrollToTop(), Writelog('Utenti')" to="/cassiere/utenti"><i
                        class="fa-solid fa-user-lock" style="padding-right: 2vh;"></i>Cambio Utente</router-link></li>
            <li class="td-router"><router-link @click="scrollToTop(), Writelog('Utenti')" to="/cassiere/utenti"><i
                        class="fa-solid fa-users-between-lines" style="padding-right: 2vh;"></i>Lista
                    Utenti</router-link></li>
        </ul>


        <div class="icons">
            <router-link @click="setAdmin(''), Writelog('uscita')" to="/" class="link">
                <i class="fa-solid fa-right-from-bracket"> Chiudi Cassa</i>
            </router-link>
        </div>

    </div>
    <div class="navigation">
        <ul class="table-phone">
            <li id="/cassiere/cashboard" @click="RouteNav('/cassiere/cashboard'), Writelog('Cashboard')"
                class="td-router">
                <router-link to="/cassiere/cashboard"><i class="fa-solid fa-chart-line"
                        style="padding-right: 2vh;"></i>Cashboard</router-link>
            </li>
            <li id="/cassiere/ordini" @click="RouteNav('/cassiere/ordini'), Writelog('Ordini')" class="td-router">
                <router-link to="/cassiere/ordini"><i class="fa-solid fa-utensils"
                        style="padding-right: 2vh;"></i>Ordini</router-link>
            </li>
            <li id="/cassiere/utenti" @click="RouteNav('/cassiere/utenti'), Writelog('Tabella utenti')"
                class="td-router">
                <router-link to="/cassiere/utenti"><i class="fa-solid fa-users-between-lines"
                        style="padding-right: 2vh;"></i>Utenti</router-link>
            </li>
            <li @click="RouteNav('/')" class="td-router"><router-link to="/"><i class="fa-solid fa-right-from-bracket"
                        style="padding-right: 2vh;"></i>Chiudi Cassa</router-link></li>
        </ul>
    </div>
</template>

<script>
import router from "@/router";
import axios from "axios";
import { nextTick } from "vue";
import { mapMutations } from "vuex";
export default {
    name: 'NavBar',

    data() {
        return {
            nav_name: 'Amministratore',
            PannelAction: false,
            route: '',
        }
    },

    created() {
        this.getName()
    },

    methods: {
        ...mapMutations(["setAdmin"]),
        ...mapMutations(["setCassaBarraWidth"]),

        scrollToTop() {
            window.scrollTo(0, 0);
        },

        async Writelog(pagina) {
            let data = {
                mode: 'info',
                arg: pagina == 'uscita' ? 'Uscita di ' + sessionStorage.getItem('User') + '\n' : 'Accesso a ' + pagina + ' di ' + sessionStorage.getItem('User')
            }
            await axios.post('/log', data)
        },

        async getName() {
            /* let user = ''
             user = (await axios.get('/users/' + sessionStorage.getItem('SagraId') +'/'+ sessionStorage.getItem('Admin'))).data.user_name.split(' ')
             this.nav_name = user[0]*/
        },

        async TooglePannel() {
            this.PannelAction = !this.PannelAction
            this.PannelAction ? document.getElementsByClassName('header')[0].style.display = 'none' : document.getElementsByClassName('header')[0].style.display = 'flex'
            this.updateWidth()
        },

        async updateWidth() {
            await nextTick(); // Aspetta che il DOM sia aggiornato
            var width = this.PannelAction ? this.$refs.RefCassaClose.offsetWidth : this.$refs.RefCassaOpen.offsetWidth
            
            this.setCassaBarraWidth(width); // Aggiorna la larghezza nello store
        },

        showNav() {
            let nav = document.getElementsByClassName('navigation')
            if (nav[0].style.display == 'none' || nav[0].style.display == "") {
                nav[0].style.display = 'block'
                this.route = router.currentRoute.value.path
                if (this.route == '/cassiere/cashboard' || this.route == '/cassiere/utenti' || this.route == '/cassiere/errori') {
                    nav[0].style.background = 'white'
                    nav[0].style.marginTop = '70px'
                } else {
                    nav[0].style.background = '#fcfcfc'
                    nav[0].style.marginTop = '0px'
                }
            } else {
                nav[0].style.display = 'none'
            }
        },


        RouteNav(type) {
            router.push(type)
            this.showNav()
        },

    }
}
</script>

<style scoped>
.open-button,
.close-button {
    position: fixed;
    z-index: 998;
    top: 0;
    left: 0;
    width: 20%;
    height: fit-content;
    background: #273dae;

    display: block;
    text-align: right;
    padding: 10px 10px;
    color: white;
    font-size: 3rem;
    box-shadow: 18px 0px 70px -37px rgba(0, 0, 0, 0.75);
}

.header {
    position: fixed;
    z-index: 999;
    top: 0;
    bottom: 0;
    left: 0;
    width: 17%;
    background: #273dae;
    display: flex;
    flex-direction: column;
    padding: 2em 2em;
    box-shadow: 18px 0px 70px -37px rgba(0, 0, 0, 0.75);
}

.header .testa {
    text-align: left;
    font-size: 2rem;
    font-weight: bolder;
    color: white;
    background-color: transparent;
}

.header .table-element {
    margin: 1.5em 1em;
    list-style-type: none;
}

.header .table-element .td-router {
    padding: 0.25em 0.5em;
    border-radius: 10px;
}

.header .table-element .td-router:hover {
    background-color: #27ae60;
}

.header .table-element .td-router a {
    font-size: 1.85rem;
    color: #ffffff;
}

.header .table-element a.router-link-exact-active {
    color: #f38609;
}

.header .icons {
    position: absolute;
    bottom: 0%;
    left: 0%;
    padding: 2em 2em;
    width: 100%;
}


.header .icons .link {
    display: block;
    width: 100%;
    font-size: 1.5rem;
    background: #fff;
    color: #130f40;
    border-radius: 10px;
    padding: 1rem;
    cursor: pointer;
    text-align: center;
}

.header .icons .link:hover {
    color: #fff;
    background: #f38609 !important;
}

.btn {
    display: none;
}

@media (min-width: 985px) {
    .header .icons .account:hover .drop-down-select {
        display: block;
    }
}

@media (max-width: 983px) {
    .header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 70px;
        background: #27ae60;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 2em 2em;
        box-shadow: 0px 20px 30px -23px rgba(0, 0, 0, 0.75);
    }

    .table-element {
        display: none;
    }

    .header .icons {
        display: none;
    }

    .btn {
        display: block;
        background-color: #ffffff;
        color: black;
    }

    .navigation {
        display: none;
        position: absolute;
        z-index: 99;
        width: 100%;
        background-color: #fff;
        border-bottom: 1px solid black;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        box-shadow: -1px 30px 44px -11px rgba(0, 0, 0, 0.75);

    }

    .navigation .table-phone {
        list-style-type: none;
        color: black;
        font-size: 2rem;
    }

    .navigation .table-phone li {
        padding: 1rem 10rem;
        color: black;
        border-top: 2px inset black;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }

    .navigation .table-phone a {
        color: black;
    }

    .table-phone a:hover {
        background-color: antiquewhite;
        color: #f38609;
    }

    .table-phone a.router-link-exact-active {
        color: #0015ff;
    }
}
</style>