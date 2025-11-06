'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { useConversationStore } from '@/stores/conversation-store'
import { ConversationItem } from './conversation-item'
import { MessageSquare, Pin } from 'lucide-react'

interface ConversationListProps {
  onSelectConversation?: () => void
}

export function ConversationList({ onSelectConversation }: ConversationListProps) {
  const pinnedConversations = useConversationStore(state => state.getPinnedConversations())
  const recentConversations = useConversationStore(state => state.getRecentConversations())

  if (pinnedConversations.length === 0 && recentConversations.length === 0) {
    return (
      <div className="text-center py-8">
        <MessageSquare className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">No conversations yet</p>
        <p className="text-xs text-muted-foreground mt-1">Start a new chat to get started</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Pinned */}
      {pinnedConversations.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2 px-2">
            <Pin className="w-3.5 h-3.5 text-muted-foreground" />
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Pinned
            </h3>
          </div>
          <div className="space-y-1">
            {pinnedConversations.map((conversation, index) => (
              <motion.div
                key={conversation.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ConversationItem
                  conversation={conversation}
                  onSelect={onSelectConversation}
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Recent */}
      {recentConversations.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2 px-2">
            <MessageSquare className="w-3.5 h-3.5 text-muted-foreground" />
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Recent
            </h3>
          </div>
          <div className="space-y-1">
            {recentConversations.map((conversation, index) => (
              <motion.div
                key={conversation.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ConversationItem
                  conversation={conversation}
                  onSelect={onSelectConversation}
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
