# Minicontratos - AI Chat Platform

A premium multi-model AI chat platform with advanced conversation management, built with Next.js 15, React 19, and Tailwind CSS.

## Features

- 🤖 **Multiple AI Models** - Support for GPT-4, Claude, Gemini, Grok, and more
- 💬 **Smart Conversations** - Create, organize, pin, and archive conversations
- 📁 **Folder Organization** - Keep your chats organized with color-coded folders
- 📝 **Templates** - Reusable prompts for common tasks
- 🔍 **Global Search** - Quick search across all conversations (⌘K)
- 🎨 **Dark/Light Mode** - Beautiful themes with smooth transitions
- ⚡ **Real-time Streaming** - Fast AI responses with streaming support
- 📱 **PWA Support** - Install as a native app on any device
- ⌨️ **Keyboard Shortcuts** - Productivity-focused shortcuts
- 🎭 **Framer Motion** - Smooth animations throughout

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **UI Library:** React 19
- **Styling:** Tailwind CSS + shadcn/ui
- **State Management:** Zustand
- **Animations:** Framer Motion
- **AI Integration:** Vercel AI SDK
- **Markdown:** react-markdown + remark-gfm
- **Code Highlighting:** react-syntax-highlighter

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd avemaria
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file:
```env
# Add your API keys here
OPENAI_API_KEY=your_key
ANTHROPIC_API_KEY=your_key
GOOGLE_API_KEY=your_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Keyboard Shortcuts

- **⌘K** or **Ctrl+K** - Open search
- **⌘N** or **Ctrl+N** - New chat
- **Shift+Enter** - New line in composer
- **Enter** - Send message
- **Esc** - Close dialogs

## Project Structure

```
src/
├── app/                 # Next.js app router
├── components/          # React components
│   ├── auth/           # Authentication components
│   ├── chat/           # Chat interface components
│   ├── sidebar/        # Sidebar components
│   └── ui/             # shadcn/ui components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── stores/             # Zustand stores
├── styles/             # Global styles
└── types/              # TypeScript types
```

## Features in Detail

### Authentication
- Sign in / Sign up with email and password
- Multiple workspaces (Circles) support
- Persistent sessions

### Conversations
- Create unlimited conversations
- Pin important chats
- Archive old conversations
- Delete conversations with confirmation
- Auto-save all messages

### Folders
- Create color-coded folders
- Organize conversations by project/topic
- Expandable/collapsible folder view
- Conversation count per folder

### Templates
- Pre-built templates for common tasks
- Quick insert into composer
- Create custom templates
- Template library

### AI Models
- GPT-4 Turbo (OpenAI)
- GPT-3.5 Turbo (OpenAI)
- Claude 3 Opus (Anthropic)
- Claude 3 Sonnet (Anthropic)
- Gemini Pro (Google)
- Grok Beta (xAI)
- Mixtral 8x7B (Groq)

### Search
- Search across all conversations
- Real-time results
- Message preview
- Quick navigation

## Performance

The app is optimized for performance with:
- Code splitting
- Lazy loading
- Optimistic updates
- Virtual scrolling (planned)
- Service worker caching

## Future Roadmap

- [ ] Real AI integration with streaming
- [ ] Voice input/output
- [ ] Image generation
- [ ] Document upload and analysis
- [ ] Collaboration features
- [ ] Export conversations
- [ ] Mobile app (React Native)
- [ ] Analytics dashboard
- [ ] Custom AI model training

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Author

Built with ❤️ for the Minicontratos community