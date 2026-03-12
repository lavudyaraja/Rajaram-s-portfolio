// lib/chatbot.ts
// Enhanced Chatbot Service — Portfolio-only guardrails + meeting scheduling

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: number;
  id?: string;
}

export interface ChatResponse {
  message: string;
  error?: string;
  conversationId?: string;
  tokensUsed?: number;
  model?: string;
  responseTime?: number;
  blocked?: boolean;
}

export interface StreamOptions {
  onChunk?: (chunk: string) => void;
  onComplete?: (fullMessage: string) => void;
  onError?: (error: Error) => void;
  signal?: AbortSignal;
  model?: "fast" | "balanced" | "quality";
}

// ─── Off-topic detection ──────────────────────────────────────────────────────

// Topics that are clearly nothing to do with Rajaram's portfolio
const OFF_TOPIC_PATTERNS = [
  /\b(weather|stock price|crypto|bitcoin|news|sports|recipe|cook|movie|song|music|celebrity|gossip)\b/i,
  /\b(tell me a joke|what is the meaning of life|who is god|predict|horoscope|lottery)\b/i,
  /\b(write my (essay|homework|assignment|code for class))\b/i,
  /\b(hack|exploit|vulnerability|ddos|phishing|malware|scam)\b/i,
  /\b(sex|porn|adult|nsfw|drugs|weapon)\b/i,
  /\b(politics|election|president|war|religion|abortion|vaccine)\b/i,
  /\b(translate this (random|unrelated))\b/i,
];

// Phrases that are clearly portfolio-relevant (never block these)
const PORTFOLIO_SAFE_PATTERNS = [
  /\b(project|skill|tech|stack|react|python|machine learning|ml|ai|resume|cv|hire|job|internship)\b/i,
  /\b(certificate|education|experience|contact|email|github|linkedin|portfolio|website)\b/i,
  /\b(schedule|meeting|call|book|calendly|appointment|work together)\b/i,
  /\b(rajaram|lavudya|full.?stack|frontend|backend|database|devops|fastapi|nextjs|node)\b/i,
  /\b(about|who are you|what can you do|help me|navigate|section|page)\b/i,
];

function isOffTopic(message: string): boolean {
  const safe = PORTFOLIO_SAFE_PATTERNS.some((p) => p.test(message));
  if (safe) return false;
  return OFF_TOPIC_PATTERNS.some((p) => p.test(message));
}

const OFF_TOPIC_REPLY =
  "I'm specialised in answering questions about Rajaram's portfolio — his projects, skills, certifications, experience, and how to get in touch or schedule a meeting.\n\nCould you ask me something related to that? For example: \"What projects has Rajaram built?\" or \"How do I schedule a call?\"";

// ─── Cache ────────────────────────────────────────────────────────────────────

interface CacheEntry {
  response: string;
  timestamp: number;
  hits: number;
}

// ─── Service class ────────────────────────────────────────────────────────────

export class ChatbotService {
  private messageCache     = new Map<string, CacheEntry>();
  private conversationHistory = new Map<string, ChatMessage[]>();
  private currentConversationId: string | null = null;
  private readonly CACHE_TTL   = 5 * 60 * 1000; // 5 minutes
  private readonly MAX_RETRIES = 3;
  private readonly RETRY_DELAY = 1000;

  private analytics = {
    totalMessages:       0,
    totalTokens:         0,
    cacheHits:           0,
    errors:              0,
    averageResponseTime: 0,
    streamingMessages:   0,
    blockedMessages:     0,
  };

  constructor() {
    this.loadFromStorage();
    this.startCacheCleanup();
    this.currentConversationId = this.generateId("conv");
  }

  // ── Helpers ────────────────────────────────────────────────────────────────

  private generateId(prefix: string) {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  }

  private cacheKey(messages: ChatMessage[]) {
    const last = [...messages].reverse().find((m) => m.role === "user");
    return last ? btoa(encodeURIComponent(last.content.toLowerCase().trim())) : "";
  }

  private getCached(key: string): string | null {
    const entry = this.messageCache.get(key);
    if (!entry) return null;
    if (Date.now() - entry.timestamp > this.CACHE_TTL) {
      this.messageCache.delete(key);
      return null;
    }
    entry.hits++;
    this.analytics.cacheHits++;
    return entry.response;
  }

  private setCached(key: string, response: string) {
    this.messageCache.set(key, { response, timestamp: Date.now(), hits: 0 });
  }

  private startCacheCleanup() {
    setInterval(() => {
      const now = Date.now();
      for (const [k, e] of this.messageCache) {
        if (now - e.timestamp > this.CACHE_TTL) this.messageCache.delete(k);
      }
    }, this.CACHE_TTL);
  }

  private async withRetry<T>(fn: () => Promise<T>, retries = this.MAX_RETRIES): Promise<T> {
    try {
      return await fn();
    } catch (err: any) {
      if (retries === 0) throw err;
      if (err?.status >= 400 && err?.status < 500) throw err;
      await new Promise((r) =>
        setTimeout(r, this.RETRY_DELAY * (this.MAX_RETRIES - retries + 1))
      );
      return this.withRetry(fn, retries - 1);
    }
  }

  private prepare(messages: ChatMessage[]): ChatMessage[] {
    return messages.map((m) => ({
      ...m,
      timestamp: m.timestamp ?? Date.now(),
      id: m.id ?? this.generateId("msg"),
    }));
  }

  private saveAnalytics() {
    if (typeof window === "undefined") return;
    try { localStorage.setItem("chatbot_analytics", JSON.stringify(this.analytics)); }
    catch { /* ignore */ }
  }

  private loadFromStorage() {
    if (typeof window === "undefined") return;
    try {
      const a = localStorage.getItem("chatbot_analytics");
      if (a) this.analytics = { ...this.analytics, ...JSON.parse(a) };
      const c = localStorage.getItem("chatbot_conversations");
      if (c) {
        for (const [id, msgs] of Object.entries(JSON.parse(c))) {
          this.conversationHistory.set(id, msgs as ChatMessage[]);
        }
      }
    } catch { /* ignore */ }
  }

  private saveConversations() {
    if (typeof window === "undefined") return;
    try {
      const obj: Record<string, ChatMessage[]> = {};
      for (const [id, msgs] of this.conversationHistory) obj[id] = msgs;
      localStorage.setItem("chatbot_conversations", JSON.stringify(obj));
    } catch { /* ignore */ }
  }

  // ── Public API ─────────────────────────────────────────────────────────────

  getCurrentConversationId() { return this.currentConversationId; }

  createNewConversation() {
    this.currentConversationId = this.generateId("conv");
    return this.currentConversationId;
  }

  saveConversation(id: string, messages: ChatMessage[]) {
    this.conversationHistory.set(id, messages);
    this.saveConversations();
  }

  loadConversation(id: string) {
    return this.conversationHistory.get(id) ?? null;
  }

  // ── Streaming send (with off-topic guard) ──────────────────────────────────

  async sendMessageStream(
    messages: ChatMessage[],
    onChunk: (chunk: string) => void,
    options?: StreamOptions
  ): Promise<void> {
    const startTime = Date.now();

    // Off-topic guard
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (lastUser && isOffTopic(lastUser.content)) {
      this.analytics.blockedMessages++;
      this.saveAnalytics();
      onChunk(OFF_TOPIC_REPLY);
      options?.onComplete?.(OFF_TOPIC_REPLY);
      return;
    }

    try {
      const prepared = this.prepare(messages);

      await this.withRetry(async () => {
        const res = await fetch("/api/chatbot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: prepared,
            model: options?.model ?? "fast",
            stream: true,
          }),
          signal: options?.signal,
        });

        if (!res.ok) {
          let msg = `Server error (${res.status})`;
          try { msg = (await res.json()).error ?? msg; } catch { /* ignore */ }
          const e: any = new Error(msg);
          e.status = res.status;
          throw e;
        }

        if (!res.body) throw new Error("Streaming not supported");

        const reader  = res.body.getReader();
        const decoder = new TextDecoder();
        let full = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          full += chunk;
          onChunk(chunk);
        }

        const rt = Date.now() - startTime;
        this.analytics.totalMessages++;
        this.analytics.streamingMessages++;
        this.analytics.averageResponseTime =
          (this.analytics.averageResponseTime * (this.analytics.totalMessages - 1) + rt) /
          this.analytics.totalMessages;
        this.saveAnalytics();

        if (this.currentConversationId) {
          this.saveConversation(this.currentConversationId, [
            ...messages,
            { role: "assistant", content: full, timestamp: Date.now() },
          ]);
        }

        options?.onComplete?.(full);
      });
    } catch (err: any) {
      this.analytics.errors++;
      this.saveAnalytics();
      options?.onError?.(err);
      onChunk(
        "I hit an error — please try again or email codeml862@gmail.com directly."
      );
    }
  }

  // ── Suggested / contextual prompts ────────────────────────────────────────

  getSuggestedPrompts(): string[] {
    return [
      "What are Rajaram's main technical skills?",
      "Tell me about his best projects",
      "How do I schedule a meeting with Rajaram?",
      "What certifications does he hold?",
      "What's his experience with AI and machine learning?",
      "How can I hire or contact Rajaram?",
      "Navigate me through this portfolio",
      "Can I download his resume?",
    ];
  }

  getContextualPrompts(lastMessage: string): string[] {
    const m = lastMessage.toLowerCase();
    if (/project|built|work/.test(m))
      return [
        "Tell me more about the tech stack used",
        "What other projects has he built?",
        "What was the impact or outcome?",
      ];
    if (/skill|tech|stack|language/.test(m))
      return [
        "Which projects use this technology?",
        "Does he have a certification in this area?",
        "What is his proficiency level?",
      ];
    if (/cert|certif/.test(m))
      return [
        "What skills does this certification cover?",
        "How does it apply to his projects?",
        "What other certs does he have?",
      ];
    if (/hire|job|work|intern/.test(m))
      return [
        "How do I schedule a call with Rajaram?",
        "Can I download his resume?",
        "What roles is he open to?",
      ];
    return this.getSuggestedPrompts().slice(0, 3);
  }

  getAnalytics() {
    return {
      ...this.analytics,
      cacheSize:       this.messageCache.size,
      conversationCount: this.conversationHistory.size,
      cacheHitRate:
        this.analytics.totalMessages > 0
          ? ((this.analytics.cacheHits / this.analytics.totalMessages) * 100).toFixed(1) + "%"
          : "0%",
    };
  }

  isReady() { return true; }
  clearCache() { this.messageCache.clear(); }
}

// ── Singleton export ──────────────────────────────────────────────────────────

export const chatbotService = new ChatbotService();

export const createUserMessage = (content: string): ChatMessage => ({
  role: "user",
  content,
  timestamp: Date.now(),
  id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
});

export const createAssistantMessage = (content: string): ChatMessage => ({
  role: "assistant",
  content,
  timestamp: Date.now(),
  id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
});