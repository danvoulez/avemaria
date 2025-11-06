'use client'

import { motion } from 'framer-motion'
import { Message } from '@/types'
import { MessageItem } from './message-item'

interface MessageListProps {
  messages: Message[]
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {messages.map((message, index) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <MessageItem message={message} />
        </motion.div>
      ))}
    </div>
  )
}
