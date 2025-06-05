import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, ArrowRight, Paperclip, Info } from 'lucide-react';
import service from '../AI/service';
import {marked} from 'marked';

const AIDoctor = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hello! I'm Dr. HealthWise, your AI health assistant. How can I help you today? Please note that I'm here to provide general health information and guidance, but I'm not a replacement for professional medical advice.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Sample health topics for suggestions
  const healthTopics = [
    'What are common cold symptoms?',
    'How can I reduce stress naturally?',
    'What foods help with inflammation?',
    'Is my headache serious?',
    'How to improve sleep quality?',
  ];

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setInput('');

    try {
      const aiResponse = await generateAIResponse(input);
      setMessages((prev) => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error('Failed to generate AI response:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, I couldn’t process your request. Please try again or consult a healthcare professional.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate AI response using Gemini API
  const generateAIResponse = async (userInput) => {
    try {
      const systemPrompt = {
        role: 'user',
        parts: [
          {
            text: `You are Dr. HealthWise, a friendly AI health assistant. Provide accurate, concise, and general health information based on user queries. Always append this disclaimer to your response: "This is general information and not a substitute for professional medical advice. Consult a qualified healthcare provider for diagnosis and treatment." If the query is off-topic or too specific, politely redirect the user to consult a healthcare professional.`,
          },
        ],
      };

      const conversationHistory = [
        systemPrompt,
        ...messages.map((msg) => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }],
        })),
        { role: 'user', parts: [{ text: userInput }] },
      ];

      console.log('Sending to Gemini API:', conversationHistory); // Debug log
      const response = await service.generateContent(conversationHistory);
      console.log('Received from Gemini API:', response); // Debug log
      return response || 'No response received from AI service.';
    } catch (error) {
      console.error('Error in generateAIResponse:', error);
      throw error; // Let the caller handle the error
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = async (suggestion) => {
    setInput(suggestion);
    const userMessage = { role: 'user', content: suggestion };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const aiResponse = await generateAIResponse(suggestion);
      setMessages((prev) => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error('Failed to generate AI response for suggestion:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, I couldn’t process your request. Please try again or consult a healthcare professional.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">AI Health Assistant</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Chat with our AI health assistant for general health information and guidance. Remember, this is not a replacement for professional medical advice.
        </p>
      </div>

      {/* Info banner */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6 rounded-r-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <Info className="h-5 w-5 text-blue-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>Important:</strong> This AI assistant provides general health information only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for medical concerns.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main chat interface */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col h-[600px]">
          {/* Chat header */}
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center">
            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
              <Bot className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-3">
              <h3 className="font-medium text-gray-900 dark:text-white">Dr. HealthWise</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">AI Health Assistant</p>
            </div>
            <div className="ml-auto">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">
                Online
              </span>
            </div>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
         {messages.map((message, index) => (
  <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
    <div
      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
        message.role === 'user'
          ? 'bg-blue-600 text-white rounded-tr-none'
          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none'
      }`}
    >
      <div className="flex items-start">
        {message.role === 'assistant' && (
          <div className="mr-2 mt-1 flex-shrink-0">
            <div className="h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
              <Bot className="h-3 w-3 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        )}
        <div className="prose prose-sm dark:prose-invert max-w-full">
          {message.role === 'assistant' ? (
            <div dangerouslySetInnerHTML={{ __html: marked(message.content) }} />
          ) : (
            <div>{message.content}</div>
          )}
        </div>
        {message.role === 'user' && (
          <div className="ml-2 mt-1 flex-shrink-0">
            <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
              <User className="h-3 w-3 text-gray-600 dark:text-gray-300" />
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none">
                  <div className="flex items-center space-x-2">
                    <div className="h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                      <Bot className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex space-x-1">
                      <div
                        className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: '0ms' }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: '150ms' }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: '300ms' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat input */}
          <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center"
            >
              <button
                type="button"
                className="p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <Paperclip className="h-5 w-5" />
              </button>
              <input
                type="text"
                className="flex-1 bg-gray-100 dark:bg-gray-700 border-0 rounded-full px-4 py-2 focus:ring-2 focus:ring-blue-500"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="submit"
                className="ml-2 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!input.trim() || isLoading}
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar with suggestions */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-100 dark:border-gray-700">
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">Suggested Topics</h3>
            <div className="space-y-2">
              {healthTopics.map((topic, index) => (
                <button
                  key={index}
                  className="w-full text-left p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm flex items-center"
                  onClick={() => handleSuggestionClick(topic)}
                >
                  <ArrowRight className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                  {topic}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl shadow-sm p-4 border border-blue-100 dark:border-blue-900/30">
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">Disclaimer</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This AI health assistant is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.
            </p>
            <ul className="mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc pl-5">
              <li>Always seek the advice of a qualified healthcare provider</li>
              <li>Never disregard professional medical advice</li>
              <li>Never delay seeking medical advice because of something you read here</li>
              <li>If you think you may have a medical emergency, call your doctor or emergency services immediately</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIDoctor;