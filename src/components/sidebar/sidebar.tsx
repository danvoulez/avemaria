'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Plus,
  Search,
  Settings,
  Moon,
  Sun,
  LogOut,
  X,
  Sparkles,
} from 'lucide-react'
import { useThemeStore } from '@/stores/theme-store'
import { useAuthStore } from '@/stores/auth-store'
import { useConversationStore } from '@/stores/conversation-store'
import { ConversationList } from './conversation-list'
import { FolderList } from './folder-list'
import { TemplateList } from './template-list'
import { SearchDialog } from './search-dialog'
import { SettingsDialog } from './settings-dialog'
import { cn } from '@/lib/utils'

interface SidebarProps {
  onClose?: () => void
}

export function Sidebar({ onClose }: SidebarProps) {
  const [searchOpen, setSearchOpen] = React.useState(false)
  const [settingsOpen, setSettingsOpen] = React.useState(false)

  const theme = useThemeStore(state => state.theme)
  const setTheme = useThemeStore(state => state.setTheme)
  const signOut = useAuthStore(state => state.signOut)
  const user = useAuthStore(state => state.user)
  const currentCircle = useAuthStore(state => state.getCurrentCircle())
  const createConversation = useConversationStore(state => state.createConversation)

  const handleNewChat = React.useCallback(() => {
    createConversation()
    onClose?.()
  }, [createConversation, onClose])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const handleSignOut = () => {
    signOut()
  }

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
        e.preventDefault()
        handleNewChat()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleNewChat])

  return (
    <>
      <div className="h-full flex flex-col bg-card">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-sm truncate">Minicontratos</h2>
                <p className="text-xs text-muted-foreground truncate">
                  {currentCircle?.name}
                </p>
              </div>
            </div>
            {onClose && (
              <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div className="space-y-2">
            <Button
              onClick={handleNewChat}
              className="w-full justify-start"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Chat
            </Button>

            <Button
              onClick={() => setSearchOpen(true)}
              variant="outline"
              className="w-full justify-between"
              size="sm"
            >
              <div className="flex items-center">
                <Search className="w-4 h-4 mr-2" />
                Search
              </div>
              <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
          </div>
        </div>

        {/* Content */}
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-6">
            <ConversationList onSelectConversation={onClose} />
            <FolderList onSelectConversation={onClose} />
            <TemplateList />
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="p-4 border-t space-y-2">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="flex-1"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setSettingsOpen(true)}
              className="flex-1"
            >
              <Settings className="w-4 h-4" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="flex-1"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2 px-2">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs font-semibold text-primary-foreground">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">{user?.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </>
  )
}
