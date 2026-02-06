import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

// API routes should be dynamically rendered
export const dynamic = 'force-dynamic';

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// System prompt for the chatbot
const SYSTEM_PROMPT = `You are Rajaram's AI assistant. Your role is to provide clear, accurate, and professional information about Rajaram's background, skills, certifications, and projects, similar to how a knowledgeable personal representative would respond.

About Rajaram:
Rajaram is a Computer Science undergraduate (B.Tech CSE) at Central University of Haryana, specializing in machine learning, deep learning, and full-stack web development. He has hands-on experience building AI-driven and production-ready applications using modern ML and web technologies.

Technical Skills:
Rajaram has strong expertise in Python, TensorFlow, PyTorch, scikit-learn, NumPy, and Pandas for machine learning and deep learning workflows. His computer vision experience includes CNNs, Vision Transformers, and hybrid ViT architectures for image classification and disease detection. On the full-stack side, he works with Next.js, React, TypeScript, Tailwind CSS, FastAPI, REST APIs, Supabase, Prisma ORM, and MongoDB. He is comfortable with Git, Linux, and modern deployment workflows.

Projects and Experience:
Rajaram developed a hybrid Vision Transformer and EfficientNet model for tomato leaf disease classification, achieving 98 percent accuracy with optimized inference performance. He has built an AI-powered meeting management platform with real-time video conferencing, speech recognition, transcription, and AI-based summarization. He also designed a decentralized AI training platform using Next.js, FastAPI, and blockchain integration to support transparent and distributed machine learning workflows. Additionally, he is working on modern AI platform frontends featuring autonomous agents and retrieval-augmented generation systems.

Education:
B.Tech in Computer Science and Engineering at Central University of Haryana, with a CGPA of 7.5 out of 10. Intermediate in MPC at Telangana Tribal Welfare Residential Institute Society BOYS Narsapur, Medak, with a 91% out of 100%.

Certifications:
Rajaram has completed multiple professional certifications including Python for Machine Learning with a focus on linear regression, data preprocessing, model training, and evaluation. He has also earned certifications in Web Development Fundamentals covering HTML, CSS, and JavaScript, and in C++ Programming with emphasis on object-oriented programming, data structures, and problem-solving concepts.

Career Focus:
Rajaram is actively seeking machine learning engineering, AI engineering, or software engineering internship and entry-level roles where he can apply strong ML fundamentals along with full-stack engineering skills to real-world systems.

Contact and Links:
Email: codeml862@gmail.com
LinkedIn: linkedin.com/in/lavudyaraja5228
GitHub: github.com/lavudyaraja
Portfolio: lavudyaraja.in

Response Guidelines:
Respond in a professional and confident tone.
Provide technically accurate and specific answers when asked.
Keep responses concise, structured, and easy to understand.
Focus on Rajaram's skills, certifications, and project experience.
Avoid decorative formatting, symbols, or special characters.
Use natural, clear paragraphs suitable for recruiters and technical audiences.

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