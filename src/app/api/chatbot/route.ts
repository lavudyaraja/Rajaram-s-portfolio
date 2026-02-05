// API Route: app/api/chatbot/route.ts
// Enhanced chatbot API with advanced features

import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 30;
const requestLog = new Map<string, number[]>();

// Analytics tracking
const analytics = {
  totalRequests: 0,
  successfulRequests: 0,
  failedRequests: 0,
  totalTokens: 0,
  averageResponseTime: 0,
};

// Model configuration
const MODELS = {
  fast: 'llama-3.3-70b-versatile', // Fast, versatile responses
  balanced: 'llama-3.3-70b-specdec', // Balanced speed and quality
  quality: 'llama-3.1-70b-versatile', // Higher quality responses
} as const;

type ModelType = keyof typeof MODELS;

interface ChatRequest {
  messages: Array<{ role: string; content: string }>;
  model?: ModelType;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

// Helper function to strip bold markdown
function stripBoldMarkdown(text: string): string {
  return text.replace(/\*\*(.*?)\*\*/g, '$1');
}

// Helper function to get client IP
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  return forwarded?.split(',')[0] || realIP || 'unknown';
}

// Rate limiting check
function checkRateLimit(clientIP: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const requests = requestLog.get(clientIP) || [];
  
  // Clean old requests outside the window
  const recentRequests = requests.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW);
  
  if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
    const oldestRequest = Math.min(...recentRequests);
    const retryAfter = Math.ceil((RATE_LIMIT_WINDOW - (now - oldestRequest)) / 1000);
    return { allowed: false, retryAfter };
  }
  
  recentRequests.push(now);
  requestLog.set(clientIP, recentRequests);
  
  return { allowed: true };
}

// System prompt generator
function getSystemPrompt(): any {
  return {
    role: 'system',
    content: `You are Rajaram's personal AI assistant embedded in his portfolio website. Your role is to help visitors learn about Rajaram's:

## PROFESSIONAL BACKGROUND
Rajaram is a passionate full-stack developer specializing in modern web technologies, AI/ML applications, and software engineering best practices.

## TECHNICAL SKILLS

### Frontend Development
- React, TypeScript, JavaScript, HTML5, CSS3
- Tailwind CSS, Sass, Bootstrap, jQuery
- Next.js, component-based architecture, state management

### Backend Development
- Node.js, Express.js, Python, Django
- Java, Spring Boot, PHP, Laravel
- RESTful APIs, dependency injection, database integration

### Database Technologies
- PostgreSQL, MySQL, SQLite, Firebase
- Prisma ORM, Supabase, Neon
- Database design, query optimization

### DevOps & Tools
- Git, GitHub, Docker, Linux
- n8n (workflow automation)
- Version control, containerization

### AI & Machine Learning
- Python, NumPy, Pandas, SciPy
- NLP tools: NLTK, Transformers (Hugging Face)
- Computer Vision: OpenCV, Matplotlib
- Machine learning algorithms, data processing

### UI/UX Design
- Figma, Canva
- User interface design, user experience principles

### Development Tools
- VS Code, Postman, npm, Yarn
- Chrome DevTools, testing frameworks

## PROJECTS PORTFOLIO

### Featured Projects:
1. **Real-time Collaborative IDE** - Web-based IDE with real-time collaboration, syntax highlighting, voice chat, and code execution. Technologies: React, WebRTC, Monaco Editor, Socket.io, Docker.

2. **Computer Vision Defect Detection** - AI system for manufacturing quality control using deep learning with 99.7% accuracy. Technologies: PyTorch, OpenCV, FastAPI, Docker.

3. **NLP Document Intelligence** - Advanced document processing using transformers for entity extraction and automated insights. Technologies: Transformers, spaCy, FastAPI, PostgreSQL.

4. **Distributed Video Streaming Platform** - Netflix-like platform with microservices, CDN integration, and ML recommendations. Technologies: Node.js, React, AWS, Docker, Kubernetes, Redis, PostgreSQL.

5. **Real-time Trading Dashboard** - High-frequency trading dashboard with WebSocket connections and algorithmic strategies. Technologies: React, Node.js, WebSockets, D3.js, MongoDB, Redis.

6. **AR Shopping Experience** - Augmented reality mobile app for visualizing products in space. Technologies: React Native, ARKit, ARCore, Three.js, Firebase.

7. **3D Portfolio Experience** - Immersive 3D portfolio with interactive scenes and physics. Technologies: Three.js, WebGL, GLSL, React, Framer Motion.

## CERTIFICATIONS (11 Total)

### Programming & Development:
- **Frontend Developer (React)** - HackerRank certification covering React.js, JSX, state management, and component architecture
- **JavaScript (Intermediate)** - HackerRank certification with ES6 features, async programming, and DOM manipulation
- **Python (Basic)** - HackerRank certification covering syntax, data types, functions, and file handling
- **Java and Python** - Udemy certification covering OOP and core language features
- **Java and Spring Boot** - Udemy certification focusing on REST APIs, dependency injection, and database integration
- **HTML, Javascript** - Udemy certification covering HTML5, JavaScript, and client-side scripting

### Problem Solving & Algorithms:
- **Problem Solving (Basic)** - HackerRank certification covering algorithms and data structures
- **C++** - Udemy certification covering OOP, memory management, and data structures

### Advanced Topics:
- **Machine Learning** - Udemy certification covering supervised/unsupervised learning, data preprocessing, and ML algorithms
- **Software Architecture** - Udemy certification covering design patterns, scalability, and system architecture

## BLOG ARTICLES
1. **Building Scalable React Applications with TypeScript**
2. **The Art of Clean Code: Principles Every Developer Should Know**
3. **Modern CSS Techniques: From Grid to Container Queries**
4. **Mastering Git Workflows for Team Collaboration**
5. **Performance Optimization in Modern Web Applications**
6. **The Future of Frontend Development: Trends to Watch**

## RESPONSE GUIDELINES
- Be friendly, professional, and concise (keep under 150 words unless more detail requested)
- Provide specific examples and context when discussing skills
- Highlight practical applications and real-world impact of projects
- Use markdown formatting for better readability (bold, lists, code blocks)
- Suggest related topics or projects that might interest the visitor
- If information isn't available, be honest and direct them appropriately
- Maintain enthusiasm that reflects Rajaram's passion for technology`
  };
}

// Validate request
function validateRequest(body: any): { valid: boolean; error?: string } {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Invalid request body' };
  }

  if (!Array.isArray(body.messages)) {
    return { valid: false, error: 'Messages must be an array' };
  }

  if (body.messages.length === 0) {
    return { valid: false, error: 'Messages array cannot be empty' };
  }

  for (const msg of body.messages) {
    if (!msg.role || !msg.content) {
      return { valid: false, error: 'Each message must have role and content' };
    }

    if (!['user', 'assistant', 'system'].includes(msg.role)) {
      return { valid: false, error: 'Invalid message role' };
    }
  }

  return { valid: true };
}

// Sanitize and prepare messages
function prepareMessages(messages: any[]): any[] {
  // Ensure system prompt is first
  const hasSystemPrompt = messages.some(msg => msg.role === 'system');
  const systemPrompt = getSystemPrompt();
  
  const userMessages = messages.filter(msg => msg.role !== 'system').map(msg => ({
    role: msg.role,
    content: typeof msg.content === 'string' ? msg.content.trim() : String(msg.content)
  }));

  return hasSystemPrompt ? messages : [systemPrompt, ...userMessages];
}

// Main POST handler
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const clientIP = getClientIP(request);

  try {
    // Parse request body
    const body: ChatRequest = await request.json();

    // Validate request
    const validation = validateRequest(body);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // Check rate limit
    const rateLimitCheck = checkRateLimit(clientIP);
    if (!rateLimitCheck.allowed) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded. Please try again later.',
          retryAfter: rateLimitCheck.retryAfter 
        },
        { 
          status: 429,
          headers: {
            'Retry-After': String(rateLimitCheck.retryAfter || 60),
            'X-RateLimit-Limit': String(MAX_REQUESTS_PER_WINDOW),
            'X-RateLimit-Remaining': '0'
          }
        }
      );
    }

    // Check API key
    const apiKey = process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured on server' },
        { status: 500 }
      );
    }

    // Initialize Groq client
    const groq = new Groq({ apiKey });

    // Prepare messages
    const preparedMessages = prepareMessages(body.messages);

    // Get model (default to fast)
    const modelName = MODELS[body.model || 'fast'];
    const temperature = body.temperature ?? 0.7;
    const maxTokens = body.maxTokens ?? 1024;

    // Track analytics
    analytics.totalRequests++;

    // Check if streaming is requested
    if (body.stream) {
      // Return streaming response
      const encoder = new TextEncoder();
      
      const stream = new ReadableStream({
        async start(controller) {
          try {
            const chatCompletion = await groq.chat.completions.create({
              messages: preparedMessages,
              model: modelName,
              temperature,
              max_tokens: maxTokens,
              top_p: 1,
              stream: true,
            });

            // Stream chunks
            for await (const chunk of chatCompletion) {
              const content = chunk.choices[0]?.delta?.content || '';
              if (content) {
                controller.enqueue(encoder.encode(content));
              }
            }

            controller.close();
            analytics.successfulRequests++;
          } catch (error: any) {
            console.error('Streaming error:', error);
            analytics.failedRequests++;
            const errorMessage = `Error: ${error.message || 'Failed to stream response'}`;
            controller.enqueue(encoder.encode(errorMessage));
            controller.close();
          }
        },
      });

      return new NextResponse(stream, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    }

    // Non-streaming response
    const completion = await groq.chat.completions.create({
      messages: preparedMessages,
      model: modelName,
      temperature,
      max_tokens: maxTokens,
      top_p: 1,
      stream: false,
    });

    const responseContent = completion.choices[0]?.message?.content;

    if (!responseContent) {
      analytics.failedRequests++;
      return NextResponse.json(
        { error: 'No response received from AI' },
        { status: 500 }
      );
    }

    // Track response time
    const responseTime = Date.now() - startTime;
    analytics.averageResponseTime = 
      (analytics.averageResponseTime * (analytics.successfulRequests || 1) + responseTime) / 
      (analytics.successfulRequests + 1);
    
    analytics.successfulRequests++;

    // Track tokens if available
    if (completion.usage) {
      analytics.totalTokens += completion.usage.total_tokens || 0;
    }

    return NextResponse.json(
      { 
        message: stripBoldMarkdown(responseContent),
        tokensUsed: completion.usage?.total_tokens,
        model: modelName,
        responseTime
      },
      {
        headers: {
          'Cache-Control': 'no-store, max-age=0',
          'X-Response-Time': String(responseTime),
          'X-Tokens-Used': String(completion.usage?.total_tokens || 0)
        }
      }
    );
  } catch (error: any) {
    console.error('Chatbot API Error:', error);
    analytics.failedRequests++;

    let statusCode = 500;
    let errorMessage = 'An unexpected error occurred';

    // Handle different error types
    if (error?.status === 401 || error?.error?.type === 'invalid_request_error') {
      statusCode = 401;
      errorMessage = 'Authentication failed. Please check API key configuration.';
    } else if (error?.status === 429 || error?.error?.type === 'rate_limit_exceeded') {
      statusCode = 429;
      errorMessage = 'Rate limit exceeded. Please try again in a moment.';
    } else if (error?.status === 400) {
      statusCode = 400;
      errorMessage = 'Invalid request format.';
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { 
        error: errorMessage,
        timestamp: new Date().toISOString()
      },
      { status: statusCode }
    );
  }
}

// GET endpoint for analytics and health check
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const endpoint = url.searchParams.get('endpoint');

  // Health check
  if (endpoint === 'health') {
    const apiKey = process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY;
    
    return NextResponse.json({
      status: 'ok',
      apiConfigured: !!apiKey,
      timestamp: new Date().toISOString(),
      uptime: process.uptime?.() || 'N/A'
    });
  }

  // Analytics endpoint
  if (endpoint === 'analytics') {
    return NextResponse.json({
      ...analytics,
      cacheSize: requestLog.size,
      successRate: analytics.totalRequests > 0 
        ? (analytics.successfulRequests / analytics.totalRequests) * 100 
        : 0,
    });
  }

  // Default response
  return NextResponse.json({
    service: 'Chatbot API',
    version: '2.0.0',
    endpoints: {
      POST: '/api/chatbot - Send messages to chatbot',
      GET: [
        '/api/chatbot?endpoint=health - Health check',
        '/api/chatbot?endpoint=analytics - View analytics'
      ]
    }
  });
}