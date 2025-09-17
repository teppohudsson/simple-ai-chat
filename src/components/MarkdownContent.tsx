'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownContentProps {
  content: string
  className?: string
}

export default function MarkdownContent({ content, className = '' }: MarkdownContentProps) {
  return (
    <div className={`prose prose-sm max-w-none prose-gray dark:prose-invert ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Code blocks
          code: ({ inline, className, children, ...props }) => {
            return !inline ? (
              <pre className="bg-gray-200 dark:bg-gray-800 rounded p-2 overflow-x-auto text-sm border">
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            ) : (
              <code className="bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded text-sm" {...props}>
                {children}
              </code>
            )
          },
          // Headings - compact for chat
          h1: ({ children }) => (
            <h1 className="text-base font-bold mb-1 mt-2 first:mt-0">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-sm font-bold mb-1 mt-2 first:mt-0">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-sm font-semibold mb-1 mt-1 first:mt-0">{children}</h3>
          ),
          // Lists - compact spacing
          ul: ({ children }) => (
            <ul className="list-disc list-inside my-1 space-y-0.5 ml-2">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside my-1 space-y-0.5 ml-2">{children}</ol>
          ),
          // Paragraphs - compact spacing
          p: ({ children }) => (
            <p className="mb-1 last:mb-0">{children}</p>
          ),
          // Links
          a: ({ href, children }) => (
            <a 
              href={href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {children}
            </a>
          ),
          // Blockquotes
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-gray-400 dark:border-gray-500 pl-2 italic my-1 text-gray-600 dark:text-gray-300">
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
