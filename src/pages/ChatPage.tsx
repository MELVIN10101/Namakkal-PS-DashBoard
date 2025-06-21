import React, { useState } from 'react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Modal } from '../components/UI/Modal';
import { Send, Bot, User, Phone, Mail, Linkedin, Instagram } from 'lucide-react';
import { PageProps } from '../types';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Payment Modal Component
const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <div className="relative">
            <img 
              src="src\asstes\image.png" 
              alt="Premium Chat" 
              className="w-32 h-32 mx-auto mb-4 rounded-lg shadow-lg"
            />
            <div className="absolute -top-2 -right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full">
              PREMIUM
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Unlock Advanced AI Chat Features
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Get access to our state-of-the-art AI assistant for comprehensive crime data analysis
          </p>
          <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-1 mb-4">
            <div className="bg-white dark:bg-gray-800 rounded px-4 py-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                ₹100,000
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">one-time payment</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg mb-6">          <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white flex items-center">
            <Phone className="w-5 h-5 mr-2 text-blue-500" />
            Contact Team Lead
          </h3>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow mb-4">
            <div className="flex items-center mb-2">
              <User className="w-5 h-5 mr-2 text-blue-500" />
              <span className="font-medium text-gray-900 dark:text-white">Dhanasekaran (DHANUSH) Srinivasan</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Team Lead - Crime Data Analytics</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-2">
                <Phone className="w-5 h-5 mr-2 text-blue-500" />
                <span className="font-medium text-gray-900 dark:text-white">Phone</span>
              </div>
              <span className="text-gray-600 dark:text-gray-300">+91 7548836965</span>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-2">
                <Mail className="w-5 h-5 mr-2 text-blue-500" />
                <span className="font-medium text-gray-900 dark:text-white">Email</span>
              </div>
              <span className="text-gray-600 dark:text-gray-300">donesekarin@gmail.com</span>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-2">
                <Linkedin className="w-5 h-5 mr-2 text-blue-500" />
                <span className="font-medium text-gray-900 dark:text-white">LinkedIn</span>
              </div>
              <a href="https://linkedin.com/in/police-ai" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="text-blue-600 hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
                linkedin.com/in/police-ai
              </a>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-2">
                <Instagram className="w-5 h-5 mr-2 text-blue-500" />
                <span className="font-medium text-gray-900 dark:text-white">Instagram</span>
              </div>
              <a href="https://instagram.com/police_ai" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
                @police_ai
              </a>
            </div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Button 
              onClick={() => window.open('mailto:dhanush.srinivasan@policeai.com?subject=Premium%20Access%20Request&body=Dear%20Dhanasekaran%20(DHANUSH)%20Srinivasan%2C%0A%0AI%20would%20like%20to%20request%20premium%20access%20to%20the%20Crime%20Data%20AI%20chat%20feature.')}
              className="w-full max-w-xs px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors font-semibold"
            >
              Request Premium Access
            </Button>
            <Button 
              onClick={onClose}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              Maybe Later
            </Button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
            By requesting access, you agree to our terms of service and privacy policy
          </p>
        </div>
      </div>
    </Modal>
  );
};

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

  // Handle send message
  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    setShowPaymentModal(true);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      <PaymentModal 
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
      />
      <Card className="h-[600px] flex flex-col">
        {/* Chat Header */}
        <div className="border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Crime Data AI</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">AI Assistant • Premium Feature</p>
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
          <div className="flex space-x-4">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};