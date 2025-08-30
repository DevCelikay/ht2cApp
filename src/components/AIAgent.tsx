import React, { useState } from 'react';
import { Bot, Send, MessageCircle, Settings, Zap } from 'lucide-react';

export const AIAgent: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    setMessage('');
    // Handle message sending logic here
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Agent</h2>
        <p className="text-gray-600">
          Connect and interact with your n8n automation agent
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Connection Status */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Connection Status</h3>
            
            <div className="space-y-4">
              <div className={`flex items-center space-x-3 p-3 rounded-lg ${
                isConnected ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'
              }`}>
                <div className={`w-3 h-3 rounded-full ${
                  isConnected ? 'bg-green-500' : 'bg-orange-500'
                }`} />
                <span className={`text-sm font-medium ${
                  isConnected ? 'text-green-700' : 'text-orange-700'
                }`}>
                  {isConnected ? 'Connected to n8n Agent' : 'Not Connected'}
                </span>
              </div>

              <button
                onClick={() => setIsConnected(!isConnected)}
                className="w-full flex items-center justify-center space-x-2 bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors"
              >
                <Zap className="w-4 h-4" />
                <span>{isConnected ? 'Disconnect' : 'Connect to n8n Agent'}</span>
              </button>
            </div>

            {/* Agent Capabilities */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Agent Capabilities</h4>
              <div className="space-y-2">
                {[
                  'Workflow automation suggestions',
                  'Data analysis and insights',
                  'Lead scoring and qualification',
                  'Campaign optimization tips'
                ].map((capability, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full" />
                    <span className="text-sm text-gray-600">{capability}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 h-96 flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">HealthTech2Care AI</h3>
                  <p className="text-xs text-gray-500">
                    {isConnected ? 'Ready to assist' : 'Please connect to start chatting'}
                  </p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              {isConnected ? (
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center">
                      <Bot className="w-3 h-3 text-teal-600" />
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 max-w-xs">
                      <p className="text-sm text-gray-800">
                        Hello! I'm your HealthTech2Care AI assistant. I can help you optimize your lead generation workflows. What would you like to know?
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <MessageCircle className="w-12 h-12 text-gray-300 mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No Agent Connected</h4>
                  <p className="text-gray-500 text-sm">
                    Connect to your n8n agent to start chatting and get workflow assistance
                  </p>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={isConnected ? "Ask me about your workflows..." : "Connect to n8n agent first"}
                  disabled={!isConnected}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-400"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!isConnected || !message.trim()}
                  className="p-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};