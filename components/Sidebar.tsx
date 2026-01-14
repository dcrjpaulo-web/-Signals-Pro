
import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'lab', label: 'Strategy Lab', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.675.337a4 4 0 01-2.574.345l-1.311-.262a2 2 0 01-1.018-.547l-1.428-1.428a2 2 0 01-.547-1.018l-.262-1.311a4 4 0 01.345-2.574l.337-.675a6 6 0 00.517-3.86l-.477-2.387a2 2 0 00-.547-1.022L7.428 2.572a2 2 0 00-1.022.547l-2.387.477a6 6 0 00-3.86-.517l-.675-.337A4 4 0 01.345.503L1.656.765a2 2 0 011.018.547l1.428 1.428c.117.117.21.25.274.397.064.147.097.304.097.463 0 .16-.033.316-.097.463s-.157.28-.274.397l-1.428 1.428a2 2 0 01-.547 1.018l-.262 1.311a4 4 0 01-.345 2.574l.337.675a6 6 0 00-.517 3.86l.477 2.387a2 2 0 00.547 1.022l1.428 1.428a2 2 0 001.022-.547l2.387-.477a6 6 0 003.86.517l.675.337a4 4 0 012.574.345l1.311.262a2 2 0 011.018.547l1.428 1.428a2 2 0 01.547 1.018l.262 1.311a4 4 0 01-.345 2.574l-.337.675a6 6 0 00-.517 3.86l.477 2.387a2 2 0 00.547 1.022l1.428 1.428z' },
    { id: 'signals', label: 'Signal Feed', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { id: 'analytics', label: 'Intelligence', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  ];

  return (
    <aside className="w-64 glass h-screen fixed left-0 top-0 flex flex-col z-50">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/50">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">GenSignals <span className="text-blue-500">PRO</span></span>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              activeTab === item.id 
              ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-inner' 
              : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <svg className={`w-5 h-5 transition-colors ${activeTab === item.id ? 'text-blue-400' : 'group-hover:text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
            </svg>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
      
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 p-3 glass rounded-xl">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500"></div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium truncate text-white">Advanced User</p>
            <p className="text-xs text-gray-500 truncate">Enterprise Plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
