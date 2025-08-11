import { defineStore } from 'pinia'
import { fetchCart, addToCart, removeFromCart, type CartItem } from '../api'
import { getSessionId } from '../session'

export const useCartStore = defineStore('cart', {
  state: () => ({
    sessionId: getSessionId() as string,
    items: [] as CartItem[],
    open: false,
    loading: false,
  }),
  getters: {
    count: (s) => s.items.reduce((n, it) => n + it.quantity, 0),
    total: (s) => s.items.reduce((sum, it) => sum + it.priceAtOrder * it.quantity, 0),
  },
  actions: {
    toggle() { this.open = !this.open },
    async load() { this.items = await fetchCart(this.sessionId) },
    async add(productId: number, quantity = 1) { await addToCart(this.sessionId, productId, quantity); await this.load() },
    async remove(itemId: number) { await removeFromCart(itemId); await this.load() },
    async clear() { for (const it of this.items) await removeFromCart(it.id); await this.load() },
  },
})
