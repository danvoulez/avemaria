'use client'

import * as React from 'react'
import { Conversation } from '@/types'
import { useConversationStore } from '@/stores/conversation-store'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Pin, Archive, Trash2, Edit2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/utils'
import { toast } from '@/hooks/use-toast'

interface ConversationItemProps {
  conversation: Conversation
  onSelect?: () => void
}

export function ConversationItem({ conversation, onSelect }: ConversationItemProps) {
  const currentConversationId = useConversationStore(state => state.currentConversationId)
  const setCurrentConversation = useConversationStore(state => state.setCurrentConversation)
  const pinConversation = useConversationStore(state => state.pinConversation)
  const archiveConversation = useConversationStore(state => state.archiveConversation)
  const deleteConversation = useConversationStore(state => state.deleteConversation)

  const isActive = currentConversationId === conversation.id

  const handleClick = () => {
    setCurrentConversation(conversation.id)
    onSelect?.()
  }

  const handlePin = (e: Event) => {
    e.stopPropagation()
    pinConversation(conversation.id)
    toast({
      title: conversation.pinned ? 'Unpinned' : 'Pinned',
      description: conversation.pinned
        ? 'Conversation unpinned'
        : 'Conversation pinned to top',
    })
  }

  const handleArchive = (e: Event) => {
    e.stopPropagation()
    archiveConversation(conversation.id)
    toast({
      title: 'Archived',
      description: 'Conversation archived successfully',
    })
  }

  const handleDelete = (e: Event) => {
    e.stopPropagation()
    deleteConversation(conversation.id)
    toast({
      title: 'Deleted',
      description: 'Conversation deleted successfully',
    })
  }

  return (
    <div
      onClick={handleClick}
      className={cn(
        'group relative flex items-center gap-2 rounded-lg px-3 py-2 cursor-pointer transition-colors',
        isActive
          ? 'bg-primary/10 text-primary'
          : 'hover:bg-accent text-foreground'
      )}
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{conversation.title}</p>
        <p className="text-xs text-muted-foreground">
          {formatDate(conversation.updated_at)}
        </p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={handlePin}>
            <Pin className="w-4 h-4 mr-2" />
            {conversation.pinned ? 'Unpin' : 'Pin'}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Edit2 className="w-4 h-4 mr-2" />
            Rename
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={handleArchive}>
            <Archive className="w-4 h-4 mr-2" />
            Archive
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handleDelete} className="text-destructive">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
