import { NextRequest, NextResponse } from 'next/server'
import { createOpenRouterClient } from '@/lib/openrouter'
import { ChatRequest } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json()
    
    // Validate request
    if (!body.model || !body.messages || !Array.isArray(body.messages)) {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      )
    }

    // Check if API key is configured
    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: 'OpenRouter API key not configured' },
        { status: 500 }
      )
    }

    // Create OpenRouter client and send request
    const client = createOpenRouterClient()
    const response = await client.sendMessage(body)

    return NextResponse.json(response)
  } catch (error) {
    console.error('Chat API error:', error)
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Internal server error' 
      },
      { status: 500 }
    )
  }
}
