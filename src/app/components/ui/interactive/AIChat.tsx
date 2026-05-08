import { Send, Bot, User, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  streaming?: boolean;
}

interface AIChatProps {
  title?: string;
  placeholder?: string;
  systemPrompt?: string;
  onMessage?: (message: string) => Promise<string>;
}

export function AIChat({
  title = 'AI Oracle Assistant',
  placeholder = 'Ask about impact verification, data sources, or oracle metrics...',
  systemPrompt = 'You are an AI oracle assistant helping users understand regenerative impact verification.',
  onMessage,
}: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI Oracle Assistant. I can help you understand impact verification, explain oracle metrics, or answer questions about our verification methodologies. How can I assist you today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simple response logic based on keywords
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('verification') || lowerMessage.includes('verify')) {
      return 'Our verification system uses a multi-layered approach combining AI satellite analysis, IoT sensor networks, community validation, and third-party audits. Each layer provides independent confirmation of impact metrics, with an average accuracy rate of 99.7%. Would you like details on a specific verification method?';
    } else if (lowerMessage.includes('oracle') || lowerMessage.includes('data')) {
      return 'Our AI-powered oracles operate across 4 global regions, processing data from multiple sources including Sentinel-2 satellites, ground-based IoT sensors, drone imagery, and community reports. Each oracle runs advanced ML models (GPT-Vision, Claude-Vision, and custom satellite analysis models) to verify regenerative impact in real-time.';
    } else if (lowerMessage.includes('accuracy') || lowerMessage.includes('trust')) {
      return 'Our verification accuracy stands at 99.7% with over 47,000 verified projects. We maintain trust through: (1) Multi-oracle consensus requiring 3+ independent confirmations, (2) Cross-verification of data sources, (3) Community ground-truth validation, and (4) Blockchain immutability of all verification records.';
    } else if (lowerMessage.includes('blockchain') || lowerMessage.includes('record')) {
      return 'All verification results are written to our blockchain with cryptographic signatures, ensuring immutability and transparency. Each record includes the verification timestamp, data sources used, AI confidence scores, and oracle node signatures. You can view any verification record on our Blockchain Records dashboard.';
    } else {
      return `I understand you're asking about "${userMessage}". Our oracle network continuously monitors and verifies regenerative impact across environmental, social, and economic dimensions. Could you be more specific about which aspect interests you? For example, verification methods, data sources, accuracy metrics, or specific asset types?`;
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      let response: string;
      if (onMessage) {
        response = await onMessage(userMessage.content);
      } else {
        response = await simulateAIResponse(userMessage.content);
      }

      // Simulate streaming effect
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        streaming: true,
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Stream the response word by word
      const words = response.split(' ');
      for (let i = 0; i < words.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 50));
        setMessages(prev => {
          const updated = [...prev];
          const lastMessage = updated[updated.length - 1];
          lastMessage.content = words.slice(0, i + 1).join(' ');
          lastMessage.streaming = i < words.length - 1;
          return updated;
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-slate-900/50 border border-emerald-500/20 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-slate-900/70 border-b border-emerald-500/20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-400/20 rounded-lg flex items-center justify-center">
            <Bot className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="flex-1">
            <div className="text-white">{title}</div>
            <div className="text-emerald-300/50 text-xs">Powered by AI Oracle Network</div>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-emerald-400 text-xs">Online</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                message.role === 'user'
                  ? 'bg-blue-400/20'
                  : 'bg-emerald-400/20'
              }`}>
                {message.role === 'user' ? (
                  <User className="w-5 h-5 text-blue-400" />
                ) : (
                  <Bot className="w-5 h-5 text-emerald-400" />
                )}
              </div>

              {/* Message Content */}
              <div className={`flex-1 max-w-[80%] ${message.role === 'user' ? 'text-right' : ''}`}>
                <div className={`inline-block px-4 py-2 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-blue-400/20 text-white'
                    : 'bg-slate-800/50 border border-emerald-500/10 text-emerald-300'
                }`}>
                  {message.content}
                  {message.streaming && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="ml-1"
                    >
                      ▋
                    </motion.span>
                  )}
                </div>
                <div className="text-emerald-300/30 text-xs mt-1 px-1">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 bg-emerald-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Bot className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="bg-slate-800/50 border border-emerald-500/10 rounded-lg px-4 py-2">
              <div className="flex gap-1">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                  className="w-2 h-2 bg-emerald-400 rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                  className="w-2 h-2 bg-emerald-400 rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                  className="w-2 h-2 bg-emerald-400 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-slate-900/70 border-t border-emerald-500/20">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={isLoading}
            className="flex-1 bg-slate-800/50 border border-emerald-500/20 rounded-lg px-4 py-2 text-emerald-300 placeholder-emerald-300/30 focus:outline-none focus:border-emerald-400/50 transition-colors disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="px-4 py-2 bg-emerald-400 text-slate-900 rounded-lg hover:bg-emerald-300 active:bg-emerald-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
