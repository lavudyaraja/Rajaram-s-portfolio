// Enhanced Chatbot Service - Client Side
// lib/chatbot.ts or lib/chatbot-service.ts

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
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
}

export interface StreamOptions {
  onChunk?: (chunk: string) => void;
  onComplete?: (fullMessage: string) => void;
  onError?: (error: Error) => void;
  signal?: AbortSignal;
  model?: 'fast' | 'balanced' | 'quality';
}

interface CacheEntry {
  response: string;
  timestamp: number;
  hits: number;
}

export class ChatbotService {
  private isInitialized = true;
  private messageCache: Map<string, CacheEntry> = new Map();
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes
  private readonly MAX_RETRIES = 3;
  private readonly RETRY_DELAY = 1000;
  private conversationHistory: Map<string, ChatMessage[]> = new Map();
  private currentConversationId: string | null = null;
  private analytics: {
    totalMessages: number;
    totalTokens: number;
    cacheHits: number;
    errors: number;
    averageResponseTime: number;
    streamingMessages: number;
  } = {
    totalMessages: 0,
    totalTokens: 0,
    cacheHits: 0,
    errors: 0,
    averageResponseTime: 0,
    streamingMessages: 0,
  };

  constructor() {
    this.loadConversationsFromStorage();
    this.loadAnalyticsFromStorage();
    this.startCacheCleanup();
    this.initializeCurrentConversation();
    console.log('✅ Chatbot service initialized');
  }

  // ==================== INITIALIZATION ====================
  private initializeCurrentConversation(): void {
    this.currentConversationId = this.generateConversationId();
  }

  // ==================== MESSAGE PREPARATION ====================
  private prepareMessages(messages: ChatMessage[]): ChatMessage[] {
    return messages.map(msg => ({
      ...msg,
      timestamp: msg.timestamp || Date.now(),
      id: msg.id || this.generateMessageId()
    }));
  }

  // ==================== CACHING ====================
  private getCacheKey(messages: ChatMessage[]): string {
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
    return lastUserMessage ? btoa(lastUserMessage.content.toLowerCase().trim()) : '';
  }

  private getCachedResponse(key: string): string | null {
    const cached = this.messageCache.get(key);
    
    if (!cached) return null;
    
    const age = Date.now() - cached.timestamp;
    if (age > this.CACHE_TTL) {
      this.messageCache.delete(key);
      return null;
    }
    
    cached.hits++;
    this.analytics.cacheHits++;
    return cached.response;
  }

  private setCachedResponse(key: string, response: string): void {
    this.messageCache.set(key, {
      response,
      timestamp: Date.now(),
      hits: 0
    });
  }

  private startCacheCleanup(): void {
    setInterval(() => {
      const now = Date.now();
      for (const [key, entry] of this.messageCache.entries()) {
        if (now - entry.timestamp > this.CACHE_TTL) {
          this.messageCache.delete(key);
        }
      }
    }, this.CACHE_TTL);
  }

  // ==================== RETRY LOGIC ====================
  private async retryWithBackoff<T>(
    fn: () => Promise<T>,
    retries = this.MAX_RETRIES
  ): Promise<T> {
    try {
      return await fn();
    } catch (error: any) {
      if (retries === 0) throw error;
      
      // Don't retry on 4xx errors
      if (error.status >= 400 && error.status < 500) {
        throw error;
      }
      
      await new Promise(resolve => 
        setTimeout(resolve, this.RETRY_DELAY * (this.MAX_RETRIES - retries + 1))
      );
      
      return this.retryWithBackoff(fn, retries - 1);
    }
  }

  // ==================== CONVERSATION MANAGEMENT ====================
  private generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateConversationId(): string {
    return `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  getCurrentConversationId(): string | null {
    return this.currentConversationId;
  }

  createNewConversation(): string {
    this.currentConversationId = this.generateConversationId();
    return this.currentConversationId;
  }

  saveConversation(conversationId: string, messages: ChatMessage[]): void {
    this.conversationHistory.set(conversationId, messages);
    this.saveConversationsToStorage();
  }

  loadConversation(conversationId: string): ChatMessage[] | null {
    return this.conversationHistory.get(conversationId) || null;
  }

  deleteConversation(conversationId: string): boolean {
    const deleted = this.conversationHistory.delete(conversationId);
    if (deleted) {
      this.saveConversationsToStorage();
    }
    return deleted;
  }

  // ==================== LOCAL STORAGE ====================
  private saveConversationsToStorage(): void {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') return;
    try {
      const data: Record<string, ChatMessage[]> = {};
      for (const [id, messages] of this.conversationHistory.entries()) {
        data[id] = messages;
      }
      localStorage.setItem('chatbot_conversations', JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save conversations:', error);
    }
  }

  private loadConversationsFromStorage(): void {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') return;
    try {
      const data = localStorage.getItem('chatbot_conversations');
      if (data) {
        const parsed = JSON.parse(data);
        for (const [id, messages] of Object.entries(parsed)) {
          this.conversationHistory.set(id, messages as ChatMessage[]);
        }
      }
    } catch (error) {
      console.error('Failed to load conversations:', error);
    }
  }

  private saveAnalyticsToStorage(): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('chatbot_analytics', JSON.stringify(this.analytics));
    } catch (error) {
      console.error('Failed to save analytics:', error);
    }
  }

  private loadAnalyticsFromStorage(): void {
    if (typeof window === 'undefined') return;
    try {
      const data = localStorage.getItem('chatbot_analytics');
      if (data) {
        this.analytics = { ...this.analytics, ...JSON.parse(data) };
      }
    } catch (error) {
      console.error('Failed to load analytics:', error);
    }
  }

  // ==================== MAIN API METHODS ====================
  async sendMessage(
    messages: ChatMessage[],
    options?: { 
      useCache?: boolean;
      model?: 'fast' | 'balanced' | 'quality';
    }
  ): Promise<ChatResponse> {
    const startTime = Date.now();
    
    try {
      // Check cache if enabled
      if (options?.useCache !== false) {
        const cacheKey = this.getCacheKey(messages);
        const cached = this.getCachedResponse(cacheKey);
        
        if (cached) {
          console.log('✅ Cache hit');
          return { message: cached };
        }
      }

      const preparedMessages = this.prepareMessages(messages);

      // Make API call with retry
      const data = await this.retryWithBackoff(async () => {
        const response = await fetch('/api/chatbot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: preparedMessages,
            model: options?.model || 'fast',
            stream: false
          }),
        });

        if (!response.ok) {
          let errorMessage = 'Failed to get response';
          try {
            const errorData = await response.json();
            errorMessage = errorData.error || errorMessage;
          } catch {
            errorMessage = `Server error (${response.status})`;
          }
          const error: any = new Error(errorMessage);
          error.status = response.status;
          throw error;
        }

        return response.json();
      });

      // Update analytics
      const responseTime = Date.now() - startTime;
      this.analytics.totalMessages++;
      this.analytics.averageResponseTime = 
        (this.analytics.averageResponseTime * (this.analytics.totalMessages - 1) + responseTime) / 
        this.analytics.totalMessages;
      
      if (data.tokensUsed) {
        this.analytics.totalTokens += data.tokensUsed;
      }

      this.saveAnalyticsToStorage();

      // Cache response
      if (options?.useCache !== false && data.message) {
        const cacheKey = this.getCacheKey(messages);
        this.setCachedResponse(cacheKey, data.message);
      }

      // Save to current conversation
      if (this.currentConversationId) {
        this.saveConversation(this.currentConversationId, messages);
      }

      return {
        message: data.message,
        conversationId: this.currentConversationId || undefined,
        tokensUsed: data.tokensUsed,
        model: data.model,
        responseTime: data.responseTime
      };
    } catch (error: any) {
      console.error('Chatbot API Error:', error);
      this.analytics.errors++;
      this.saveAnalyticsToStorage();

      return {
        message: '',
        error: error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.'
      };
    }
  }

  async sendMessageStream(
    messages: ChatMessage[],
    onChunk: (chunk: string) => void,
    options?: StreamOptions
  ): Promise<void> {
    const startTime = Date.now();
    
    try {
      const preparedMessages = this.prepareMessages(messages);

      await this.retryWithBackoff(async () => {
        const response = await fetch('/api/chatbot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: preparedMessages,
            model: options?.model || 'fast',
            stream: true
          }),
          signal: options?.signal
        });

        if (!response.ok) {
          let errorMessage = 'Failed to get response';
          try {
            const errorData = await response.json();
            errorMessage = errorData.error || errorMessage;
          } catch {
            errorMessage = `Server error (${response.status})`;
          }
          const error: any = new Error(errorMessage);
          error.status = response.status;
          throw error;
        }

        if (!response.body) {
          throw new Error('Streaming not supported');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullMessage = '';

        while (true) {
          const { done, value } = await reader.read();
          
          if (done) break;
          
          const chunk = decoder.decode(value, { stream: true });
          fullMessage += chunk;
          onChunk(chunk);
        }

        // Update analytics
        const responseTime = Date.now() - startTime;
        this.analytics.totalMessages++;
        this.analytics.streamingMessages++;
        this.analytics.averageResponseTime = 
          (this.analytics.averageResponseTime * (this.analytics.totalMessages - 1) + responseTime) / 
          this.analytics.totalMessages;
        
        this.saveAnalyticsToStorage();

        // Save to current conversation
        if (this.currentConversationId) {
          const updatedMessages = [
            ...messages,
            { role: 'assistant' as const, content: fullMessage, timestamp: Date.now() }
          ];
          this.saveConversation(this.currentConversationId, updatedMessages);
        }

        options?.onComplete?.(fullMessage);
      });
    } catch (error: any) {
      console.error('Chatbot Streaming Error:', error);
      this.analytics.errors++;
      this.saveAnalyticsToStorage();
      
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.';
      options?.onError?.(error);
      onChunk(`Error: ${errorMessage}`);
    }
  }

  // ==================== SUGGESTED PROMPTS ====================
  getSuggestedPrompts(): string[] {
    return [
      "What are Rajaram's main technical skills?",
      "Tell me about his projects",
      "What certifications does he have?",
      "What's his experience with React and Next.js?",
      "Tell me about his AI/ML projects",
      "What database technologies does he work with?",
    ];
  }

  getContextualPrompts(lastMessage?: string): string[] {
    if (!lastMessage) return this.getSuggestedPrompts().slice(0, 3);

    const lowercaseMsg = lastMessage.toLowerCase();

    if (lowercaseMsg.includes('project')) {
      return [
        "Tell me more about the technical details",
        "What other projects has he built?",
        "What was the impact of this project?"
      ];
    }

    if (lowercaseMsg.includes('skill') || lowercaseMsg.includes('technology')) {
      return [
        "What projects use this technology?",
        "Does he have certifications in this area?",
        "What's his proficiency level?"
      ];
    }

    if (lowercaseMsg.includes('certification')) {
      return [
        "What skills did this cover?",
        "What other certifications does he have?",
        "How does this apply to projects?"
      ];
    }

    return this.getSuggestedPrompts().slice(0, 3);
  }

  // ==================== ANALYTICS ====================
  getAnalytics() {
    return {
      ...this.analytics,
      cacheSize: this.messageCache.size,
      conversationCount: this.conversationHistory.size,
      cacheHitRate: this.analytics.totalMessages > 0 
        ? ((this.analytics.cacheHits / this.analytics.totalMessages) * 100).toFixed(2) + '%'
        : '0%',
      streamingRate: this.analytics.totalMessages > 0
        ? ((this.analytics.streamingMessages / this.analytics.totalMessages) * 100).toFixed(2) + '%'
        : '0%'
    };
  }

  resetAnalytics(): void {
    this.analytics = {
      totalMessages: 0,
      totalTokens: 0,
      cacheHits: 0,
      errors: 0,
      averageResponseTime: 0,
      streamingMessages: 0,
    };
    this.saveAnalyticsToStorage();
  }

  // ==================== UTILITY METHODS ====================
  clearCache(): void {
    this.messageCache.clear();
  }

  isReady(): boolean {
    return this.isInitialized;
  }

  async getStatus(): Promise<{ 
    initialized: boolean; 
    message: string; 
    analytics: any;
    apiHealth?: any;
  }> {
    try {
      const response = await fetch('/api/chatbot?endpoint=health');
      const apiHealth = await response.json();
      
      return {
        initialized: true,
        message: 'Chatbot service is ready',
        analytics: this.getAnalytics(),
        apiHealth
      };
    } catch {
      return {
        initialized: true,
        message: 'Chatbot service is ready',
        analytics: this.getAnalytics()
      };
    }
  }
}

// Export singleton instance
export const chatbotService = new ChatbotService();

// Export helper functions
export const createUserMessage = (content: string): ChatMessage => ({
  role: 'user',
  content,
  timestamp: Date.now(),
  id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
});

export const createAssistantMessage = (content: string): ChatMessage => ({
  role: 'assistant',
  content,
  timestamp: Date.now(),
  id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
});