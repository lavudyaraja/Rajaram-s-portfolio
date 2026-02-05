'use client'

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Minimize2, Maximize2, Bot, User, Trash2, RefreshCw, Sparkles, MoreVertical, Download, History, TrendingUp } from 'lucide-react';
import { chatbotService, ChatMessage, createUserMessage, createAssistantMessage } from '@/lib/chatbot';

interface ChatbotProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

export default function EnhancedChatbot({ isOpen: controlledIsOpen, onToggle }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(controlledIsOpen || false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    createAssistantMessage('Hi! I\'m Rajaram\'s AI assistant. How can I help you learn more about his skills, projects, or experience?')
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>([]);
  const [showAnalytics, setShowAnalytics] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Initialize suggested prompts
  useEffect(() => {
    setSuggestedPrompts(chatbotService.getSuggestedPrompts().slice(0, 3));
  }, []);

  // Update contextual prompts based on last message
  useEffect(() => {
    if (messages.length > 0) {
      const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
      if (lastUserMsg) {
        const contextual = chatbotService.getContextualPrompts(lastUserMsg.content);
        setSuggestedPrompts(contextual);
      }
    }
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (controlledIsOpen !== undefined) {
      setIsOpen(controlledIsOpen);
    }
  }, [controlledIsOpen]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [inputMessage]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onToggle?.();
    
    if (newState && !isMinimized) {
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  };

  const handleClearChat = () => {
    const initialMessage = createAssistantMessage(
      'Hi! I\'m Rajaram\'s AI assistant. How can I help you learn more about his skills, projects, or experience?'
    );
    setMessages([initialMessage]);
    setShowSuggestions(true);
    setSuggestedPrompts(chatbotService.getSuggestedPrompts().slice(0, 3));
    chatbotService.createNewConversation();
    setShowMenu(false);
  };

  const handleExportChat = () => {
    const conversationId = chatbotService.getCurrentConversationId();
    if (!conversationId) return;

    const jsonData = chatbotService.exportConversation(conversationId);
    if (!jsonData) return;

    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowMenu(false);
  };

  const handleViewAnalytics = () => {
    setShowAnalytics(!showAnalytics);
    setShowMenu(false);
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
    setShowMenu(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setShowMenu(false);
    onToggle?.();
  };

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputMessage.trim();
    if (!textToSend || isLoading) return;

    const userMessage = createUserMessage(textToSend);
    const updatedMessages = [...messages, userMessage];
    
    setMessages(updatedMessages);
    setInputMessage('');
    setIsLoading(true);
    setIsTyping(true);
    setShowSuggestions(false);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = '48px';
    }

    // Create abort controller for cancellation
    abortControllerRef.current = new AbortController();

    try {
      let assistantMessage = '';
      const assistantMessageObj = createAssistantMessage('');

      setMessages(prev => [...prev, assistantMessageObj]);

      // Use streaming for real-time responses
      await chatbotService.sendMessageStream(
        updatedMessages,
        (chunk) => {
          assistantMessage += chunk;
          setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = {
              ...newMessages[newMessages.length - 1],
              content: assistantMessage
            };
            return newMessages;
          });
        },
        {
          onComplete: (fullMessage) => {
            console.log('✅ Streaming complete');
            // Save conversation
            const convId = chatbotService.getCurrentConversationId();
            if (convId) {
              chatbotService.saveConversation(convId, [...updatedMessages, createAssistantMessage(fullMessage)]);
            }
          },
          onError: (error: Error) => {
            console.error('❌ Streaming error:', error);
          },
          signal: abortControllerRef.current.signal,
          model: 'fast' // Use fast model for better UX
        }
      );
    } catch (error: unknown) {
      console.error('Error:', error);
      setMessages(prev => [...prev, createAssistantMessage(
        'Sorry, I encountered an error. Please try again later.'
      )]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
      abortControllerRef.current = null;
    }
  };

  const handleSuggestedPrompt = (prompt: string) => {
    setInputMessage(prompt);
    handleSendMessage(prompt);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp?: number) => {
    return new Date(timestamp || Date.now()).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Get analytics data
  const analytics = showAnalytics ? chatbotService.getAnalytics() : null;

  if (!isOpen) {
    return (
      <button
        onClick={handleToggle}
        className="fixed bottom-8 right-8 z-50 group"
        aria-label="Open chat"
      >
        <div className="relative">
          <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center transform transition-all duration-300 hover:scale-105 hover:rotate-3">
            <MessageCircle className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-black">
            <div className="w-full h-full bg-emerald-400 rounded-full animate-ping opacity-75"></div>
          </div>
          
          <Sparkles className="absolute -top-2 -left-2 w-4 h-4 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </button>
    );
  }

  return (
    <div className="fixed bottom-8 right-8 z-50 w-[380px] max-w-[calc(100vw-2rem)]">
      <div className={`bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden transition-all duration-300 ${
        isMinimized ? 'h-[72px]' : showAnalytics ? 'h-[600px]' : 'h-[520px]'
      }`}>
        
        {/* Header */}
        <div className="relative bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-5">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 bg-white/95 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Bot className="w-6 h-6 text-indigo-600" strokeWidth={2.5} />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="text-white font-semibold text-base tracking-tight">AI Assistant</h3>
                <p className="text-white/80 text-xs font-medium">Always here to help</p>
              </div>
            </div>
            
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 hover:bg-white/15 rounded-xl transition-all duration-200 active:scale-95"
                aria-label="Menu"
              >
                <MoreVertical className="w-5 h-5 text-white" strokeWidth={2.5} />
              </button>

              {showMenu && (
                <div className="absolute right-0 top-12 w-52 bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden animate-fadeIn z-10">
                  <button
                    onClick={handleMinimize}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-zinc-200 hover:bg-zinc-700 transition-colors duration-200"
                  >
                    {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                    {isMinimized ? 'Maximize' : 'Minimize'}
                  </button>
                  
                  <button
                    onClick={handleViewAnalytics}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-zinc-200 hover:bg-zinc-700 transition-colors duration-200"
                  >
                    <TrendingUp className="w-4 h-4" />
                    {showAnalytics ? 'Hide' : 'View'} Analytics
                  </button>
                  
                  <button
                    onClick={handleExportChat}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-zinc-200 hover:bg-zinc-700 transition-colors duration-200"
                  >
                    <Download className="w-4 h-4" />
                    Export Chat
                  </button>
                  
                  <button
                    onClick={handleClearChat}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-zinc-200 hover:bg-zinc-700 transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear Chat
                  </button>
                  
                  <div className="border-t border-zinc-700"></div>
                  
                  <button
                    onClick={handleClose}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-zinc-700 transition-colors duration-200"
                  >
                    <X className="w-4 h-4" />
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {!isMinimized && (
          <>
            {showAnalytics && analytics ? (
              /* Analytics View */
              <div className="h-[440px] overflow-y-auto p-5 bg-zinc-900 custom-scrollbar">
                <h3 className="text-white font-semibold text-lg mb-4">📊 Analytics Dashboard</h3>
                
                <div className="space-y-3">
                  <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-4">
                    <div className="text-zinc-400 text-xs mb-1">Total Messages</div>
                    <div className="text-white text-2xl font-bold">{analytics.totalMessages}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-4">
                      <div className="text-zinc-400 text-xs mb-1">Cache Hit Rate</div>
                      <div className="text-emerald-400 text-xl font-bold">{analytics.cacheHitRate}</div>
                    </div>
                    
                    <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-4">
                      <div className="text-zinc-400 text-xs mb-1">Avg Response</div>
                      <div className="text-blue-400 text-xl font-bold">{analytics.averageResponseTime.toFixed(0)}ms</div>
                    </div>
                  </div>
                  
                  <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-4">
                    <div className="text-zinc-400 text-xs mb-1">Total Tokens Used</div>
                    <div className="text-purple-400 text-xl font-bold">{analytics.totalTokens.toLocaleString()}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-4">
                      <div className="text-zinc-400 text-xs mb-1">Streaming Rate</div>
                      <div className="text-indigo-400 text-lg font-bold">{analytics.streamingRate}</div>
                    </div>
                    
                    <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-4">
                      <div className="text-zinc-400 text-xs mb-1">Errors</div>
                      <div className="text-red-400 text-lg font-bold">{analytics.errors}</div>
                    </div>
                  </div>
                  
                  <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-4">
                    <div className="text-zinc-400 text-xs mb-1">Conversations</div>
                    <div className="text-white text-xl font-bold">{analytics.conversationCount}</div>
                  </div>
                </div>
              </div>
            ) : (
              /* Messages View */
              <div 
                ref={messagesContainerRef}
                className="h-[360px] overflow-y-auto p-5 space-y-4 bg-zinc-900 custom-scrollbar scroll-smooth"
              >
                {messages.map((message, index) => (
                  <div
                    key={message.id || index}
                    className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-white" strokeWidth={2.5} />
                      </div>
                    )}
                    
                    <div className="flex flex-col gap-1.5 max-w-[75%]">
                      <div
                        className={`px-4 py-3 rounded-2xl transition-all duration-200 ${
                          message.role === 'user'
                            ? 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white rounded-br-md'
                            : 'bg-zinc-800 text-zinc-100 border border-zinc-700 rounded-bl-md'
                        }`}
                      >
                        <p className="text-[13px] leading-relaxed whitespace-pre-wrap">{message.content}</p>
                      </div>
                      <span className={`text-[11px] text-zinc-500 px-1 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    
                    {message.role === 'user' && (
                      <div className="w-8 h-8 bg-zinc-700 rounded-xl flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-zinc-200" strokeWidth={2.5} />
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex gap-3 justify-start animate-fadeIn">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-white" strokeWidth={2.5} />
                    </div>
                    <div className="bg-zinc-800 border border-zinc-700 rounded-2xl rounded-bl-md px-5 py-3.5">
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Suggested Prompts */}
                {showSuggestions && messages.length === 1 && suggestedPrompts.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <p className="text-zinc-400 text-xs px-1">Suggested questions:</p>
                    {suggestedPrompts.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestedPrompt(prompt)}
                        className="w-full text-left px-4 py-3 bg-zinc-800 border border-zinc-700 hover:border-indigo-500 rounded-xl text-zinc-200 text-sm transition-all duration-200 hover:bg-zinc-750"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Input Area */}
            <div className="border-t border-zinc-800 p-4 bg-zinc-900">
              <div className="flex gap-2 items-end">
                <div className="flex-1 bg-zinc-800 border border-zinc-700 rounded-2xl overflow-hidden transition-all duration-200 focus-within:border-indigo-500">
                  <textarea
                    ref={textareaRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    rows={1}
                    className="w-full bg-transparent px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none resize-none text-sm"
                    disabled={isLoading}
                    style={{ minHeight: '48px', maxHeight: '120px' }}
                  />
                </div>
                <button
                  onClick={() => handleSendMessage()}
                  disabled={isLoading || !inputMessage.trim()}
                  className="p-3 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white rounded-2xl hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 active:scale-95 flex-shrink-0"
                  aria-label="Send message"
                >
                  {isLoading ? (
                    <RefreshCw className="w-5 h-5 animate-spin" strokeWidth={2.5} />
                  ) : (
                    <Send className="w-5 h-5" strokeWidth={2.5} />
                  )}
                </button>
              </div>
              <p className="text-[11px] text-zinc-500 mt-2.5 text-center">
                Press Enter to send • Shift + Enter for new line
              </p>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #52525b;
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #71717a;
        }
      `}</style>
    </div>
  );
}