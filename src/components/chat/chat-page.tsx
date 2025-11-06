'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sidebar } from '@/components/sidebar/sidebar'
import { ChatArea } from './chat-area'
import { useConversationStore } from '@/stores/conversation-store'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = React.useState(true)
  const [isMobile, setIsMobile] = React.useState(false)
  const currentConversation = useConversationStore(state => state.getCurrentConversation())

  React.useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (mobile) {
        setSidebarOpen(false)
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobile && sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.div
            initial={isMobile ? { x: -280 } : { width: 0, opacity: 0 }}
            animate={isMobile ? { x: 0 } : { width: 280, opacity: 1 }}
            exit={isMobile ? { x: -280 } : { width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'border-r bg-card',
              isMobile ? 'fixed inset-y-0 left-0 z-50 w-[280px]' : 'relative'
            )}
          >
            <Sidebar onClose={isMobile ? () => setSidebarOpen(false) : undefined} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="h-14 border-b flex items-center justify-between px-4 bg-card/50 backdrop-blur">
          <div className="flex items-center gap-3">
            {!sidebarOpen && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
              >
                <Menu className="w-5 h-5" />
              </Button>
            )}
            <h2 className="font-semibold truncate">
              {currentConversation?.title || 'New Chat'}
            </h2>
          </div>
        </div>

        {/* Chat Area */}
        <ChatArea />
      </div>
    </div>
  )
}
