import { createRouter,createWebHistory } from "vue-router";
import Register from '../admin/login/Register.vue';
import Home from '../pages/Home.vue';
import Menu from '../pages/Menu.vue';
import Table from '../pages/Table.vue';
import Cart from '../pages/Cart.vue';
import Checkout from '../pages/Checkout.vue';
import Thank from '../pages/Thank.vue';
import MyOrder from '../pages/MyOrder.vue';
import Admin from '../admin/login/Login.vue';
import Dashboard from '../admin/pages/Dashboard.vue';
import Ordini from '../admin/pages/Ordini.vue';
import Prenotazioni from '../admin/pages/Prenotazioni.vue'
import Confirm from '../admin/login/Confirm.vue';
import Segnalazione from '../pages/Segnalazione.vue'


const routes = [
  {
    path: "/",
    name: "Home",
    component: Home, 
  },
  {
    path: "/menu",
    name: "Menu",
    component: Menu,
  },
  {
    path: "/table",
    name: "Table",
    component: Table,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
  },
  {
    path: "/thank",
    name: "Thank",
    component: Thank,
  },
  {
    path: "/myorder",
    name: "MyOrder",
    component: MyOrder,
  },
  {
    path: "/segnalazioni",
    name: "Segnalazioni",
    component: Segnalazione,
  },
  {
    path: "/login",
    name: "Admin",
    component: Admin,
  },
  {
    path: "/admin/confirm",
    name: "Confirm",
    component: Confirm,
  },
  {
    path: "/admin/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/admin/ordini",
    name: "Ordini",
    component: Ordini,
  },
  {
    path: "/admin/prenotazioni",
    name: "Prenotaizoni",
    component: Prenotazioni,
  },
  {
    path: '/:pathMatch(.*)*',
    component: Home,
    // https://stackoverflow.com/questions/68504803/how-can-i-make-a-catch-all-other-route-in-vue-router-also-catch-the-url-when-p
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((to, from) => {
  window.dispatchEvent(new Event('routeChanged'));
  window.addEventListener('popstate', function(event) {
    event.preventDefault
    switch ( from.fullPath ) {
      case '/':
        router.removeRoute('Home');
        break;
      case '/thank':
        this.history.state.current = '/';
        router.push('/');
        break;
      case '/checkout': 
        // this.history.state.current = '/thank'
        // router.push('/thank')
        this.history.state.current = '/'
        router.push('/')
        break
      case '/login':
        this.history.state.current = '/admin/prenotazioni'
        router.push('/admin/prenotazioni')
        break;
      default:
        this.history.state.current = event.state.current
        router.push(event.state.current)
    } 

    this.scrollTo(0, 0)
  });
});

export default router;