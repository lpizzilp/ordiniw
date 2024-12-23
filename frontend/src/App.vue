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
            <QuickViewLogin v-if="userCassa == null || userCassa == ''" /> 
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
import QuickViewLogin from './cassiere/components/QuickViewLogin.vue';
export default {
    name: 'App',

    data() {
        return {
           IsCassiere: sessionStorage.getItem('IsCassiere') != null ? sessionStorage.getItem('IsCassiere') : null,
        }
    },

    components: {
        NavBar,
        FooterComponent,
        AdminNavBar,
        CassaBarra,
        QuickViewLogin
    },

    created() {
        this.getFoodsData()
        this.getRepartiData()
        this.IsCassiere ? router.push('/cassiere/infoc') : null
    },


    computed: {
        ...mapState(["admin"]),
        ...mapState({
      userCassa: state => state.userCassa
    }),
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