'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { useTemplateStore } from '@/stores/template-store'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { FileText, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from '@/hooks/use-toast'

export function TemplateList() {
  const templates = useTemplateStore(state => state.templates)
  const [open, setOpen] = React.useState(false)

  const handleUseTemplate = (content: string) => {
    // In a real app, this would insert the template content into the composer
    navigator.clipboard.writeText(content)
    toast({
      title: 'Template copied',
      description: 'Template content copied to clipboard',
    })
    setOpen(false)
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <FileText className="w-3.5 h-3.5 text-muted-foreground" />
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Templates
          </h3>
        </div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Plus className="w-3.5 h-3.5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="start">
            <div className="space-y-2">
              <h4 className="font-medium text-sm mb-3">Quick Templates</h4>
              {templates.map((template, index) => (
                <motion.button
                  key={template.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleUseTemplate(template.content)}
                  className="w-full text-left p-3 rounded-lg border hover:border-primary/50 hover:bg-accent transition-colors"
                >
                  <p className="font-medium text-sm mb-1">{template.title}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {template.content}
                  </p>
                </motion.button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="text-center py-4">
        <p className="text-xs text-muted-foreground">
          {templates.length} template{templates.length !== 1 ? 's' : ''} available
        </p>
      </div>
    </div>
  )
}
