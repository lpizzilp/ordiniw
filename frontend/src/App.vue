<template>
    <div id="app">
        <div v-if="admin">
            <AdminNavBar/>
            
            <div class="auth-wrapper">
                <div class="auth-inner">
                    <router-view></router-view>
                </div>
            </div>
        </div>
        <div v-else-if="IsCassiere">
            <CassaBarra/>
            
            <div class="auth-wrapper">
                <div class="auth-inner">
                    <router-view></router-view>
                </div>
            </div>
        </div>
        <div v-else>
            <NavBar />

            <div class="auth-wrapper">
                <div class="auth-inner">
                    <router-view></router-view>
                </div>
            </div>
            <FooterComponent />
        </div>
    </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import FooterComponent from './components/FooterComponent.vue';
import AdminNavBar from './admin/components/AdminNavBar.vue';
import CassaBarra from './cassiere/components/CassaBarra.vue';
import { mapActions } from 'vuex';
import { mapState } from 'vuex';
import router from './router';
export default {
    name: 'App',

    data() {
        return {
           IsCassiere: sessionStorage.getItem('IsCassiere')
        }
    },

    components: {
        NavBar,
        FooterComponent,
        AdminNavBar,
        CassaBarra,
    },

    created() {
        this.getFoodsData()
        this.getRepartiData()
        this.IsCassiere ? router.push('/cassiere/cashboard') : null
    },

    computed: {
        ...mapState(["admin"])
    },

    methods: {
        ...mapActions(["getFoodsData"]),
        ...mapActions(["getRepartiData"])
    }
}
</script>

<style>
@import "./assets/css/global_style.css";
</style>