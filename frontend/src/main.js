import { createApp } from 'vue'
import mitt from 'mitt';
import App from './App.vue'
import router from './router'
import store from './store'
import "@/axios"

const currentVersion = '2.1.0'; // Versione con ordinamento reparti
const eventBus = mitt();

//controllo di versione 
const savedVersion = localStorage.getItem('appVersion');
if (savedVersion !== currentVersion) {
    localStorage.setItem('appVersion', currentVersion);
    location.reload(true);
}

// Id sagra param
const queryString = window.location.search.substring(1);
const parametriObj = Object.fromEntries(new URLSearchParams(queryString));
    parametriObj.id != null ? sessionStorage.setItem('SagraId', parametriObj.id) : null
    parametriObj.IsCass != null ? sessionStorage.setItem('IsCassiere', true) : null

//create vue 
createApp(App)
    .use(router)
    .use(store)
    .provide('eventBus', eventBus)
    .mount('#app')
// npm install vue-router
