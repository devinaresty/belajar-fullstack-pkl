<template>
  <HeaderBar :count="cart.count" @toggle-cart="cart.toggle" />
  <main class="container" style="padding:16px;">
    <ProductGrid />
  </main>
  <CartOverlay :open="cart.open" />
</template>

<script setup lang="ts">
import HeaderBar from '../components/HeaderBar.vue'
import ProductGrid from '../components/ProductGrid.vue'
import CartOverlay from '../components/CartOverlay.vue'
import { useCartStore } from '../stores/cart'

const cart = useCartStore()
</script>
