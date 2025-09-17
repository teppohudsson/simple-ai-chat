'use client'

import { useEffect, useRef } from 'react'
import { type Message } from '@/lib/types'
import MarkdownContent from './MarkdownContent'

interface MessageListProps {
  messages: Message[]
  isLoading?: boolean
  streamingMessageId?: string
}

export default function MessageList({ messages, isLoading = false, streamingMessageId }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      {messages.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          <p>Start a conversation by typing a message below.</p>
        </div>
      ) : (
        messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
              }`}
            >
              <div className="break-words">
                {message.role === 'user' ? (
                  // User messages: keep as plain text
                  <div className="whitespace-pre-wrap">
                    {message.content}
                  </div>
                ) : (
                  // Assistant messages: render as markdown
                  <>
                    {message.content ? (
                      <div className="relative">
                        <MarkdownContent content={message.content} />
                        {streamingMessageId === message.id && (
                          <span className="inline-block w-2 h-4 bg-current animate-pulse ml-1"></span>
                        )}
                      </div>
                    ) : streamingMessageId === message.id ? (
                      <span className="text-gray-500 dark:text-gray-400">
                        <span className="animate-pulse">...</span>
                      </span>
                    ) : null}
                  </>
                )}
              </div>
              <div
                className={`text-xs mt-1 ${
                  message.role === 'user'
                    ? 'text-blue-100'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                {message.timestamp.toLocaleTimeString()}
                {message.model && (
                  <span className="ml-2 opacity-75">
                    via {message.model.split('/')[1]}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))
      )}
      
      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">AI is thinking...</span>
            </div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  )
}
