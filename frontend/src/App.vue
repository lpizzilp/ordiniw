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
import { mapActions } from 'vuex';
import { mapState } from 'vuex';
export default {
    name: 'App',
    components: {
        NavBar,
        FooterComponent,
        AdminNavBar
    },

    created() {
        this.getFoodsData()
    },

    computed: {
        ...mapState(["admin"])
    },

    methods: {
        ...mapActions(["getFoodsData"])
    }
}
</script>

<style>
@import "./assets/css/global_style.css";
</style>