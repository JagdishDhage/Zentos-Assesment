import React, { useState } from 'react';
import { Clock, Users } from 'lucide-react';
import axios from 'axios';

const BoardList = ({ boards, fetchBoards }) => {
  const [newBoardName, setNewBoardName] = useState('');
  const [loading, setLoading] = useState(false);

  const createBoard = async () => {
    if (!newBoardName.trim()) {
      alert('Please enter a board name');
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        'http://localhost:3000/boards/create',
        {
          name: newBoardName,
          members: [], // send empty members array for now
        },
        { withCredentials: true }
      );
      alert('Board created successfully!');
      setNewBoardName('');
      if (fetchBoards) {
        fetchBoards(); // refresh board list in parent if passed as prop
      }
    } catch (e) {
      console.error(e);
      alert('Failed to create board');
    } finally {
      setLoading(false);
    }
  };

  const getBoardBackground = (id) => {
    const colors = [
      'bg-gradient-to-r from-blue-500 to-blue-600',
      'bg-gradient-to-r from-green-500 to-green-600',
      'bg-gradient-to-r from-purple-500 to-purple-600',
      'bg-gradient-to-r from-red-500 to-red-600',
      'bg-gradient-to-r from-yellow-500 to-yellow-600',
      'bg-gradient-to-r from-indigo-500 to-indigo-600',
      'bg-gradient-to-r from-pink-500 to-pink-600',
      'bg-gradient-to-r from-teal-500 to-teal-600',
    ];
    const index = parseInt(id.slice(-1), 16) % colors.length;
    return colors[index];
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Boards</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {boards.map(board => (
          <div key={board._id} className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className={`h-24 ${getBoardBackground(board._id)}`}></div>
            <div className="p-4 bg-white">
              <h3 className="font-bold text-lg text-gray-800 mb-1">{board.name}</h3>
              {board.description && (
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{board.description}</p>
              )}
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center text-gray-500 text-xs">
                  <Clock size={14} className="mr-1" />
                  <span>Last viewed recently</span>
                </div>
                <div className="flex items-center text-gray-500 text-xs">
                  <Users size={14} className="mr-1" />
                  <span>{board.members?.length || 0} members</span>
                </div>
              </div>
              <a 
                href={`/board/${board._id}`} 
                className="mt-4 block w-full text-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-sm font-medium transition-colors duration-200"
              >
                View Board
              </a>
            </div>
          </div>
        ))}
        
        {/* Add new board card */}
        <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center bg-gray-50 p-4">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <input 
              type="text" 
              value={newBoardName} 
              onChange={(e) => setNewBoardName(e.target.value)} 
              placeholder="Board name"
              className="border rounded px-2 py-1 text-sm w-full mb-2"
            />
            <button
              onClick={createBoard}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded text-sm font-medium transition-colors duration-200"
            >
              {loading ? 'Creating...' : 'Create Board'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardList;
