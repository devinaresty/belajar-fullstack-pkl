<template>
  <header class="header">
    <div
      class="container"
      style="display:flex; align-items:center; gap:16px; justify-content:space-between;"
    >
      <div style="display:flex; align-items:center; gap:8px;">
        <img
          src="/logo(2).png"
          alt="logo"
          width="32"
          height="32"
          style="border-radius:9999px; object-fit:cover;"
        />
        <strong>Fashion Store</strong>
      </div>

      <div
        class="container"
        style="max-width:480px; position:relative; flex:1;"
      >
        <svg
          style="position:absolute; left:10px; top:50%; transform:translateY(-50%); width:18px; height:18px; color:#f472b6;"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M10 4a6 6 0 104.472 10.03l4.249 4.248 1.414-1.414-4.248-4.249A6 6 0 0010 4z"
          />
        </svg>
        <input class="input" type="text" placeholder="Search" />
      </div>

      <button
        class="btn"
        style="background:#f472b6; position:relative; display:grid; place-items:center; width:40px; height:40px; border-radius:9999px;"
        @click="$emit('toggle-cart')"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="#fff">
          <path
            d="M7 4h-2l-1 2v2h2l3.6 7.59L8 18a2 2 0 104 0h4a2 2 0 104 0h-1a1 1 0 01-1-1l1-7H7.42l-.94-2H20V6H6.42l-.72-1.45A1 1 0 004.76 4H3"
          />
        </svg>
        <span class="badge">{{ count }}</span>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{ count: number }>()
defineEmits<{ (e: 'toggle-cart'): void }>()
</script>
