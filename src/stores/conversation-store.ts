import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Conversation, Message } from '@/types'
import { generateId } from '@/lib/utils'

interface ConversationState {
  conversations: Conversation[]
  currentConversationId: string | null

  // Actions
  createConversation: (title?: string, folderId?: string) => Conversation
  updateConversation: (id: string, updates: Partial<Conversation>) => void
  deleteConversation: (id: string) => void
  archiveConversation: (id: string) => void
  pinConversation: (id: string) => void
  setCurrentConversation: (id: string | null) => void

  // Messages
  addMessage: (conversationId: string, message: Omit<Message, 'id' | 'created_at'>) => void
  updateMessage: (conversationId: string, messageId: string, content: string) => void
  deleteMessage: (conversationId: string, messageId: string) => void

  // Getters
  getConversation: (id: string) => Conversation | undefined
  getCurrentConversation: () => Conversation | undefined
  getConversationsByFolder: (folderId: string | null) => Conversation[]
  getPinnedConversations: () => Conversation[]
  getRecentConversations: () => Conversation[]
}

export const useConversationStore = create<ConversationState>()(
  persist(
    (set, get) => ({
      conversations: [],
      currentConversationId: null,

      createConversation: (title = 'New Chat', folderId) => {
        const newConversation: Conversation = {
          id: generateId(),
          title,
          folder_id: folderId || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          pinned: false,
          archived: false,
          messages: [],
        }

        set(state => ({
          conversations: [newConversation, ...state.conversations],
          currentConversationId: newConversation.id,
        }))

        return newConversation
      },

      updateConversation: (id, updates) => {
        set(state => ({
          conversations: state.conversations.map(conv =>
            conv.id === id
              ? { ...conv, ...updates, updated_at: new Date().toISOString() }
              : conv
          ),
        }))
      },

      deleteConversation: id => {
        set(state => ({
          conversations: state.conversations.filter(conv => conv.id !== id),
          currentConversationId:
            state.currentConversationId === id ? null : state.currentConversationId,
        }))
      },

      archiveConversation: id => {
        get().updateConversation(id, { archived: true })
      },

      pinConversation: id => {
        const conversation = get().getConversation(id)
        if (conversation) {
          get().updateConversation(id, { pinned: !conversation.pinned })
        }
      },

      setCurrentConversation: id => {
        set({ currentConversationId: id })
      },

      addMessage: (conversationId, message) => {
        const newMessage: Message = {
          ...message,
          id: generateId(),
          created_at: new Date().toISOString(),
        }

        set(state => ({
          conversations: state.conversations.map(conv =>
            conv.id === conversationId
              ? {
                  ...conv,
                  messages: [...conv.messages, newMessage],
                  updated_at: new Date().toISOString(),
                }
              : conv
          ),
        }))
      },

      updateMessage: (conversationId, messageId, content) => {
        set(state => ({
          conversations: state.conversations.map(conv =>
            conv.id === conversationId
              ? {
                  ...conv,
                  messages: conv.messages.map(msg =>
                    msg.id === messageId ? { ...msg, content } : msg
                  ),
                  updated_at: new Date().toISOString(),
                }
              : conv
          ),
        }))
      },

      deleteMessage: (conversationId, messageId) => {
        set(state => ({
          conversations: state.conversations.map(conv =>
            conv.id === conversationId
              ? {
                  ...conv,
                  messages: conv.messages.filter(msg => msg.id !== messageId),
                  updated_at: new Date().toISOString(),
                }
              : conv
          ),
        }))
      },

      getConversation: id => {
        return get().conversations.find(conv => conv.id === id)
      },

      getCurrentConversation: () => {
        const { currentConversationId, conversations } = get()
        return conversations.find(conv => conv.id === currentConversationId)
      },

      getConversationsByFolder: folderId => {
        return get()
          .conversations.filter(conv => conv.folder_id === folderId && !conv.archived)
          .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      },

      getPinnedConversations: () => {
        return get()
          .conversations.filter(conv => conv.pinned && !conv.archived)
          .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      },

      getRecentConversations: () => {
        return get()
          .conversations.filter(conv => !conv.pinned && !conv.archived && !conv.folder_id)
          .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
          .slice(0, 10)
      },
    }),
    {
      name: 'minicontratos-conversations',
    }
  )
)
