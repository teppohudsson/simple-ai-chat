'use client'

import { useState } from 'react'
import ChatInterface from '@/components/ChatInterface'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'chat' | 'guidance'>('chat')

  const tabs = [
    { id: 'chat' as const, label: 'Chat', icon: '💬' },
    { id: 'guidance' as const, label: 'Guidance', icon: '📖' }
  ]

  return (
    <main className="h-screen bg-gray-50 dark:bg-gray-900">
      <div className="h-full container mx-auto px-4 py-4">
        <div className="h-full max-w-4xl mx-auto flex flex-col">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-hidden">
            {activeTab === 'chat' && <ChatInterface />}
            {activeTab === 'guidance' && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 h-full overflow-y-auto">
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    How to Use the AI Chat
                  </h2>
                  
                  <div className="space-y-6">
                    <section>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                        Prompting guide spec 1
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">
                        Think like you are simulating a conversation with a person within the supply chain
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">
                        Here is an example of a prompt that produces ideas for use case "warehouse capacity"
                      </p>
                      <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                        <li>You are a warehouse capacity manager. keep up with the warehouse levels.</li>
                        <li>I have a SAP ECC for warehouse management as the data source</li>
                        <li>please let me know 5 different data you need to do your job</li>
                        <li>What kind of output do you do provide for me, who is a vp of the factory</li>
                        <li>So lets create a Capacity Forecasts. Provide me a sample data that is needed for it</li>
                        <li>Alright. That data looks good. Create the report for me</li>
                        <li>Explain the analysis process for the report</li>
                        <li>Put this all together into a guidance prompt that then simulates the process with data step by step</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                        Prompting guide spec 2
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">
                        Think of providing a goal for the AI, and let it find its own way.
                      </p>
                      <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                        <li>Start with number 1</li>
                        <li>While the number is below 10, continue doing anything except adding +1</li>
                        <li>If number is 10 or more, print the number and explain how did you get there</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                        Output of the workshop. Share and present your prompts and output examples
                      </h3>
                      <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                        <li>Data input</li>
                        <li>Process logics</li>
                        <li>Output example</li>
                      </ul>
                    </section>

                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
