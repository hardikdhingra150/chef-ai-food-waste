import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

export default function AIChatBot() {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "Hi! I'm your AI food waste assistant. Ask me anything about inventory, predictions, recipes, or waste reduction!",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');

    setMessages(prev => [...prev, {
      type: 'user',
      text: userMessage,
      timestamp: new Date()
    }]);

    setIsLoading(true);

    try {
      console.log('📤 Sending:', userMessage);
      
      const response = await axios.post('http://localhost:5000/api/chat/message', {
        message: userMessage
      }, {
        timeout: 30000,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('📥 Response:', response.data);

      if (response.data && response.data.success && response.data.data && response.data.data.message) {
        setMessages(prev => [...prev, {
          type: 'bot',
          text: response.data.data.message,
          timestamp: new Date(),
          fromGemini: true
        }]);
      } else {
        throw new Error('Invalid response format');
      }

    } catch (error) {
      console.error('❌ Error:', error);
      
      let errorMessage = "Sorry, I'm having trouble connecting.";
      
      if (error.code === 'ERR_NETWORK') {
        errorMessage = "Cannot connect to backend. Make sure it's running on port 5000!";
      } else if (error.response) {
        errorMessage = `Server error: ${error.response.data?.message || 'Unknown error'}`;
      } else if (error.request) {
        errorMessage = "No response from server. Check if backend is running!";
      }
      
      setMessages(prev => [...prev, {
        type: 'bot',
        text: errorMessage,
        timestamp: new Date(),
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    "How can I reduce food waste?",
    "Give me a recipe idea",
    "Show inventory tips",
    "Best practices?"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-dark-card rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden h-[600px] flex flex-col"
    >
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg">AI Assistant</h3>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Online • Powered by Gemini ✨ </span>
            </div>
          </div>
        </div>
      </div>

      {messages.length === 1 && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setInput(question)}
                className="text-xs px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.type === 'bot' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
                  : 'bg-gradient-to-r from-blue-600 to-cyan-600'
              }`}>
                {msg.type === 'bot' ? (
                  <Bot className="w-5 h-5 text-white" />
                ) : (
                  <User className="w-5 h-5 text-white" />
                )}
              </div>

              <div className={`flex flex-col max-w-[70%] ${msg.type === 'user' ? 'items-end' : ''}`}>
                <div className={`rounded-2xl p-3 ${
                  msg.type === 'bot'
                    ? msg.isError 
                      ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  
                  {msg.fromGemini && (
                    <div className="mt-2 text-xs opacity-70 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Gemini 2.5 Flash</span>
                    </div>
                  )}
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
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
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about inventory, predictions, recipes..."
            disabled={isLoading}
            className="flex-1 px-4 py-3 rounded-full border-2 border-purple-600 dark:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:opacity-50 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center hover:scale-110 transition-transform disabled:opacity-50 disabled:hover:scale-100 shadow-lg"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
          Powered by Google Gemini ✨
        </p>
      </div>
    </motion.div>
  );
}
