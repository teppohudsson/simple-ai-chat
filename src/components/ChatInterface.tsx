'use client'

import { useState, useCallback } from 'react'
import { flushSync } from 'react-dom'
import { Message, AVAILABLE_MODELS } from '@/lib/types'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import ModelSelector from './ModelSelector'

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [selectedModel, setSelectedModel] = useState(AVAILABLE_MODELS[0].id)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [streamingMessageId, setStreamingMessageId] = useState<string | undefined>(undefined)

  const generateId = () => Math.random().toString(36).substr(2, 9)

  const handleSendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setError(null)

    // Create a placeholder for the assistant's streaming response
    const assistantMessageId = generateId()
    const assistantMessage: Message = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      model: selectedModel,
    }

    setMessages(prev => [...prev, assistantMessage])
    setStreamingMessageId(assistantMessageId)

    try {
      // Use fetch with streaming for better control
      const response = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: [...messages, userMessage].map(msg => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      // Check if streaming is supported
      if (!response.body) {
        throw new Error('Streaming not supported')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          buffer += chunk
          
          // Process complete lines
          const lines = buffer.split('\n')
          buffer = lines.pop() || '' // Keep incomplete line in buffer
          
          for (const line of lines) {
            const trimmedLine = line.trim()
            if (trimmedLine.startsWith('data: ')) {
              const data = trimmedLine.slice(6).trim()
              
              if (data === '[DONE]') {
                return
              }
              
              if (data === '') {
                continue
              }
              
              try {
                const parsed = JSON.parse(data)
                const delta = parsed.choices?.[0]?.delta
                const content = delta?.content
                const reasoning = delta?.reasoning
                
                // Show both reasoning and content
                const textToAdd = reasoning || content
                
                if (textToAdd) {
                  flushSync(() => {
                    setMessages(prev => prev.map(msg => 
                      msg.id === assistantMessageId 
                        ? { ...msg, content: msg.content + textToAdd }
                        : msg
                    ))
                  })
                }
              } catch (e) {
                // Skip invalid JSON chunks
              }
            }
          }
        }
      } finally {
        reader.releaseLock()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error sending message:', err)
      // Remove the empty assistant message on error
      setMessages(prev => prev.filter(msg => msg.id !== assistantMessageId))
    } finally {
      setStreamingMessageId(undefined)
    }
  }, [messages, selectedModel])

  const handleModelChange = useCallback((modelId: string) => {
    setSelectedModel(modelId)
    setError(null)
  }, [])

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col h-[600px]">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <ModelSelector
          selectedModel={selectedModel}
          onModelChange={handleModelChange}
          disabled={streamingMessageId !== undefined}
        />
        {error && (
          <div className="mt-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
            <p className="text-sm text-red-600 dark:text-red-400">
              Error: {error}
            </p>
          </div>
        )}
      </div>
      
      <MessageList messages={messages} isLoading={false} streamingMessageId={streamingMessageId} />
      
      <MessageInput
        onSendMessage={handleSendMessage}
        disabled={streamingMessageId !== undefined}
        placeholder="Type your message here..."
      />
    </div>
  )
}
