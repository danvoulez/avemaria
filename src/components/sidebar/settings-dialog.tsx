'use client'

import * as React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useAIStore } from '@/stores/ai-store'
import { AI_MODELS } from '@/types'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from '@/hooks/use-toast'

interface SettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const selectedModel = useAIStore(state => state.selectedModel)
  const setSelectedModel = useAIStore(state => state.setSelectedModel)
  const apiKeys = useAIStore(state => state.apiKeys)
  const setApiKey = useAIStore(state => state.setApiKey)

  const [tempApiKeys, setTempApiKeys] = React.useState<Record<string, string>>({})

  React.useEffect(() => {
    if (open) {
      setTempApiKeys(apiKeys)
    }
  }, [open, apiKeys])

  const handleSave = () => {
    Object.entries(tempApiKeys).forEach(([provider, key]) => {
      setApiKey(provider, key)
    })
    toast({
      title: 'Settings saved',
      description: 'Your settings have been updated',
    })
    onOpenChange(false)
  }

  const providers = Array.from(new Set(AI_MODELS.map(m => m.provider)))

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-6">
            {/* Model Selection */}
            <div>
              <h3 className="font-medium mb-3">AI Model</h3>
              <div className="grid gap-2">
                {AI_MODELS.map(model => (
                  <button
                    key={model.id}
                    onClick={() => setSelectedModel(model.id)}
                    className={cn(
                      'flex items-center justify-between p-3 rounded-lg border-2 transition-all text-left',
                      selectedModel === model.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    )}
                  >
                    <div>
                      <p className="font-medium text-sm">{model.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {model.provider} • {(model.contextWindow / 1000).toFixed(0)}k context
                      </p>
                    </div>
                    {selectedModel === model.id && (
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary-foreground" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* API Keys */}
            <div>
              <h3 className="font-medium mb-3">API Keys</h3>
              <div className="space-y-3">
                {providers.map(provider => (
                  <div key={provider}>
                    <label className="text-sm font-medium mb-2 block capitalize">
                      {provider}
                    </label>
                    <Input
                      type="password"
                      placeholder={`Enter ${provider} API key`}
                      value={tempApiKeys[provider] || ''}
                      onChange={(e) =>
                        setTempApiKeys(prev => ({
                          ...prev,
                          [provider]: e.target.value,
                        }))
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* About */}
            <div>
              <h3 className="font-medium mb-3">About</h3>
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-sm mb-2">
                  <strong>Minicontratos</strong> v1.0.0
                </p>
                <p className="text-xs text-muted-foreground">
                  Multi-model AI chat platform with advanced conversation management
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
