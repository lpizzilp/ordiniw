// Per eliminare la history inserire "createMemoryHistory" al posto di "createWebHistory"
import { createRouter,createWebHistory } from "vue-router";
import Register from '../admin/login/Register.vue';
import Home from '../pages/Home.vue';
import Eliminacode from '../pages/Eliminacode.vue';
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


const routes = [
  {
    path: "/",
    name: "Home",
    component: Home, 
  },

  {
    path: "/eliminacode",
    name: "Eliminacode",
    component: Eliminacode,
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
  //history: createMemoryHistory(),
  routes,
});

router.afterEach((to, from) => {
  window.dispatchEvent(new Event('routeChanged'));
  window.addEventListener('popstate', function(event) {
    event.preventDefault
    if (from.fullPath == '/thank') {
      this.history.state.current = '/'
      router.push('/')
    } else if (from.fullPath == '/checkout') {
      this.history.state.current = '/thank'
      router.push('/thank')
    } else if (from.fullPath == '/login') {
      this.history.state.current = '/admin/prenotazioni'
      router.push('/admin/prenotazioni')
    } else {
      this.history.state.current = event.state.current
      router.push(event.state.current)
    }
    this.scrollTo(0, 0)
  });
});

export default router;