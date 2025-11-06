'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/auth-store'
import { Circle, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export function CircleSelector() {
  const user = useAuthStore(state => state.user)
  const currentCircleId = useAuthStore(state => state.currentCircleId)
  const setCurrentCircle = useAuthStore(state => state.setCurrentCircle)
  const [selectedId, setSelectedId] = React.useState(currentCircleId)
  const [isConfirming, setIsConfirming] = React.useState(false)

  if (!user) return null

  const handleConfirm = () => {
    if (selectedId) {
      setIsConfirming(true)
      setTimeout(() => {
        setCurrentCircle(selectedId)
      }, 300)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-card p-8 rounded-2xl shadow-lg border"
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Select a Workspace</h2>
          <p className="text-sm text-muted-foreground">
            Choose which workspace you'd like to use
          </p>
        </div>

        <div className="space-y-3 mb-6">
          {user.circles.map((circle, index) => (
            <motion.button
              key={circle.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedId(circle.id)}
              className={cn(
                'w-full p-4 rounded-lg border-2 transition-all text-left flex items-center justify-between',
                selectedId === circle.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              )}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Circle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{circle.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Workspace
                  </p>
                </div>
              </div>
              {selectedId === circle.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                >
                  <Check className="w-4 h-4 text-primary-foreground" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        <Button
          onClick={handleConfirm}
          disabled={!selectedId || isConfirming}
          className="w-full"
        >
          Continue
        </Button>
      </motion.div>
    </div>
  )
}
