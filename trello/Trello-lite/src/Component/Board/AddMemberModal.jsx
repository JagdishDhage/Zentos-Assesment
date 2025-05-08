import React, { useState } from 'react';
import { X, UserPlus, AlertCircle } from 'lucide-react';

const AddMemberModal = ({ boardId, onClose }) => {
  const [members, setMembers] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!members.trim()) {
      setError('Please enter at least one member');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      const memberIds = members.split(',').map(member => member.trim());
      // Simulate API call since we're not using axios in this demo
      console.log('Adding members to board:', boardId, memberIds);
      
      // Wait for a short time to simulate network request
      setTimeout(() => {
        setIsSubmitting(false);
        onClose(); // Close modal on success
      }, 800);
      
    } catch (error) {
      setError('Error adding members. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <UserPlus size={20} className="mr-2 text-blue-500" />
            Add Members to Board
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-start">
              <AlertCircle size={18} className="mr-2 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          
          <div>
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Member Usernames or Email Addresses
              </label>
              <input
                type="text"
                placeholder="e.g. user1@example.com, johndoe, user2@example.com"
                value={members}
                onChange={(e) => setMembers(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="mt-1 text-xs text-gray-500">
                Separate multiple members with commas
              </p>
            </div>
            
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button 
                type="button" 
                onClick={onClose} 
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 font-medium text-sm"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button 
                type="button" 
                onClick={handleSubmit}
                className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-medium text-sm flex items-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="w-4 h-4 mr-2 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding...
                  </>
                ) : (
                  <>
                    <UserPlus size={16} className="mr-1" />
                    Add Members
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Click outside to close */}
      <div className="fixed inset-0 z-40" onClick={onClose}></div>
    </div>
  );
};

export default AddMemberModal;