import React, { useState } from 'react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Modal } from '../components/UI/Modal';
import { Send, Bot, User, CreditCard } from 'lucide-react';
import { PageProps } from '../types';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const ChatPage: React.FC<PageProps> = ({ onNavigate }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI assistant for crime data analysis. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Show payment modal instead of sending message
    setShowPaymentModal(true);
    setInputText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Chat Assistant</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <Bot className="w-4 h-4" />
          <span>Powered by Advanced AI</span>
        </div>
      </div>

      <Card className="h-[600px] flex flex-col">
        {/* Chat Header */}
        <div className="border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Crime Data AI</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">AI Assistant • Online</p>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.sender === 'bot' && (
                    <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  )}
                  {message.sender === 'user' && (
                    <User className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' 
                        ? 'text-blue-100' 
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex space-x-3">
            <div className="flex-1 relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about crime statistics, trends, or data insights..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                rows={2}
              />
            </div>
            <Button 
              onClick={handleSendMessage}
              icon={Send}
              disabled={!inputText.trim()}
              className="self-end"
            >
              Send
            </Button>
          </div>
        </div>
      </Card>

      {/* Premium Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Data Analysis" subtitle="Get insights from your crime data">
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <p>• Crime pattern recognition</p>
            <p>• Trend analysis and forecasting</p>
            <p>• Statistical correlations</p>
            <p>• Custom data queries</p>
          </div>
        </Card>

        <Card title="Report Generation" subtitle="Automated intelligent reports">
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <p>• Executive summaries</p>
            <p>• Detailed analytics reports</p>
            <p>• Comparative analysis</p>
            <p>• Export to multiple formats</p>
          </div>
        </Card>

        <Card title="Predictive Insights" subtitle="AI-powered predictions">
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <p>• Crime hotspot prediction</p>
            <p>• Risk assessment models</p>
            <p>• Resource allocation suggestions</p>
            <p>• Early warning systems</p>
          </div>
        </Card>
      </div>

      {/* Payment Modal */}
      <Modal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        title="Premium Feature"
        size="md"
      >
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto">
            <CreditCard className="w-8 h-8 text-white" />
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Unlock AI Chat Assistant
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get access to advanced AI-powered crime data analysis, intelligent insights, and automated reporting.
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6">
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              ₹25,999
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              One-time payment • Lifetime access
            </p>
          </div>

          <div className="space-y-3 text-left">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">Unlimited AI conversations</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">Advanced data analysis</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">Automated report generation</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">Predictive insights</span>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button variant="secondary" onClick={() => setShowPaymentModal(false)} className="flex-1">
              Maybe Later
            </Button>
            <Button className="flex-1" onClick={() => alert('Payment integration would be implemented here')}>
              Upgrade Now
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};