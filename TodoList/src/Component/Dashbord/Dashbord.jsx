import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { CheckCircle, Circle, Clock, Award, Calendar } from 'lucide-react';
import Navbar from '../Header/Navbar';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0
  });

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks);
      setTasks(parsedTasks);
      
      const completed = parsedTasks.filter(task => task.completed).length;
      setStats({
        total: parsedTasks.length,
        completed: completed,
        pending: parsedTasks.length - completed
      });
    }
  }, []);


  const chartData = [
    { name: 'Completed', value: stats.completed },
    { name: 'Pending', value: stats.pending }
  ];

  const COLORS = ['#10B981', '#F59E0B'];


  const today = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const dateString = today.toLocaleDateString('en-US', options);


  const completionRate = stats.total > 0 
    ? Math.round((stats.completed / stats.total) * 100) 
    : 0;

  return (

    <>
    <Navbar/>
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Your Dashboard</h1>
          <p className="text-gray-600 flex items-center">
            <Calendar size={16} className="mr-2" />
            {dateString}
          </p>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center">
            <div className="p-3 bg-blue-100 rounded-full mr-4">
              <Clock size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Tasks</p>
              <p className="text-xl font-bold text-gray-800">{stats.total}</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center">
            <div className="p-3 bg-green-100 rounded-full mr-4">
              <CheckCircle size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-xl font-bold text-gray-800">{stats.completed}</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full mr-4">
              <Circle size={24} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-xl font-bold text-gray-800">{stats.pending}</p>
            </div>
          </div>
        </div>

      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Task Progress</h2>
            <div className="h-64">
              {stats.total > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  No tasks available
                </div>
              )}
            </div>
            <div className="flex justify-center mt-2 text-sm text-gray-500">
              <div className="flex items-center mr-4">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                <span>Completed</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></div>
                <span>Pending</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Completion Rate</h2>
            <div className="flex items-center justify-center h-64">
              <div className="relative">
                <div className="w-40 h-40 rounded-full border-8 border-gray-200 flex items-center justify-center">
                  <div 
                    className="absolute inset-0 rounded-full border-8 border-green-500"
                    style={{ 
                      clipPath: `polygon(50% 50%, 50% 0%, ${completionRate >= 25 ? '100% 0%' : `${50 + (completionRate/25)*50}% 0%`}, ${completionRate >= 50 ? '100% 100%' : '100% 50%'}, ${completionRate >= 75 ? '0% 100%' : '50% 50%'}, ${completionRate >= 100 ? '0% 0%' : completionRate >= 75 ? '0% 50%' : '50% 50%'})`
                    }}
                  ></div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gray-800">{completionRate}%</p>
                    <p className="text-sm text-gray-500">Completed</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-4">
              <p className="flex items-center justify-center text-gray-600">
                <Award size={16} className="mr-2 text-blue-600" />
                {completionRate >= 75 ? 'Excellent progress!' : 
                 completionRate >= 50 ? 'Good progress!' : 
                 completionRate >= 25 ? 'Keep going!' : 'Just getting started!'}
              </p>
            </div>
          </div>
        </div>

        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Recent Tasks</h2>
          {tasks.length > 0 ? (
            <div className="space-y-3">
              {tasks.slice(0, 5).map((task, index) => (
                <div key={index} className="flex items-center p-3 border-b border-gray-100 last:border-b-0">
                  {task.completed ? (
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                  ) : (
                    <Circle size={18} className="text-yellow-500 mr-3" />
                  )}
                  <span className={`${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                    {task.text || task}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No tasks available</p>
          )}
        </div>
      </div>
    </div>
    </>
  );
}

export default Dashboard;