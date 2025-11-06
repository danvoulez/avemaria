'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useConversationStore } from '@/stores/conversation-store'
import { useAIStore } from '@/stores/ai-store'
import { Send, Square, Loader2, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from '@/hooks/use-toast'

export function Composer() {
  const [input, setInput] = React.useState('')
  const [isComposing, setIsComposing] = React.useState(false)
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const currentConversationId = useConversationStore(state => state.currentConversationId)
  const createConversation = useConversationStore(state => state.createConversation)
  const addMessage = useConversationStore(state => state.addMessage)
  const isGenerating = useAIStore(state => state.isGenerating)
  const setIsGenerating = useAIStore(state => state.setIsGenerating)
  const selectedModel = useAIStore(state => state.selectedModel)

  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
    }
  }, [input])

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()

    if (!input.trim() || isGenerating) return

    const messageContent = input.trim()
    setInput('')

    let conversationId = currentConversationId

    // Create new conversation if none exists
    if (!conversationId) {
      const newConv = createConversation(
        messageContent.slice(0, 50) + (messageContent.length > 50 ? '...' : '')
      )
      conversationId = newConv.id
    }

    // Add user message
    addMessage(conversationId, {
      role: 'user',
      content: messageContent,
    })

    // Simulate AI response
    setIsGenerating(true)

    try {
      // Simulate thinking time
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mock AI response
      const aiResponse = `This is a mock response from ${selectedModel}. In a production environment, this would call the actual AI API.\n\nYou said: "${messageContent}"\n\nHere's a helpful response with some features:\n- Markdown support\n- Code syntax highlighting\n- Multiple paragraphs\n\nExample code:\n\`\`\`javascript\nconst greeting = "Hello, World!";\nconsole.log(greeting);\n\`\`\`\n\nThis demonstrates the chat functionality!`

      addMessage(conversationId, {
        role: 'assistant',
        content: aiResponse,
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to get AI response',
        variant: 'destructive',
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleStop = () => {
    setIsGenerating(false)
    toast({ title: 'Generation stopped' })
  }

  return (
    <div className="p-4 max-w-4xl mx-auto w-full">
      <form onSubmit={handleSubmit} className="relative">
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          placeholder="Type a message... (Shift+Enter for new line)"
          className={cn(
            'min-h-[60px] max-h-[200px] pr-12 resize-none',
            'focus-visible:ring-2 focus-visible:ring-primary'
          )}
          disabled={isGenerating}
        />

        <div className="absolute right-2 bottom-2">
          {isGenerating ? (
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={handleStop}
              className="h-8 w-8"
            >
              <Square className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim()}
              className="h-8 w-8"
            >
              {input.trim() ? (
                <Send className="w-4 h-4" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
            </Button>
          )}
        </div>
      </form>

      {isGenerating && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mt-3 text-sm text-muted-foreground"
        >
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Thinking...</span>
        </motion.div>
      )}

      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
        <span>Shift+Enter for new line</span>
        <span className="font-medium text-primary">{selectedModel}</span>
      </div>
    </div>
  )
}
