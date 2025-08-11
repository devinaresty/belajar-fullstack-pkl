<template>
  <div class="card" style="display:flex; flex-direction:column;">
    <img
      :src="product.imageUrl"
      alt=""
      style="width:100%; height:160px; object-fit:cover;"
    />

    <div style="padding:12px 16px;">
      <div style="font-weight:600; margin-bottom:4px;">
        {{ product.name }}
      </div>

      <div style="color:#e11d48; margin-bottom:8px;">
        Rp {{ product.price.toLocaleString('id-ID') }}
      </div>

      <button class="btn" @click="$emit('buy', product.id)">
        Beli
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '../api'

defineProps<{ product: Product }>()
defineEmits<{ (e: 'buy', productId: number): void }>()
</script>
