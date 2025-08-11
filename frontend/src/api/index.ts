import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
})

export interface Product {
  id: number
  name: string
  price: number
  imageUrl: string  // presigned dari backend
}
export interface CartItem {
  id: number
  sessionId: string
  productId: number
  quantity: number
  priceAtOrder: number
}

export function fetchProducts(): Promise<Product[]> {
  return api.get('/products').then(r => r.data)
}
export function fetchCart(sessionId: string): Promise<CartItem[]> {
  return api.get('/cart', { params: { sessionId } }).then(r => r.data)
}
export function addToCart(sessionId: string, productId: number, quantity = 1) {
  return api.post('/cart', { sessionId, productId, quantity }).then(r => r.data)
}
export function removeFromCart(itemId: number) {
  return api.delete(`/cart/${itemId}`).then(r => r.data)
}
