'use client'

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User, Trash2, RefreshCw, MoreVertical, TrendingUp } from 'lucide-react';
import { chatbotService, ChatMessage, createUserMessage, createAssistantMessage } from '@/lib/chatbot';

interface ChatbotProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

export default function EnhancedChatbot({ isOpen: controlledIsOpen, onToggle }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(controlledIsOpen || false);
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

  // Update contextual prompts
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
    
    if (newState) {
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

  const handleViewAnalytics = () => {
    setShowAnalytics(!showAnalytics);
    setShowMenu(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setShowMenu(false);
    onToggle?.();
  };

  // Function to convert URLs in text to clickable links
  const renderMessageWithLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\/[^\s]*)/g;
    const parts = text.split(urlRegex);
    
    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        let href = part;
        if (!href.startsWith('http')) {
          href = 'https://' + href;
        }
        return (
          <a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline cursor-pointer"
          >
            {part}
          </a>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputMessage.trim();
    if (!textToSend || isLoading) return;

    const userMessage = createUserMessage(textToSend);
    const updatedMessages = [...messages, userMessage];
    
    setMessages(updatedMessages);
    setInputMessage('');
    setIsLoading(true);
    setShowSuggestions(false);

    if (textareaRef.current) {
      textareaRef.current.style.height = '48px';
    }

    abortControllerRef.current = new AbortController();

    try {
      let assistantMessage = '';
      
      // Show typing indicator
      setIsTyping(true);

      await chatbotService.sendMessageStream(
        updatedMessages,
        (chunk) => {
          assistantMessage += chunk;
          // Hide typing indicator and add the message when first chunk arrives
          setIsTyping(false);
          setMessages(prev => {
            const newMessages = [...prev];
            const lastMsg = newMessages[newMessages.length - 1];
            if (lastMsg && lastMsg.role === 'assistant') {
              // Update existing message
              newMessages[newMessages.length - 1] = {
                ...lastMsg,
                content: assistantMessage
              };
            } else {
              // Add new message
              newMessages.push(createAssistantMessage(assistantMessage));
            }
            return newMessages;
          });
        },
        {
          onComplete: (fullMessage) => {
            const convId = chatbotService.getCurrentConversationId();
            if (convId) {
              chatbotService.saveConversation(convId, [...updatedMessages, createAssistantMessage(fullMessage)]);
            }
          },
          onError: (error: Error) => {
            console.error('Streaming error:', error);
          },
          signal: abortControllerRef.current.signal,
          model: 'fast'
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

  const analytics = showAnalytics ? chatbotService.getAnalytics() : null;

  if (!isOpen) {
    return (
      <button
        onClick={handleToggle}
        className="fixed bottom-8 right-8 z-50 group"
        aria-label="Open chat"
      >
        <div className="relative">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-105">
            <MessageCircle className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
        </div>
      </button>
    );
  }

  return (
    <div className="fixed bottom-8 right-8 z-50 w-[380px] max-w-[calc(100vw-2rem)]">
      <div className="bg-black border border-zinc-800 rounded-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-blue-600" strokeWidth={2.5} />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">AI Assistant</h3>
                <p className="text-white/90 text-xs">Always here to help</p>
              </div>
            </div>
            
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Menu"
              >
                <MoreVertical className="w-5 h-5 text-white" />
              </button>

              {showMenu && (
                <div className="absolute right-0 top-12 w-48 bg-zinc-900 border border-zinc-700 rounded-lg overflow-hidden z-10">
                  <button
                    onClick={handleViewAnalytics}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-zinc-200 hover:bg-zinc-800 transition-colors"
                  >
                    <TrendingUp className="w-4 h-4" />
                    {showAnalytics ? 'Hide' : 'View'} Analytics
                  </button>
                  
                  <button
                    onClick={handleClearChat}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-zinc-200 hover:bg-zinc-800 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear Chat
                  </button>
                  
                  <div className="border-t border-zinc-700"></div>
                  
                  <button
                    onClick={handleClose}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-zinc-800 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {showAnalytics && analytics ? (
          /* Analytics View */
          <div className="h-[440px] overflow-y-auto p-4 bg-black">
            <h3 className="text-white font-semibold text-base mb-4">Analytics Dashboard</h3>
            
            <div className="space-y-3">
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                <div className="text-zinc-500 text-xs mb-1">Total Messages</div>
                <div className="text-white text-2xl font-bold">{analytics.totalMessages}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                  <div className="text-zinc-500 text-xs mb-1">Cache Hit Rate</div>
                  <div className="text-green-400 text-lg font-bold">{analytics.cacheHitRate}</div>
                </div>
                
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                  <div className="text-zinc-500 text-xs mb-1">Avg Response</div>
                  <div className="text-blue-400 text-lg font-bold">{analytics.averageResponseTime.toFixed(0)}ms</div>
                </div>
              </div>
              
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                <div className="text-zinc-500 text-xs mb-1">Total Tokens</div>
                <div className="text-purple-400 text-lg font-bold">{analytics.totalTokens.toLocaleString()}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                  <div className="text-zinc-500 text-xs mb-1">Conversations</div>
                  <div className="text-white text-lg font-bold">{analytics.conversationCount}</div>
                </div>
                
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                  <div className="text-zinc-500 text-xs mb-1">Errors</div>
                  <div className="text-red-400 text-lg font-bold">{analytics.errors}</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Messages View */
          <div 
            ref={messagesContainerRef}
            className="h-[360px] overflow-y-auto p-4 space-y-4 bg-black scrollbar-hide"
          >
            {messages.map((message, index) => (
              <div
                key={message.id || index}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}
                
                <div className="flex flex-col gap-1 max-w-[75%]">
                  <div
                    className={`px-4 py-2.5 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : 'bg-zinc-900 text-zinc-100 border border-zinc-800 rounded-bl-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {renderMessageWithLinks(message.content)}
                    </p>
                  </div>
                  <span className={`text-xs text-zinc-600 px-1 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                    {formatTime(message.timestamp)}
                  </span>
                </div>
                
                {message.role === 'user' && (
                  <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-zinc-200" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Suggested Prompts */}
            {showSuggestions && messages.length === 1 && suggestedPrompts.length > 0 && (
              <div className="space-y-2 pt-2">
                <p className="text-zinc-500 text-xs px-1">Suggested questions:</p>
                {suggestedPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestedPrompt(prompt)}
                    className="w-full text-left px-4 py-2.5 bg-zinc-900 border border-zinc-800 hover:border-blue-500 rounded-lg text-zinc-200 text-sm transition-colors"
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
        <div className="border-t border-zinc-800 p-4 bg-black">
          <div className="flex gap-2 items-end">
            <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden focus-within:border-blue-500 transition-colors">
              <textarea
                ref={textareaRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                rows={1}
                className="w-full bg-transparent px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:outline-none resize-none text-sm"
                disabled={isLoading}
                style={{ minHeight: '48px', maxHeight: '120px' }}
              />
            </div>
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputMessage.trim()}
              className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0"
              aria-label="Send message"
            >
              {isLoading ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
          <p className="text-xs text-zinc-600 mt-2 text-center">
            Press Enter to send • Shift + Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}