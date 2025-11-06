import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AIModel } from '@/types'

interface AIState {
  selectedModel: AIModel
  apiKeys: Record<string, string>
  isGenerating: boolean

  // Actions
  setSelectedModel: (model: AIModel) => void
  setApiKey: (provider: string, key: string) => void
  setIsGenerating: (generating: boolean) => void
}

export const useAIStore = create<AIState>()(
  persist(
    set => ({
      selectedModel: 'gpt-4-turbo',
      apiKeys: {},
      isGenerating: false,

      setSelectedModel: model => set({ selectedModel: model }),

      setApiKey: (provider, key) =>
        set(state => ({
          apiKeys: { ...state.apiKeys, [provider]: key },
        })),

      setIsGenerating: generating => set({ isGenerating: generating }),
    }),
    {
      name: 'minicontratos-ai',
    }
  )
)
