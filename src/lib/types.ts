export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  model?: string;
}

export interface ChatRequest {
  model: string;
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
  stream?: boolean;
}

export interface ChatResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: 'assistant';
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface StreamingChunk {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    delta: {
      role?: 'assistant';
      content?: string;
    };
    finish_reason?: string;
  }>;
}

export interface AIModel {
  id: string;
  name: string;
  description: string;
}

export const AVAILABLE_MODELS: AIModel[] = [
  {
    id: 'openai/gpt-4.1-mini',
    name: 'GPT-4.1 Mini',
    description: 'OpenAI fast model'
  },
  {
    id: 'google/gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    description: 'Google\'s fast Gemini model'
  },
  {
    id: 'anthropic/claude-sonnet-4',
    name: 'Claude 4 Sonnet',
    description: 'Anthropic\'s Claude 4 Sonnet'
  }
];
