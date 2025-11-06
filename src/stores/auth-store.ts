import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, Circle } from '@/types'

interface AuthState {
  user: User | null
  currentCircleId: string | null
  isAuthenticated: boolean

  // Actions
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  signOut: () => void
  setCurrentCircle: (circleId: string) => void

  // Getters
  getCurrentCircle: () => Circle | undefined
}

// Mock data for development
const MOCK_USER: User = {
  id: 'user-1',
  email: 'demo@minicontratos.com',
  name: 'Demo User',
  circles: [
    { id: 'circle-1', name: 'Personal', created_at: new Date().toISOString() },
    { id: 'circle-2', name: 'Work', created_at: new Date().toISOString() },
    { id: 'circle-3', name: 'Projects', created_at: new Date().toISOString() },
  ],
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      currentCircleId: null,
      isAuthenticated: false,

      signIn: async (email, password) => {
        // Mock authentication
        await new Promise(resolve => setTimeout(resolve, 1000))

        set({
          user: MOCK_USER,
          isAuthenticated: true,
          currentCircleId: MOCK_USER.circles[0].id,
        })
      },

      signUp: async (email, password, name) => {
        // Mock registration
        await new Promise(resolve => setTimeout(resolve, 1000))

        const newUser: User = {
          ...MOCK_USER,
          email,
          name,
        }

        set({
          user: newUser,
          isAuthenticated: true,
          currentCircleId: newUser.circles[0].id,
        })
      },

      signOut: () => {
        set({
          user: null,
          currentCircleId: null,
          isAuthenticated: false,
        })
      },

      setCurrentCircle: circleId => {
        set({ currentCircleId: circleId })
      },

      getCurrentCircle: () => {
        const { user, currentCircleId } = get()
        return user?.circles.find(circle => circle.id === currentCircleId)
      },
    }),
    {
      name: 'minicontratos-auth',
    }
  )
)
