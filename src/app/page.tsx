'use client'

import { useAuthStore } from '@/stores/auth-store'
import { AuthPage } from '@/components/auth/auth-page'
import { ChatPage } from '@/components/chat/chat-page'

export default function Home() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)

  if (!isAuthenticated) {
    return <AuthPage />
  }

  return <ChatPage />
}
