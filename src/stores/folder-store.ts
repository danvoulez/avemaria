import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Folder } from '@/types'
import { generateId } from '@/lib/utils'

const FOLDER_COLORS = [
  '#22C55E', // green
  '#3B82F6', // blue
  '#F59E0B', // yellow
  '#EF4444', // red
  '#8B5CF6', // purple
  '#EC4899', // pink
  '#14B8A6', // teal
  '#F97316', // orange
]

interface FolderState {
  folders: Folder[]

  // Actions
  createFolder: (name: string, color?: string) => Folder
  updateFolder: (id: string, updates: Partial<Folder>) => void
  deleteFolder: (id: string) => void

  // Getters
  getFolder: (id: string) => Folder | undefined
  getFolderColor: (index: number) => string
}

export const useFolderStore = create<FolderState>()(
  persist(
    (set, get) => ({
      folders: [],

      createFolder: (name, color) => {
        const newFolder: Folder = {
          id: generateId(),
          name,
          color: color || FOLDER_COLORS[get().folders.length % FOLDER_COLORS.length],
          created_at: new Date().toISOString(),
        }

        set(state => ({
          folders: [...state.folders, newFolder],
        }))

        return newFolder
      },

      updateFolder: (id, updates) => {
        set(state => ({
          folders: state.folders.map(folder =>
            folder.id === id ? { ...folder, ...updates } : folder
          ),
        }))
      },

      deleteFolder: id => {
        set(state => ({
          folders: state.folders.filter(folder => folder.id !== id),
        }))
      },

      getFolder: id => {
        return get().folders.find(folder => folder.id === id)
      },

      getFolderColor: index => {
        return FOLDER_COLORS[index % FOLDER_COLORS.length]
      },
    }),
    {
      name: 'minicontratos-folders',
    }
  )
)
