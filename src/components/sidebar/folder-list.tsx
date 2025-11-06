'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { useFolderStore } from '@/stores/folder-store'
import { useConversationStore } from '@/stores/conversation-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Folder, Plus, ChevronRight, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ConversationItem } from './conversation-item'
import { toast } from '@/hooks/use-toast'

interface FolderListProps {
  onSelectConversation?: () => void
}

export function FolderList({ onSelectConversation }: FolderListProps) {
  const folders = useFolderStore(state => state.folders)
  const createFolder = useFolderStore(state => state.createFolder)
  const getConversationsByFolder = useConversationStore(state => state.getConversationsByFolder)

  const [expandedFolders, setExpandedFolders] = React.useState<Set<string>>(new Set())
  const [createDialogOpen, setCreateDialogOpen] = React.useState(false)
  const [newFolderName, setNewFolderName] = React.useState('')

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => {
      const next = new Set(prev)
      if (next.has(folderId)) {
        next.delete(folderId)
      } else {
        next.add(folderId)
      }
      return next
    })
  }

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) return

    createFolder(newFolderName)
    toast({
      title: 'Folder created',
      description: `"${newFolderName}" has been created`,
    })
    setNewFolderName('')
    setCreateDialogOpen(false)
  }

  if (folders.length === 0) {
    return null
  }

  return (
    <>
      <div className="space-y-2">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <Folder className="w-3.5 h-3.5 text-muted-foreground" />
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Folders
            </h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCreateDialogOpen(true)}
            className="h-6 w-6"
          >
            <Plus className="w-3.5 h-3.5" />
          </Button>
        </div>

        <div className="space-y-1">
          {folders.map((folder, index) => {
            const conversations = getConversationsByFolder(folder.id)
            const isExpanded = expandedFolders.has(folder.id)

            return (
              <motion.div
                key={folder.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <button
                  onClick={() => toggleFolder(folder.id)}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent transition-colors text-left"
                >
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                  <div
                    className="w-3 h-3 rounded"
                    style={{ backgroundColor: folder.color }}
                  />
                  <span className="text-sm font-medium flex-1 truncate">
                    {folder.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {conversations.length}
                  </span>
                </button>

                {isExpanded && conversations.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="ml-6 mt-1 space-y-1"
                  >
                    {conversations.map(conversation => (
                      <ConversationItem
                        key={conversation.id}
                        conversation={conversation}
                        onSelect={onSelectConversation}
                      />
                    ))}
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Folder</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Folder name"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateFolder} disabled={!newFolderName.trim()}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
