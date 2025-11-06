export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  created_at: string
}

export interface Conversation {
  id: string
  title: string
  folder_id: string | null
  created_at: string
  updated_at: string
  pinned: boolean
  archived: boolean
  messages: Message[]
}

export interface Folder {
  id: string
  name: string
  color: string
  created_at: string
}

export interface Template {
  id: string
  title: string
  content: string
  created_at: string
}

export interface Circle {
  id: string
  name: string
  created_at: string
}

export interface User {
  id: string
  email: string
  name: string
  circles: Circle[]
}

export type AIModel =
  | 'gpt-4-turbo'
  | 'gpt-3.5-turbo'
  | 'claude-3-opus'
  | 'claude-3-sonnet'
  | 'gemini-pro'
  | 'grok-beta'
  | 'mixtral-8x7b'

export interface AIModelConfig {
  id: AIModel
  name: string
  provider: 'openai' | 'anthropic' | 'google' | 'xai' | 'groq'
  contextWindow: number
}

export const AI_MODELS: AIModelConfig[] = [
  { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', provider: 'openai', contextWindow: 128000 },
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'openai', contextWindow: 16000 },
  { id: 'claude-3-opus', name: 'Claude 3 Opus', provider: 'anthropic', contextWindow: 200000 },
  { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet', provider: 'anthropic', contextWindow: 200000 },
  { id: 'gemini-pro', name: 'Gemini Pro', provider: 'google', contextWindow: 32000 },
  { id: 'grok-beta', name: 'Grok Beta', provider: 'xai', contextWindow: 8000 },
  { id: 'mixtral-8x7b', name: 'Mixtral 8x7B', provider: 'groq', contextWindow: 32000 },
]
