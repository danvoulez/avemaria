'use client'

import { motion } from 'framer-motion'
import { Sparkles, Zap, MessageSquare, Folder } from 'lucide-react'

const features = [
  {
    icon: Sparkles,
    title: 'Multiple AI Models',
    description: 'Access GPT-4, Claude, Gemini, and more'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Real-time streaming responses'
  },
  {
    icon: MessageSquare,
    title: 'Smart Templates',
    description: 'Reusable prompts for common tasks'
  },
  {
    icon: Folder,
    title: 'Organized',
    description: 'Keep your chats in folders'
  }
]

export function EmptyState() {
  return (
    <div className="max-w-2xl mx-auto p-8 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-6"
      >
        <Sparkles className="w-10 h-10 text-primary" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl font-bold mb-3"
      >
        Welcome to Minicontratos
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-muted-foreground mb-8"
      >
        Your intelligent AI assistant for productivity
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 gap-4 max-w-xl mx-auto"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="p-4 rounded-lg border bg-card hover:border-primary/50 transition-colors"
          >
            <feature.icon className="w-6 h-6 text-primary mb-2 mx-auto" />
            <h3 className="font-medium text-sm mb-1">{feature.title}</h3>
            <p className="text-xs text-muted-foreground">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-sm text-muted-foreground mt-8"
      >
        Start a conversation by typing a message below
      </motion.p>
    </div>
  )
}
