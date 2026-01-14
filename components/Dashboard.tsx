
import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Dashboard: React.FC = () => {
  const chartData = useMemo(() => [
    { name: '00:00', value: 400, vol: 2400 },
    { name: '04:00', value: 300, vol: 1398 },
    { name: '08:00', value: 200, vol: 9800 },
    { name: '12:00', value: 278, vol: 3908 },
    { name: '16:00', value: 189, vol: 4800 },
    { name: '20:00', value: 239, vol: 3800 },
    { name: '23:59', value: 349, vol: 4300 },
  ], []);

  const stats = [
    { label: 'Active Signals', value: '42', trend: '+12%', color: 'text-blue-500' },
    { label: 'Avg Confidence', value: '88.4%', trend: '+3.2%', color: 'text-green-500' },
    { label: 'Processed Events', value: '1.2M', trend: '+24%', color: 'text-purple-500' },
    { label: 'Model Accuracy', value: '94.1%', trend: '+0.4%', color: 'text-emerald-500' },
  ];

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Signal Intel Dashboard</h1>
          <p className="text-gray-400">Real-time market activity and AI performance metrics.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 glass rounded-lg text-sm font-medium hover:bg-white/5">Export PDF</button>
          <button className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium hover:bg-blue-500 shadow-lg shadow-blue-500/20">Live Report</button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="p-6 glass rounded-2xl border border-white/5">
            <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
            <div className="flex items-baseline gap-3">
              <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
              <span className="text-xs font-medium text-green-500">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 glass rounded-2xl border border-white/5 h-[400px]">
          <h3 className="text-lg font-bold mb-6">Aggregate Sentiment Flow</h3>
          <ResponsiveContainer width="100%" height="85%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111827', border: '1px solid #ffffff10', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="p-6 glass rounded-2xl border border-white/5 h-[400px]">
          <h3 className="text-lg font-bold mb-6">Volume Analysis</h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111827', border: '1px solid #ffffff10', borderRadius: '8px' }}
              />
              <Bar dataKey="vol" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
