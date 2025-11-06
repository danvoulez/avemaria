'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useConversationStore } from '@/stores/conversation-store'
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Search, MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/utils'

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = React.useState('')
  const conversations = useConversationStore(state => state.conversations)
  const setCurrentConversation = useConversationStore(state => state.setCurrentConversation)

  const filteredConversations = React.useMemo(() => {
    if (!query.trim()) return []

    const lowerQuery = query.toLowerCase()
    return conversations.filter(conv =>
      conv.title.toLowerCase().includes(lowerQuery) ||
      conv.messages.some(msg =>
        msg.content.toLowerCase().includes(lowerQuery)
      )
    ).slice(0, 10)
  }, [query, conversations])

  const handleSelectConversation = (id: string) => {
    setCurrentConversation(id)
    onOpenChange(false)
    setQuery('')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl p-0 gap-0">
        <div className="flex items-center border-b px-4 py-3">
          <Search className="w-4 h-4 text-muted-foreground mr-2" />
          <Input
            placeholder="Search conversations..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            autoFocus
          />
        </div>

        <ScrollArea className="h-[400px]">
          <div className="p-2">
            <AnimatePresence mode="wait">
              {query.trim() === '' ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12"
                >
                  <Search className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <p className="text-sm text-muted-foreground">
                    Start typing to search conversations
                  </p>
                </motion.div>
              ) : filteredConversations.length === 0 ? (
                <motion.div
                  key="no-results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12"
                >
                  <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <p className="text-sm text-muted-foreground">
                    No conversations found
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-1"
                >
                  {filteredConversations.map((conversation, index) => (
                    <motion.button
                      key={conversation.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleSelectConversation(conversation.id)}
                      className="w-full text-left p-3 rounded-lg hover:bg-accent transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="font-medium text-sm truncate flex-1">
                          {conversation.title}
                        </p>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatDate(conversation.updated_at)}
                        </span>
                      </div>
                      {conversation.messages.length > 0 && (
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {conversation.messages[conversation.messages.length - 1].content}
                        </p>
                      )}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollArea>

        {filteredConversations.length > 0 && (
          <div className="border-t px-4 py-2 bg-muted/50">
            <p className="text-xs text-muted-foreground">
              {filteredConversations.length} result{filteredConversations.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
