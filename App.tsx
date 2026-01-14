
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import StrategyLab from './components/StrategyLab';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'lab':
        return <StrategyLab />;
      case 'signals':
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center p-12 glass rounded-3xl">
            <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Live Stream Offline</h2>
            <p className="text-gray-400 max-w-md">The real-time signal feed is currently processing historical backtests. Switch to 'Strategy Lab' to generate on-demand signals.</p>
          </div>
        );
      default:
        return <div className="p-12 text-center text-gray-500">Coming soon...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 ml-64 p-8 min-h-screen overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <nav className="flex justify-end mb-8 items-center gap-4">
             <div className="relative group">
               <button className="p-2 glass rounded-full hover:bg-white/5 transition-colors">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
               </button>
               <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-[#030712] rounded-full"></span>
             </div>
             <button className="flex items-center gap-2 glass px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/5 transition-colors">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
               Settings
             </button>
          </nav>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
