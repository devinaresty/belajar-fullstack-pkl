<template>
  <div class="grid-products">
    <ProductCard
      v-for="p in products"
      :key="p.id"
      :product="p"
      @buy="onBuy"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fetchProducts, type Product } from '../api'
import { useCartStore } from '../stores/cart'
import ProductCard from './ProductCard.vue'

const products = ref<Product[]>([])
const cart = useCartStore()

onMounted(async () => {
  products.value = await fetchProducts()
})

async function onBuy(productId: number) {
  await cart.add(productId, 1)
}
</script>
