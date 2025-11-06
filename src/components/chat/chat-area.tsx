'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useConversationStore } from '@/stores/conversation-store'
import { MessageList } from './message-list'
import { Composer } from './composer'
import { EmptyState } from './empty-state'
import { ScrollArea } from '@/components/ui/scroll-area'

export function ChatArea() {
  const currentConversation = useConversationStore(state => state.getCurrentConversation())
  const scrollRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [currentConversation?.messages])

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Messages */}
      <ScrollArea className="flex-1">
        <div ref={scrollRef} className="min-h-full flex flex-col">
          <AnimatePresence mode="wait">
            {!currentConversation || currentConversation.messages.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex items-center justify-center"
              >
                <EmptyState />
              </motion.div>
            ) : (
              <motion.div
                key="messages"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 p-4"
              >
                <MessageList messages={currentConversation.messages} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ScrollArea>

      {/* Composer */}
      <div className="border-t bg-card/50 backdrop-blur">
        <Composer />
      </div>
    </div>
  )
}
