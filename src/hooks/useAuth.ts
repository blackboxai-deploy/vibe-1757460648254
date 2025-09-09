'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '@/lib/types'

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  login: (user: User, token: string) => void
  logout: () => void
  updateUser: (user: Partial<User>) => void
  isAuthenticated: () => boolean
  hasRole: (role: User['role']) => boolean
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      
      login: (user: User, token: string) => {
        set({ user, token, isLoading: false })
      },
      
      logout: () => {
        set({ user: null, token: null, isLoading: false })
      },
      
      updateUser: (updates: Partial<User>) => {
        const { user } = get()
        if (user) {
          set({ user: { ...user, ...updates } })
        }
      },
      
      isAuthenticated: () => {
        const { user, token } = get()
        return !!user && !!token
      },
      
      hasRole: (role: User['role']) => {
        const { user } = get()
        return user?.role === role
      }
    }),
    {
      name: 'freshfetch-auth'
    }
  )
)