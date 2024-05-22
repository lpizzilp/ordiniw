<template>
    <div class="header">
        <router-link @click="scrollToTop()" to="/admin/prenotazioni" class="testa"><i class="fa-solid fa-user-tie"
                style="padding-right: 2vh;"></i>Ciao {{ nav_name }}!
        </router-link>
        <button class="btn"><i class="fas fa-bars" @click="showNav()"></i>
        </button>

        <ul class="table-element">

            <li class="td-router"><router-link @click="scrollToTop(), Writelog('Dashboard')" to="/admin/dashboard"><i
                        class="fa-solid fa-chart-line" style="padding-right: 2vh;"></i>Dashboard</router-link></li>
            <li class="td-router"><router-link @click="scrollToTop(), Writelog('Utenti')" to="/admin/utenti"><i
                        class="fa-solid fa-users-between-lines" style="padding-right: 2vh;"></i>Lista
                    Utenti</router-link></li>
            <li class="td-router" onmouseover="this.style.backgroundColor='#27ae60'">
                <hr style="width: 100%; border: 2px outset whitesmoke; border-radius: 2%;">
            </li>
            <li class="td-router"><router-link @click="scrollToTop(), Writelog('Prenotazioni')"
                    to="/admin/prenotazioni"><i class="fa-solid fa-book-open"
                        style="padding-right: 2vh;"></i>Prenotazioni</router-link></li>
            <li class="td-router"><router-link @click="scrollToTop(), Writelog('Ordini')" to="/admin/ordini"><i
                        class="fa-solid fa-utensils" style="padding-right: 2vh;"></i>Ordini</router-link></li>
            <li class="td-router" onmouseover="this.style.backgroundColor='#27ae60'">
                <hr style="width: 100%; border: 2px outset whitesmoke; border-radius: 2%;">
            </li>
            <li class="td-router" v-if="nav_name === 'Amministratore'"><router-link
                    @click="scrollToTop(), Writelog('Ordini')" to="/admin/errori"><i
                        class="fa-solid fa-triangle-exclamation" style="padding-right: 2vh;"></i>Tab
                    Errori</router-link></li>
        </ul>


        <div class="icons">
            <router-link @click="setAdmin(''), Writelog('uscita')" to="/" class="link">
                <i class="fa-solid fa-right-from-bracket">Logout</i>
            </router-link>
        </div>

    </div>
    <div class="navigation">
        <ul class="table-phone">
            <li id="/admin/dashboard" @click="RouteNav('/admin/dashboard'), Writelog('Dashboard')" class="td-router">
                <router-link to="/admin/dashboard"><i class="fa-solid fa-chart-line"
                        style="padding-right: 2vh;"></i>Dashboard</router-link></li>
            <li id="/admin/prenotazioni" @click="RouteNav('/admin/prenotazioni'), Writelog('Prenotazioni')"
                class="td-router"><router-link to="/admin/prenotazioni"><i class="fa-solid fa-book-open"
                        style="padding-right: 2vh;"></i>Prenotazioni</router-link></li>
            <li id="/admin/ordini" @click="RouteNav('/admin/ordini'), Writelog('Ordini')" class="td-router"><router-link
                    to="/admin/ordini"><i class="fa-solid fa-utensils"
                        style="padding-right: 2vh;"></i>Ordini</router-link>
            </li>
            <li id="/admin/utenti" @click="RouteNav('/admin/utenti'), Writelog('Tabella utenti')" class="td-router">
                <router-link to="/admin/utenti"><i class="fa-solid fa-users-between-lines"
                        style="padding-right: 2vh;"></i>Utenti</router-link>
            </li>
            <li id="/admin/errori" @click="RouteNav('/admin/errori'), Writelog('Tabella errori')" class="td-router">
                <router-link to="/admin/errori"><i class="fa-solid fa-triangle-exclamation"
                        style="padding-right: 2vh;"></i>Tab errori</router-link>
            </li>
            <li @click="RouteNav('/'), setAdmin('')" class="td-router"><router-link to="/"><i
                        class="fa-solid fa-right-from-bracket" style="padding-right: 2vh;"></i>Logout</router-link></li>
        </ul>
    </div>
</template>

<script>
import router from "@/router";
import axios from "axios";
import { mapMutations } from "vuex";
export default {
    name: 'NavBar',

    data() {
        return {
            nav_name: 'Amministratore',
            route: '',
        }
    },

    created() {
        this.getName()
    },

    methods: {
        ...mapMutations(["setAdmin"]),

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
            let user = ''
            user = (await axios.get('/users/' + sessionStorage.getItem('Admin'))).data.user_name.split(' ')
            this.nav_name = user[0]
        },

        showNav() {
            let nav = document.getElementsByClassName('navigation')
            if (nav[0].style.display == 'none' || nav[0].style.display == "") {
                nav[0].style.display = 'block'
                this.route = router.currentRoute.value.path
                if (this.route == '/admin/dashboard' || this.route == '/admin/utenti' || this.route == '/admin/errori') {
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
            this.showNav();
        },

    }
}
</script>

<style scoped>
.header {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 20%;
    background: #27ae60;
    display: flex;
    flex-direction: column;
    padding: 2em 2em;
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
    background-color: #f38609;
}

.header .table-element .td-router a {
    font-size: 1.85rem;
    color: #ffffff;
}

.header .table-element a.router-link-exact-active {
    color: #0015ff;
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
    font-size: 1.7rem;
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
        -webkit-box-shadow: -1px 30px 44px -11px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: -1px 30px 44px -11px rgba(0, 0, 0, 0.75);
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