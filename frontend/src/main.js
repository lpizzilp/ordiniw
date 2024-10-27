import { createApp } from 'vue'
import mitt from 'mitt';
import App from './App.vue'
import router from './router'
import store from './store'
import "@/axios"
<<<<<<< HEAD
const currentVersion = '1.7.5'; // Versione corrente impostata durante il deploy
=======
const currentVersion = '1.7.4'; // Versione corrente impostata durante il deploy
>>>>>>> origin/main
const eventBus = mitt();

//controllo di versione 
const savedVersion = localStorage.getItem('appVersion');
if (savedVersion !== currentVersion) {
    localStorage.setItem('appVersion', currentVersion);
    location.reload(true);
}



//create vue 
createApp(App)
    .use(router)
    .use(store)
    .provide('eventBus', eventBus)
    .mount('#app')
// npm install vue-router
