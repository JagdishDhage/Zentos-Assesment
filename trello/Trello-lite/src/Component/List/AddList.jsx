import React, { useState } from 'react';
import axios from 'axios';

function AddList({ boardId, onListCreated }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setMessage('List name is required.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post(
        'http://localhost:3000/lists',
        {
          name,
          description,
          boardId,
        },
        { withCredentials: true }
      );

      setMessage('List created successfully!');
      setName('');
      setDescription('');

     
      if (onListCreated) {
        onListCreated(response.data.list);
      }
    } catch (error) {
      console.error('Error creating list:', error);
      setMessage(
        error.response?.data?.message || 'Error creating list. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded">
      <h3 className="text-lg font-semibold mb-2">Add New List</h3>

      {message && <p className="mb-2 text-sm text-blue-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          placeholder="List Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {loading ? 'Creating...' : 'Create List'}
        </button>
      </form>
    </div>
  );
}

export default AddList;
