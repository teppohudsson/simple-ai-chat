# AI Chat Application

A simple Next.js application for AI chat interactions using OpenRouter.ai API with multiple model support.

## Features

- 🤖 **Multiple AI Models**: Choose from GPT-5 Nano, Gemini 2.5 Flash, or Claude 4 Sonnet
- 💬 **Real-time Chat**: Send messages and receive AI responses instantly
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🌙 **Dark Mode**: Automatic dark/light theme support
- ⚡ **Fast & Lightweight**: Built with Next.js 14 and Tailwind CSS

## Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd recordly-simple-ai-chat
npm install
```

### 2. Environment Setup

Copy the environment example file and add your OpenRouter API key:

```bash
cp env.example .env.local
```

Edit `.env.local` and add your OpenRouter API key:

```env
OPENROUTER_API_KEY=your_actual_api_key_here
```

### 3. Get OpenRouter API Key

1. Visit [OpenRouter.ai](https://openrouter.ai/)
2. Sign up for an account
3. Go to your dashboard and create an API key
4. Add the key to your `.env.local` file

### 4. Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Select AI Model**: Choose from the dropdown at the top
2. **Type Message**: Enter your message in the text area
3. **Send**: Click Send or press Enter
4. **Chat**: Continue the conversation with the AI

## Available Models

- **GPT-5 Nano** (`openai/gpt-5-nano`) - OpenAI's latest nano model
- **Gemini 2.5 Flash** (`google/gemini-2.5-flash`) - Google's fast Gemini model  
- **Claude 4 Sonnet** (`anthropic/claude-4-sonnet`) - Anthropic's Claude 4 Sonnet

## Project Structure

```
src/
├── app/
│   ├── api/chat/          # API route for chat requests
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/
│   ├── ChatInterface.tsx  # Main chat component
│   ├── MessageList.tsx    # Message display
│   ├── MessageInput.tsx   # Input component
│   └── ModelSelector.tsx  # Model dropdown
└── lib/
    ├── openrouter.ts      # OpenRouter API client
    └── types.ts           # TypeScript definitions
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENROUTER_API_KEY` | Your OpenRouter API key | Yes |
| `NEXT_PUBLIC_APP_NAME` | Application name | No |
| `NEXT_PUBLIC_DEFAULT_MODEL` | Default AI model | No |
| `NEXT_PUBLIC_MAX_MESSAGES` | Max messages in history | No |

## Troubleshooting

### Common Issues

1. **"OpenRouter API key not configured"**
   - Make sure you've created `.env.local` with your API key
   - Restart the development server after adding the key

2. **"API error: 401 Unauthorized"**
   - Check that your OpenRouter API key is correct
   - Ensure you have credits in your OpenRouter account

3. **Messages not sending**
   - Check the browser console for errors
   - Verify your internet connection
   - Make sure the OpenRouter service is available

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
