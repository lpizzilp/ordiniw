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
            <li class="td-router"><router-link @click="scrollToTop(), Writelog('Prenotazioni')" to="/admin/prenotazioni"><i
                        class="fa-solid fa-book-open" style="padding-right: 2vh;"></i>Prenotazioni</router-link></li>
            <li class="td-router"><router-link @click="scrollToTop(), Writelog('Ordini')" to="/admin/ordini"><i class="fa-solid fa-utensils"
                        style="padding-right: 2vh;"></i>Ordini</router-link></li>
        </ul>


        <div class="icons">
            <router-link @click="setAdmin(''), Writelog('uscita')" to="/" class="link">
                <i class="fa-solid fa-right-from-bracket">Logout</i>
            </router-link>
        </div>

    </div>
    <div class="navigation">
        <ul class="table-phone">
            <li @click="SpaceNav('Dashboard'), Writelog('Dashboard')" class="td-router"><router-link @click="scrollToTop()"
                    to="/admin/dashboard"><i class="fa-solid fa-chart-line"
                        style="padding-right: 2vh;"></i>Dashboard</router-link></li>
            <li @click="SpaceNav(''), Writelog('Prenotazioni')" class="td-router"><router-link @click="scrollToTop()" to="/admin/prenotazioni"><i
                        class="fa-solid fa-book-open" style="padding-right: 2vh;"></i>Prenotazioni</router-link></li>
            <li @click="SpaceNav(''), Writelog('Ordini')" class="td-router"><router-link @click="scrollToTop()" to="/admin/ordini"><i
                        class="fa-solid fa-utensils" style="padding-right: 2vh;"></i>Ordini</router-link></li>
            <li class="td-router"><router-link @click="setAdmin(''), Writelog('uscita')" to="/"><i class="fa-solid fa-right-from-bracket"
                        style="padding-right: 2vh;"></i>Logout</router-link></li>
        </ul>
    </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";
export default {
    name: 'NavBar',

    data() {
        return {
            nav_name: 'Amministratore',
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

      async  Writelog(pagina) {
            let data = {
                mode: 'info',
                arg: pagina == 'uscita' ? 'Uscita di ' + sessionStorage.getItem('Admin') + '\n' : 'Accesso a ' + pagina + ' di ' +  sessionStorage.getItem('Admin')
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
            if (nav[0].style.display == 'none') {
                nav[0].style.display = 'block'
            } else {
                nav[0].style.display = 'none'
            }

        },

        SpaceNav(type) {
            let nav = document.getElementsByClassName('navigation')
            console.log(nav[0].style.margintop)
            if (type == 'Dashboard') {
                nav[0].style.marginTop = '70px'
            } else {
                nav[0].style.marginTop = '0px'
            }

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
        background-color: #ffffff;
    }

    .navigation .table-phone {
        list-style-type: none;
        color: black;
        font-size: 2rem;
    }

    .navigation .table-phone li {
        padding: 1rem 10rem;
        color: black;
        border: 2px inset black;
        border-radius: 5px;
    }

    .navigation .table-phone a {
        color: black;
    }

    .table-phone a:hover {
        color: #f38609;
    }

    .table-phone a.router-link-exact-active {
        color: #0015ff;
    }
}
</style>