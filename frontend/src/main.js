import { createApp } from 'vue'
import mitt from 'mitt';
import App from './App.vue'
import router from './router'
import store from './store'
import "@/axios"

const eventBus = mitt();
createApp(App).use(router).use(store).provide('eventBus',eventBus).mount('#app')
// npm install vue-router