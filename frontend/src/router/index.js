// Per ripristinare la history inserire "createWebHistory" al posto di "createMemoryHistory"
import { createRouter, createMemoryHistory } from "vue-router";
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
  //history: createWebHistory(),
  history: createMemoryHistory(),
  routes,
});

export default router;