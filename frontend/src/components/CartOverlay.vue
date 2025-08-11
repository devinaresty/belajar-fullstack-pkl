<template>
  <div
    v-if="open"
    style="position:fixed; top:72px; right:16px; width:360px; background:#fff; border-radius:16px; box-shadow:0 10px 30px rgba(0,0,0,.12); z-index:50;"
  >
    <div
      style="padding:16px; border-bottom:1px solid #eee; color:#be185d; font-weight:700;"
    >
      Keranjang Belanja
    </div>

    <div style="max-height:320px; overflow:auto;">
      <div
        v-for="it in cart.items"
        :key="it.id"
        style="display:flex; gap:8px; justify-content:space-between; align-items:center; padding:12px 16px; border-bottom:1px solid #f5f5f5;"
      >
        <div style="flex:1;">
          <div style="font-weight:600;">#{{ it.productId }}</div>
          <div style="font-size:12px; color:#666;">Qty {{ it.quantity }}</div>
        </div>

        <div>
          Rp {{ (it.priceAtOrder * it.quantity).toLocaleString('id-ID') }}
        </div>

        <button
          class="btn"
          style="background:#fecaca; color:#b91c1c;"
          @click="remove(it.id)"
        >
          ×
        </button>
      </div>
    </div>

    <div
      style="padding:16px; display:flex; justify-content:space-between; align-items:center;"
    >
      <strong>Total</strong>
      <strong>Rp {{ cart.total.toLocaleString('id-ID') }}</strong>
    </div>

    <div style="padding:16px;">
      <button class="btn" style="width:100%;" @click="goCheckout">
        Checkout
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useCartStore } from '../stores/cart'
import { useRouter } from 'vue-router'

const props = defineProps<{ open: boolean }>()
const cart = useCartStore()
const router = useRouter()

const open = computed(() => props.open)

onMounted(() => cart.load())

async function remove(id: number) {
  await cart.remove(id)
}

function goCheckout() {
  router.push({ name: 'checkout' })
}
</script>
