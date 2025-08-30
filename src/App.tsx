import React, { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { AIAgent } from './components/AIAgent';
import { Settings } from './components/Settings';

function App() {
  const [activeTab, setActiveTab] = useState('workflows');

  const renderContent = () => {
    switch (activeTab) {
      case 'workflows':
        return <Dashboard />;
      case 'ai-agent':
        return <AIAgent />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="pb-8">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;