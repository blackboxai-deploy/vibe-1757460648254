'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Product } from '@/lib/types'

interface CartState {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  getDeliveryFee: () => number
  getVAT: () => number
  getFinalTotal: () => number
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product: Product, quantity: number = 1) => {
        const { items } = get()
        const existingItem = items.find(item => item.product._id === product._id)
        
        if (existingItem) {
          set({
            items: items.map(item =>
              item.product._id === product._id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          })
        } else {
          set({ items: [...items, { product, quantity }] })
        }
      },
      
      removeItem: (productId: string) => {
        const { items } = get()
        set({ items: items.filter(item => item.product._id !== productId) })
      },
      
      updateQuantity: (productId: string, quantity: number) => {
        const { items } = get()
        if (quantity <= 0) {
          set({ items: items.filter(item => item.product._id !== productId) })
        } else {
          set({
            items: items.map(item =>
              item.product._id === productId
                ? { ...item, quantity }
                : item
            )
          })
        }
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotalItems: () => {
        const { items } = get()
        return items.reduce((total, item) => total + item.quantity, 0)
      },
      
      getTotalPrice: () => {
        const { items } = get()
        return items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
      },
      
      getDeliveryFee: () => {
        const { items } = get()
        // Get delivery fee from the first store (assuming single store orders for now)
        if (items.length === 0) return 0
        return 1800 // R18.00 base delivery fee in cents
      },
      
      getVAT: () => {
        const { items } = get()
        return items.reduce((total, item) => {
          const itemTotal = item.product.price * item.quantity
          return total + (itemTotal * item.product.vatRate)
        }, 0)
      },
      
      getFinalTotal: () => {
        const { getTotalPrice, getDeliveryFee, getVAT } = get()
        return getTotalPrice() + getDeliveryFee() + getVAT()
      }
    }),
    {
      name: 'freshfetch-cart'
    }
  )
)