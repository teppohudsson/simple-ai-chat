# AI Chat Application Specification

## Project Overview
A simple Next.js application for AI chat interactions using OpenRouter.ai API with multiple model support.

## Core Requirements

### 1. Authentication & Session Management
- **No authentication required** - application is completely open
- **No user sessions** - each conversation is stateless
- **No user accounts** - no registration or login functionality

### 2. User Interface
- **Text Input Field**: Primary input for user messages
- **Chat Messages Display**: Scrolling view showing conversation history
- **Model Selection Dropdown**: Choose between available AI models
- **Send Button**: Submit messages to selected AI model

### 3. AI Model Integration
- **OpenRouter.ai API Integration**: Primary API provider
- **Supported Models**:
  - `openai/gpt-5-nano` (preferred model)
  - `google/gemini-2.5-flash`
  - `anthropic/claude-4-sonnet`

### 4. Technical Stack
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **API**: OpenRouter.ai REST API
- **State Management**: React hooks (useState, useEffect)

## Application Architecture

### 1. File Structure
```
/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main chat page
│   └── globals.css         # Global styles
├── components/
│   ├── ChatInterface.tsx   # Main chat component
│   ├── MessageList.tsx     # Message display component
│   ├── MessageInput.tsx    # Input component
│   └── ModelSelector.tsx   # Model dropdown component
├── lib/
│   ├── openrouter.ts       # API client
│   └── types.ts            # TypeScript definitions
├── public/                 # Static assets
├── package.json
├── tailwind.config.js
└── next.config.js
```

### 2. Component Architecture
- **ChatInterface**: Main container managing state and API calls
- **MessageList**: Displays conversation history with auto-scroll
- **MessageInput**: Handles text input and message submission
- **ModelSelector**: Dropdown for AI model selection

### 3. State Management
- **Messages**: Array of message objects (user/AI pairs)
- **Selected Model**: Currently selected AI model
- **Loading State**: API request status
- **Input Value**: Current text input content

## API Integration

### 1. OpenRouter.ai Configuration
- **Endpoint**: `https://openrouter.ai/api/v1/chat/completions`
- **Authentication**: API key via environment variable
- **Request Format**: Standard OpenAI-compatible format
- **Response Handling**: Stream or batch responses

### 2. Message Format
```typescript
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  model?: string;
}
```

### 3. API Request Structure
```typescript
interface ChatRequest {
  model: string;
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
  stream?: boolean;
}
```

## User Experience

### 1. Chat Flow
1. User selects AI model from dropdown
2. User types message in input field
3. User clicks send or presses Enter
4. Message appears in chat history
5. Loading indicator shows while AI processes
6. AI response appears in chat history
7. Chat auto-scrolls to latest message

### 2. Visual Design
- **Clean, minimal interface**
- **Responsive design** for mobile and desktop
- **Dark/light theme support** (optional)
- **Smooth animations** for message appearance
- **Loading states** with visual feedback

### 3. Error Handling
- **API errors**: Display user-friendly error messages
- **Network issues**: Retry mechanism with user notification
- **Invalid responses**: Graceful fallback handling

## Technical Requirements

### 1. Performance
- **Fast initial load** with Next.js optimization
- **Efficient re-renders** with proper React patterns
- **Optimized API calls** with request deduplication
- **Smooth scrolling** with virtual scrolling if needed

### 2. Accessibility
- **Keyboard navigation** support
- **Screen reader** compatibility
- **Focus management** for form inputs
- **ARIA labels** for interactive elements

### 3. Browser Support
- **Modern browsers** (Chrome, Firefox, Safari, Edge)
- **Mobile responsive** design
- **Progressive enhancement** approach

## Environment Configuration

### 1. Required Environment Variables
```env
OPENROUTER_API_KEY=your_api_key_here
NEXT_PUBLIC_APP_NAME=AI Chat
```

### 2. Optional Configuration
```env
NEXT_PUBLIC_DEFAULT_MODEL=openai/gpt-5-nano
NEXT_PUBLIC_MAX_MESSAGES=100
```

## Development Phases

### Phase 1: Core Setup
- [ ] Next.js project initialization
- [ ] Tailwind CSS configuration
- [ ] Basic component structure
- [ ] TypeScript setup

### Phase 2: UI Components
- [ ] ChatInterface component
- [ ] MessageList component
- [ ] MessageInput component
- [ ] ModelSelector component

### Phase 3: API Integration
- [ ] OpenRouter.ai client setup
- [ ] Message sending functionality
- [ ] Response handling
- [ ] Error management

### Phase 4: Polish & Testing
- [ ] Styling and animations
- [ ] Error handling improvements
- [ ] Performance optimization
- [ ] Cross-browser testing

## Success Criteria
- ✅ Users can select from 3 AI models
- ✅ Messages send and receive successfully
- ✅ Chat history displays correctly with scrolling
- ✅ Application works without authentication
- ✅ Clean, responsive user interface
- ✅ Proper error handling and loading states
