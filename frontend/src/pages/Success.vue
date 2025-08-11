<template>
  <HeaderBar :count="0" @toggle-cart="() => {}" />
  <main class="container" style="padding:40px; display:grid; place-items:center;">
    <div class="card" style="max-width:520px; width:100%; text-align:center; padding:32px;">
      <div style="font-size:48px; color:#22c55e;">✓</div>
      <h2 style="margin:8px 0 16px;">Payment Success</h2>
      <p style="color:#666; margin-bottom:16px;">Terima kasih! Pesananmu sedang diproses.</p>
      <div v-if="total && count" style="margin-bottom:16px;">
        <strong>{{ count }} item</strong> — Total <strong>Rp {{ Number(total).toLocaleString('id-ID') }}</strong>
      </div>
      <button class="btn" @click="$router.push({ name: 'home' })">Lihat Produk</button>
    </div>
  </main>
</template>

<script setup lang="ts">
import HeaderBar from '../components/HeaderBar.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const total = route.query.total as string | undefined
const count = route.query.count as string | undefined
</script>
