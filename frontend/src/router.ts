import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Checkout from './pages/Checkout.vue'
import Success from './pages/Success.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/checkout', name: 'checkout', component: Checkout },
    { path: '/success', name: 'success', component: Success },
  ],
})
