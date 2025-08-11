<template>
  <HeaderBar :count="cart.count" @toggle-cart="cart.toggle" />
  <main class="container" style="padding:24px;">
    <div class="card" style="max-width:560px; margin:40px auto;">
      <div style="padding:16px; border-bottom:1px solid #eee; font-weight:700;">Konfirmasi Checkout</div>
      <div style="padding:16px; max-height:300px; overflow:auto;">
        <div v-for="it in cart.items" :key="it.id" style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #f5f5f5;">
          <div>#{{ it.productId }} × {{ it.quantity }}</div>
          <div>Rp {{ (it.priceAtOrder * it.quantity).toLocaleString('id-ID') }}</div>
        </div>
      </div>
      <div style="padding:16px; display:flex; justify-content:space-between; align-items:center;">
        <strong>Total</strong>
        <strong>Rp {{ cart.total.toLocaleString('id-ID') }}</strong>
      </div>
      <div style="padding:16px;">
        <button class="btn" style="width:100%;" :disabled="loading" @click="confirm">
          {{ loading ? 'Memproses…' : 'Konfirmasi' }}
        </button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import HeaderBar from '../components/HeaderBar.vue'
import { useCartStore } from '../stores/cart'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const cart = useCartStore()
const router = useRouter()
const loading = ref(false)

onMounted(() => cart.load())

async function confirm() {
  loading.value = true
  // cache total & count dulu (kalau clear duluan, nilainya 0)
  const total = cart.total
  const count = cart.count
  await cart.clear()        // kosongkan cart di backend biar sinkron
  loading.value = false
  router.push({ name: 'success', query: { total, count } })
}
</script>
