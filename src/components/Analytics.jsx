import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const Analytics = ({ totalUsers, premiumCount, waitlistCount, languageStats }) => {
  // Prepare data for charts
  const languageChartData = Object.entries(languageStats || {}).map(([language, count]) => ({
    language,
    count
  }));

  const userTypeData = [
    { name: 'Premium', value: premiumCount, color: '#29C28C' },
    { name: 'Waitlist', value: waitlistCount, color: '#94BD1C' }
  ];

  return (
    <div className="space-y-10">
      {/* TOP STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[30px] shadow-sm border border-gray-100">
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Total Users</p>
          <h3 className="text-3xl font-bold text-[#111111]">{totalUsers}</h3>
        </div>
        <div className="bg-white p-6 rounded-[30px] shadow-sm border border-gray-100">
          <p className="text-xs font-black text-[#29C28C] uppercase tracking-widest mb-1">Paid (Premium)</p>
          <h3 className="text-3xl font-bold text-[#111111]">{premiumCount}</h3>
        </div>
        <div className="bg-white p-6 rounded-[30px] shadow-sm border border-gray-100">
          <p className="text-xs font-black text-[#94BD1C] uppercase tracking-widest mb-1">Waitlist</p>
          <h3 className="text-3xl font-bold text-[#111111]">{waitlistCount}</h3>
        </div>
      </div>

      {/* LANGUAGE DEMAND BAR CHART */}
      <div className="bg-white p-6 md:p-8 rounded-[30px] shadow-sm border border-gray-100">
        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">
          Language Demand
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={languageChartData}>
            <XAxis dataKey="language" stroke="#888888" style={{ fontSize: '12px' }} />
            <YAxis stroke="#888888" style={{ fontSize: '12px' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #D4EFC7', 
                borderRadius: '12px',
                fontSize: '12px'
              }} 
            />
            <Bar dataKey="count" fill="#94BD1C" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* USER TYPE DISTRIBUTION PIE CHART */}
      <div className="bg-white p-6 md:p-8 rounded-[30px] shadow-sm border border-gray-100">
        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">
          User Distribution
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={userTypeData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {userTypeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #D4EFC7', 
                borderRadius: '12px',
                fontSize: '12px'
              }} 
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;
