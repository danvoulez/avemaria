import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Template } from '@/types'
import { generateId } from '@/lib/utils'

interface TemplateState {
  templates: Template[]

  // Actions
  createTemplate: (title: string, content: string) => Template
  updateTemplate: (id: string, updates: Partial<Template>) => void
  deleteTemplate: (id: string) => void

  // Getters
  getTemplate: (id: string) => Template | undefined
}

export const useTemplateStore = create<TemplateState>()(
  persist(
    (set, get) => ({
      templates: [
        {
          id: 'default-1',
          title: 'Code Review',
          content: 'Please review this code and provide feedback on:\n- Code quality\n- Best practices\n- Performance optimizations\n- Security concerns',
          created_at: new Date().toISOString(),
        },
        {
          id: 'default-2',
          title: 'Bug Report',
          content: 'I encountered a bug:\n\nSteps to reproduce:\n1. \n\nExpected behavior:\n\nActual behavior:\n\nEnvironment:',
          created_at: new Date().toISOString(),
        },
        {
          id: 'default-3',
          title: 'Feature Request',
          content: 'Feature description:\n\nUse case:\n\nExpected functionality:\n\nAdditional context:',
          created_at: new Date().toISOString(),
        },
      ],

      createTemplate: (title, content) => {
        const newTemplate: Template = {
          id: generateId(),
          title,
          content,
          created_at: new Date().toISOString(),
        }

        set(state => ({
          templates: [...state.templates, newTemplate],
        }))

        return newTemplate
      },

      updateTemplate: (id, updates) => {
        set(state => ({
          templates: state.templates.map(template =>
            template.id === id ? { ...template, ...updates } : template
          ),
        }))
      },

      deleteTemplate: id => {
        set(state => ({
          templates: state.templates.filter(template => template.id !== id),
        }))
      },

      getTemplate: id => {
        return get().templates.find(template => template.id === id)
      },
    }),
    {
      name: 'minicontratos-templates',
    }
  )
)
