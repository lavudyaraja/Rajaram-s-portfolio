import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

// API routes should be dynamically rendered
export const dynamic = 'force-dynamic';

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// System prompt for the chatbot
const SYSTEM_PROMPT = `You are Rajaram's AI assistant. Provide clear, professional information about Rajaram's background and experience.

About Rajaram:
- Full-Stack Developer with 6+ months of experience
- Technical Skills: React.js, Next.js, TypeScript, Node.js, Python, AI/ML, AWS, Docker
- Education: B.Tech in Computer Science with AI specialization
- Built 15+ projects including web applications, mobile apps, and AI/ML solutions
- Holds certifications from AWS, Google Cloud, Microsoft Azure, MongoDB, and React.js
- Available for full-time positions, freelance work, and consulting opportunities
- Email: codeml862@gmail.com
- LinkedIn: https://linkedin.com/in/lavudyaraja5228
- GitHub: https://github.com/lavudyaraja
- Portfolio: https://lavudyaraja.in

CRITICAL FORMATTING RULES:
- Write in natural paragraphs and flowing prose
- NEVER use asterisks, stars (*), or bullet points
- NEVER use numbered lists (1., 2., 3.)
- NEVER use markdown formatting like **bold** or *italic*
- Write like you're having a natural conversation
- When listing items, use commas and "and" naturally
- Example: "Rajaram has experience with React, Next.js, TypeScript, and Node.js"
- NOT: "1. React 2. Next.js" or "* React * Next.js"

When mentioning contact information or links:
- Provide the full URLs clearly
- Example: "You can find him on GitHub at github.com/lavudyaraja"
- NOT: "[GitHub](link)" or "**GitHub**"`;

// Model mapping for Groq
const MODEL_MAPPING: Record<string, string> = {
  'fast': 'llama-3.1-8b-instant',
  'balanced': 'llama-3.1-70b-versatile',
  'quality': 'llama-3.1-405b-reasoning'
};

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { messages, model = 'fast', stream = false } = body;

    // Validate messages
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // Check API key
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    // Map the model to Groq's model
    const groqModel = MODEL_MAPPING[model] || 'llama-3.1-8b-instant';

    // Prepare messages with system prompt
    const preparedMessages = [
      { role: 'system' as const, content: SYSTEM_PROMPT },
      ...messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
    ];

    if (stream) {
      // Streaming response
      const completion = await groq.chat.completions.create({
        model: groqModel,
        messages: preparedMessages,
        temperature: 0.7,
        max_tokens: 2048,
        top_p: 0.9,
        stream: true,
      });

      const encoder = new TextEncoder();
      const readableStream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of completion) {
              const content = chunk.choices[0]?.delta?.content || "";
              if (content) {
                controller.enqueue(encoder.encode(content));
              }
            }
          } catch (error) {
            console.error('Streaming error:', error);
            controller.error(error);
          } finally {
            controller.close();
          }
        },
      });

      return new NextResponse(readableStream, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    } else {
      // Non-streaming response
      const startTime = Date.now();
      const completion = await groq.chat.completions.create({
        model: groqModel,
        messages: preparedMessages,
        temperature: 0.7,
        max_tokens: 2048,
        top_p: 0.9,
        stream: false,
      });

      const message = completion.choices[0]?.message?.content || '';
      const responseTime = Date.now() - startTime;
      const tokensUsed = completion.usage?.total_tokens || 0;

      return NextResponse.json({
        message,
        model: groqModel,
        responseTime,
        tokensUsed,
      });
    }
  } catch (error: any) {
    console.error('Chatbot API Error:', error);
    
    // Handle specific errors
    if (error.message?.includes('API key')) {
      return NextResponse.json(
        { error: 'Invalid API key configuration' },
        { status: 500 }
      );
    }
    
    if (error.message?.includes('429') || error.message?.includes('rate limit')) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again in a moment.' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to process request. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get('endpoint');

  if (endpoint === 'health') {
    return NextResponse.json({
      status: 'healthy',
      service: 'chatbot-api',
      version: '1.0.0',
      provider: 'groq',
      timestamp: new Date().toISOString(),
    });
  }

  return NextResponse.json({
    message: 'Chatbot API is running',
    provider: 'groq',
    endpoints: {
      chat: 'POST /api/chatbot',
      health: 'GET /api/chatbot?endpoint=health',
    },
  });
}