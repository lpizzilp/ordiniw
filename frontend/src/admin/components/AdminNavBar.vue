<template>
    <div class="header">
        <router-link @click="scrollToTop()" to="admin/dashboard" class="testa"><i class="fa-solid fa-user-tie"
                style="padding-right: 2vh;"></i>Ciao Amministratore!
        </router-link>

        <ul class="table-element">
            <li class="td-router"><router-link @click="scrollToTop()" to="/admin/dashboard"><i
                        class="fa-solid fa-chart-line" style="padding-right: 2vh;"></i>Dashboard</router-link></li>
            <li class="td-router"><router-link @click="scrollToTop()" to="/admin/ordini"><i class="fa-solid fa-utensils"
                        style="padding-right: 2vh;"></i>Ordini</router-link></li>
            <li class="td-router"><router-link @click="scrollToTop()" to="/admin/prenotazioni"><i
                        class="fa-solid fa-book-open" style="padding-right: 2vh;"></i>Prenotazioni</router-link></li>
        </ul>


        <div class="icons">
            <!-- <div id="menu-btn" class="fas fa-bars menu-btn" @click="showNav"></div>-->
            <router-link @click="setAdmin('')" to="/" class="link">
                <i class="fa-solid fa-right-from-bracket">Logout</i>
            </router-link>
        </div>

    </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
    name: 'NavBar',
    data() {
        return {
            nav_name: 'Home ordini',
            sagra_name: '',
            info: '',
            numcoda: '',
        }
    },


    methods: {
        ...mapMutations(["setAdmin"]),

        scrollToTop() {
            window.scrollTo(0, 0);
        },

        showNav: function () {
            let navbar = document.querySelector('.header .navbar');
            navbar.classList.toggle('active');
        },

    }
}
</script>

<style scoped>
.header {
    position: absolute;
    top: 0;
    left: 0;
    width: 20%;
    height: 100%;
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

#menu-btn {
    display: none;
}

@media (min-width: 769px) {
    .header .icons .account:hover .drop-down-select {
        display: block;
    }
}

@media (max-width: 768px) {
    /* .header .navbar {
        position: absolute;
        top: 99%;
        left: 0;
        right: 0;
        background: #fff;
        border-top: 0.1rem solid rgba(0, 0, 0, 0.2);
        border-bottom: 0.1rem solid rgba(0, 0, 0, 0.2);
        clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
    }
*/

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