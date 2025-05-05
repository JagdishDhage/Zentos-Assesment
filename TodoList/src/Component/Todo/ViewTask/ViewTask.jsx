import React, { useEffect, useState } from 'react';

function ViewTask({ task }) {
    const [tasks, setTasks] = useState([]);
    const [all, setAll] = useState(true);
    const [complete, setComplete] = useState(false);
    const [pending, setPending] = useState(false);

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (storedTasks) {
            setTasks(storedTasks);
        }
    }, [task]);

    const updateLocalStorage = (newTasks) => {
        localStorage.setItem('tasks', JSON.stringify(newTasks));
    };

    const handleDelete = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
        updateLocalStorage(updatedTasks);
    };

    const handleEdit = (index) => {
        const newText = prompt('Edit task:', tasks[index].text);
        if (newText && newText.trim() !== '') {
            const updatedTasks = tasks.map((task, i) =>
                i === index ? { ...task, text: newText } : task
            );
            setTasks(updatedTasks);
            updateLocalStorage(updatedTasks);
        }
    };

    const toggleComplete = (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
        updateLocalStorage(updatedTasks);
    };

    // Handlers for task filter buttons
    const showAll = () => {
        setAll(true);
        setComplete(false);
        setPending(false);
    };

    const showCompleted = () => {
        setAll(false);
        setComplete(true);
        setPending(false);
    };

    const showPending = () => {
        setAll(false);
        setComplete(false);
        setPending(true);
    };

    // Filter tasks based on completion status
    const completedTasks = tasks.filter((task) => task.completed);
    const pendingTasks = tasks.filter((task) => !task.completed);

    return (
        <>
           <div className="flex justify-center items-center gap-5 mt-6">
    <button 
        onClick={showAll} 
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
        All
    </button>
    <button 
        onClick={showCompleted} 
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
    >
        Completed
    </button>
    <button 
        onClick={showPending} 
        className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
    >
        Pending
    </button>
</div>


            {all && (
                <div className="flex flex-col items-center mt-10 w-full px-4">
                    <ul className="w-full max-w-md">
                        {tasks.map((task, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between bg-white border border-gray-300 rounded-md px-4 py-2 shadow-sm w-full mb-2"
                            >
                                <div className="flex items-center gap-3 flex-1">
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => toggleComplete(index)}
                                    />
                                    <li
                                        className={`text-gray-700 list-none break-words ${
                                            task.completed ? 'line-through text-gray-400' : ''
                                        }`}
                                    >
                                        {task.text}
                                    </li>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(index)}
                                        className="text-blue-500 hover:bg-blue-100 px-2 py-1 rounded text-sm"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(index)}
                                        className="text-red-500 hover:bg-red-100 px-2 py-1 rounded text-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>
            )}

            {complete && (
                <div className="flex flex-col items-center mt-10 w-full px-4">
                    <ul className="w-full max-w-md">
                        {completedTasks.map((task, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between bg-white border border-gray-300 rounded-md px-4 py-2 shadow-sm w-full mb-2"
                            >
                                <div className="flex items-center gap-3 flex-1">
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => toggleComplete(index)}
                                    />
                                    <li
                                        className={`text-gray-700 list-none break-words ${
                                            task.completed ? 'line-through text-gray-400' : ''
                                        }`}
                                    >
                                        {task.text}
                                    </li>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(index)}
                                        className="text-blue-500 hover:bg-blue-100 px-2 py-1 rounded text-sm"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(index)}
                                        className="text-red-500 hover:bg-red-100 px-2 py-1 rounded text-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>
            )}

            {pending && (
                <div className="flex flex-col items-center mt-10 w-full px-4">
                    <ul className="w-full max-w-md">
                        {pendingTasks.map((task, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between bg-white border border-gray-300 rounded-md px-4 py-2 shadow-sm w-full mb-2"
                            >
                                <div className="flex items-center gap-3 flex-1">
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => toggleComplete(index)}
                                    />
                                    <li
                                        className={`text-gray-700 list-none break-words ${
                                            task.completed ? 'line-through text-gray-400' : ''
                                        }`}
                                    >
                                        {task.text}
                                    </li>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(index)}
                                        className="text-blue-500 hover:bg-blue-100 px-2 py-1 rounded text-sm"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(index)}
                                        className="text-red-500 hover:bg-red-100 px-2 py-1 rounded text-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}

export default ViewTask;
